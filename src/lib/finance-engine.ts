
/**
 * @fileOverview Forensic-Grade Financial Engine for ShuleDirect Pro.
 * Handles transaction-based fee management with atomic integrity and duplicate detection.
 */

import { z } from 'zod';
import { 
  Firestore, 
  doc, 
  runTransaction, 
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp,
  increment,
  Timestamp,
  limit
} from 'firebase/firestore';
import { triggerN8nWebhook } from './n8n';

/**
 * Validation Schema for Forensic Transactions
 */
export const TransactionSchema = z.object({
  amount: z.number().positive("Amount must be greater than zero"),
  controlNumber: z.string().min(10, "Invalid Control Number format"),
  feeType: z.enum(['Tuition', 'Transport', 'Boarding', 'Exam Fee']).default('Tuition'),
  paymentMethod: z.enum(['M-Pesa', 'Tigo Pesa', 'Airtel Money', 'Bank Transfer', 'Cash']),
  studentId: z.string(),
  recordedBy: z.string(),
  academicYear: z.number().default(2026),
  deviceInfo: z.string().optional(),
  recordedFromIp: z.string().optional(),
});

export type TransactionInput = z.infer<typeof TransactionSchema>;

/**
 * Checks for potential duplicate payments within the last 24 hours.
 */
async function checkDuplicate(db: Firestore, schoolId: string, input: TransactionInput) {
  const transactionsRef = collection(db, 'schools', schoolId, 'transactions');
  
  // Check exact control number match
  const q1 = query(transactionsRef, where('controlNumber', '==', input.controlNumber), limit(1));
  const snap1 = await getDocs(q1);
  if (!snap1.empty) throw new Error(`Control Number ${input.controlNumber} already used in ledger.`);

  // Check similar payment (Same student + same amount + within 24h)
  const yesterday = new Date();
  yesterday.setHours(yesterday.getHours() - 24);
  
  const q2 = query(
    transactionsRef, 
    where('studentId', '==', input.studentId),
    where('amount', '==', input.amount),
    where('status', 'in', ['Verified', 'Pending']),
    limit(5)
  );
  
  const snap2 = await getDocs(q2);
  const duplicates = snap2.docs.filter(d => {
    const data = d.data();
    const created = data.createdAt?.toDate() || new Date(0);
    return created > yesterday;
  });

  if (duplicates.length > 0) {
    throw new Error(`Potential duplicate: A payment of TZS ${input.amount} for this student was recorded within the last 24 hours.`);
  }
}

/**
 * Core Forensic Engine: Process Payment
 * Uses Firestore transactions to ensure atomic integrity across Global Ledger and Student Node.
 */
export async function processPaymentTransaction(
  db: Firestore, 
  input: TransactionInput,
  schoolId: string = 'school-001'
) {
  // 1. Validate Input
  const data = TransactionSchema.parse(input);
  
  // 2. Perform duplicate check before starting transaction (Firestore queries inside transactions are restricted)
  await checkDuplicate(db, schoolId, data);

  const studentRef = doc(db, 'schools', schoolId, 'students', data.studentId);
  const transactionId = doc(collection(db, 'schools', schoolId, 'transactions')).id;
  const transactionRef = doc(db, 'schools', schoolId, 'transactions', transactionId);

  return runTransaction(db, async (transaction) => {
    const studentDoc = await transaction.get(studentRef);
    if (!studentDoc.exists()) throw new Error("Student Node not found");

    const studentData = studentDoc.data();
    const currentPaid = studentData.totalPaid || 0;
    const expected = studentData.totalFeesExpected || 0;
    const arrears = studentData.arrears || 0;

    const newTotalPaid = currentPaid + data.amount;
    const newBalance = (expected + arrears) - newTotalPaid;

    // 3. Record Forensic Audit Node
    const transactionPayload = {
      ...data,
      id: transactionId,
      status: 'Verified', // Manual entry assumed verified by default unless it's a bank sync
      createdAt: serverTimestamp(),
      reconciled: true,
      reconciledAt: serverTimestamp(),
      reconciledBy: data.recordedBy,
      studentName: studentData.name,
      class: studentData.class,
      currency: 'TZS',
      disputed: false,
      integrityHash: Math.random().toString(36).substring(2, 15)
    };

    transaction.set(transactionRef, transactionPayload);

    // 4. Update Sovereign Student Summary
    transaction.update(studentRef, {
      totalPaid: increment(data.amount),
      balance: newBalance,
      lastPaymentDate: serverTimestamp(),
      paymentStatus: newBalance <= 0 ? 'CLEARED' : 'PARTIAL'
    });

    return { success: true, transactionId, newBalance };
  }).then(async (res) => {
    // 5. Trigger Omnichannel Alert (Non-blocking)
    triggerN8nWebhook('payment-verified', {
      studentId: data.studentId,
      studentName: studentDoc.data()?.name,
      amount: data.amount,
      controlNumber: data.controlNumber,
      parentContact: studentDoc.data()?.contact
    });
    return res;
  });
}

/**
 * Handles ClickPesa Webhook Reconciliation
 * Automates the matching of bank deposits to pending control numbers.
 */
export async function reconcileWebhookPayment(
  db: Firestore,
  payload: { controlNumber: string, bankReference: string, amount: number, externalRef: string },
  schoolId: string = 'school-001'
) {
  const transactionsRef = collection(db, 'schools', schoolId, 'transactions');
  const q = query(transactionsRef, where('controlNumber', '==', payload.controlNumber), limit(1));
  const snap = await getDocs(q);

  if (snap.empty) {
    // Log as Unknown Payment Node
    const unknownRef = doc(collection(db, 'schools', schoolId, 'unresolved_payments'));
    await transaction.set(unknownRef, {
      ...payload,
      status: 'Unknown_Control_No',
      receivedAt: serverTimestamp()
    });
    return { success: false, reason: "Control Number not found" };
  }

  const transactionDoc = snap.docs[0];
  const transactionData = transactionDoc.data();

  if (transactionData.status === 'Verified') return { success: true, alreadyReconciled: true };

  const studentRef = doc(db, 'schools', schoolId, 'students', transactionData.studentId);

  return runTransaction(db, async (tx) => {
    tx.update(transactionDoc.ref, {
      status: 'Verified',
      bankReference: payload.bankReference,
      transactionReference: payload.externalRef,
      reconciled: true,
      reconciledAt: serverTimestamp()
    });

    tx.update(studentRef, {
      totalPaid: increment(payload.amount),
      balance: increment(-payload.amount),
      paymentStatus: 'VERIFIED_SYNC'
    });
  });
}
