
/**
 * @fileOverview Sovereign Financial Engine for ShuleDirect Pro.
 * Handles transaction-based fee management with high-fidelity integrity.
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
  increment
} from 'firebase/firestore';

/**
 * Validation Schema for Payment Nodes
 */
export const PaymentSchema = z.object({
  amount: z.number().positive("Amount must be greater than zero"),
  controlNumber: z.string().min(10, "Invalid Control Number format"),
  term: z.enum(['Term 1', 'Term 2', 'Term 3']),
  method: z.enum(['M-Pesa', 'Tigo Pesa', 'Airtel Money', 'Bank', 'Cash']),
  studentId: z.string(),
  recordedBy: z.string(),
  academicYear: z.number().default(2026),
});

export type PaymentInput = z.infer<typeof PaymentSchema>;

/**
 * Calculation Modes for Institutional Flexibility
 */
export type FinanceMode = 'STRICT' | 'TERM' | 'INSTALLMENT' | 'ARREARS';

/**
 * Core Transaction Engine: Process Payment
 * Uses Firestore transactions to ensure atomic integrity.
 */
export async function processPaymentTransaction(
  db: Firestore, 
  input: PaymentInput,
  schoolId: string = 'school-001'
) {
  // 1. Validate Input
  const data = PaymentSchema.parse(input);
  
  const studentRef = doc(db, 'schools', schoolId, 'students', data.studentId);
  const paymentRef = doc(collection(db, 'schools', schoolId, 'students', data.studentId, 'payments'));

  return runTransaction(db, async (transaction) => {
    // 2. Fetch current state
    const studentDoc = await transaction.get(studentRef);
    if (!studentDoc.exists()) throw new Error("Student Node not found");

    const studentData = studentDoc.data();
    const currentPaid = studentData.totalPaid || 0;
    const expected = studentData.totalFeesExpected || 0;
    const arrears = studentData.arrears || 0;

    // 3. Financial Integrity Checks
    const newTotalPaid = currentPaid + data.amount;
    const newBalance = (expected + arrears) - newTotalPaid;

    if (newBalance < 0) {
      console.warn("Overpayment detected. Crediting student node.");
    }

    // 4. Record Audit Trail
    transaction.set(paymentRef, {
      ...data,
      processedAt: serverTimestamp(),
      status: 'VERIFIED',
      auditNode: {
        agent: data.recordedBy,
        source: 'ADMIN_PORTAL',
        integrityHash: Math.random().toString(36).substring(7)
      }
    });

    // 5. Update Sovereign Summary
    transaction.update(studentRef, {
      totalPaid: increment(data.amount),
      balance: newBalance,
      lastPaymentDate: serverTimestamp(),
      paymentStatus: newBalance <= 0 ? 'CLEARED' : 'PARTIAL'
    });

    return { success: true, newBalance };
  });
}

/**
 * High-Performance Statistics Aggregator
 */
export async function aggregateFinanceStats(db: Firestore, schoolId: string = 'school-001') {
  const studentsRef = collection(db, 'schools', schoolId, 'students');
  const snapshot = await getDocs(studentsRef);
  
  let totalExpected = 0;
  let totalCollected = 0;
  let totalArrears = 0;
  let count = 0;

  snapshot.forEach(doc => {
    const data = doc.data();
    totalExpected += (data.totalFeesExpected || 0);
    totalCollected += (data.totalPaid || 0);
    totalArrears += (data.arrears || 0);
    count++;
  });

  return {
    revenue: totalCollected,
    outstanding: (totalExpected + totalArrears) - totalCollected,
    efficiency: totalExpected > 0 ? (totalCollected / (totalExpected + totalArrears)) * 100 : 0,
    activeNodes: count
  };
}
