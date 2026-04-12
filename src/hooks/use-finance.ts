
'use client';

import { useMemo } from 'react';
import { useFirestore, useCollection, useDoc, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, doc, where, limit } from 'firebase/firestore';

/**
 * Reactive Hook for Individual Student Balances
 */
export function useStudentBalance(studentId: string, schoolId: string = 'school-001') {
  const db = useFirestore();

  const studentRef = useMemoFirebase(() => doc(db, 'schools', schoolId, 'students', studentId), [db, studentId]);
  const paymentsQuery = useMemoFirebase(() => 
    query(
      collection(db, 'schools', schoolId, 'transactions'),
      where('studentId', '==', studentId),
      orderBy('createdAt', 'desc')
    ), [db, studentId]
  );

  const { data: student } = useDoc(studentRef);
  const { data: payments, isLoading: paymentsLoading } = useCollection(paymentsQuery);

  return {
    balance: student?.balance || 0,
    totalPaid: student?.totalPaid || 0,
    totalExpected: (student?.totalFeesExpected || 0) + (student?.arrears || 0),
    history: payments || [],
    isLoading: paymentsLoading,
    status: student?.paymentStatus || 'PENDING'
  };
}

/**
 * Institutional Reconciliation & Forensic Stats Hook
 */
export function useInstitutionalReconciliation(schoolId: string = 'school-001') {
  const db = useFirestore();
  const studentsQuery = useMemoFirebase(() => collection(db, 'schools', schoolId, 'students'), [db]);
  const { data: students, isLoading } = useCollection(studentsQuery);

  const transactionsQuery = useMemoFirebase(() => 
    query(collection(db, 'schools', schoolId, 'transactions'), orderBy('createdAt', 'desc'))
  , [db]);
  const { data: transactions, isLoading: transLoading } = useCollection(transactionsQuery);

  const totals = useMemo(() => {
    if (!students) return { collected: 0, outstanding: 0, target: 0 };
    
    return students.reduce((acc, curr) => ({
      collected: acc.collected + (curr.totalPaid || 0),
      target: acc.target + (curr.totalFeesExpected || 0) + (curr.arrears || 0),
      outstanding: acc.outstanding + (curr.balance || 0)
    }), { collected: 0, outstanding: 0, target: 0 });
  }, [students]);

  const auditStats = useMemo(() => {
    if (!transactions) return { pending: 0, disputed: 0, weeklyTotal: 0 };
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    return transactions.reduce((acc, curr) => {
      if (curr.status === 'Pending') acc.pending++;
      if (curr.disputed) acc.disputed++;
      if (curr.createdAt?.toDate() > weekAgo) acc.weeklyTotal += curr.amount;
      return acc;
    }, { pending: 0, disputed: 0, weeklyTotal: 0 });
  }, [transactions]);

  return {
    ...totals,
    ...auditStats,
    transactions: transactions || [],
    isLoading: isLoading || transLoading,
    collectionRate: totals.target > 0 ? (totals.collected / totals.target) * 100 : 0
  };
}
