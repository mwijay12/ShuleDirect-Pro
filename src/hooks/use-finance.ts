
'use client';

import { useMemo } from 'react';
import { useFirestore, useCollection, useDoc, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, doc, where } from 'firebase/firestore';

/**
 * Reactive Hook for Individual Student Balances
 */
export function useStudentBalance(studentId: string, schoolId: string = 'school-001') {
  const db = useFirestore();

  const studentRef = useMemoFirebase(() => doc(db, 'schools', schoolId, 'students', studentId), [db, studentId]);
  const paymentsQuery = useMemoFirebase(() => 
    query(
      collection(db, 'schools', schoolId, 'students', studentId, 'payments'),
      orderBy('processedAt', 'desc')
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
 * Institutional Reconciliation Hook
 */
export function useInstitutionalReconciliation(schoolId: string = 'school-001') {
  const db = useFirestore();
  const studentsQuery = useMemoFirebase(() => collection(db, 'schools', schoolId, 'students'), [db]);
  const { data: students, isLoading } = useCollection(studentsQuery);

  const totals = useMemo(() => {
    if (!students) return { collected: 0, outstanding: 0, target: 0 };
    
    return students.reduce((acc, curr) => ({
      collected: acc.collected + (curr.totalPaid || 0),
      target: acc.target + (curr.totalFeesExpected || 0) + (curr.arrears || 0),
      outstanding: acc.outstanding + (curr.balance || 0)
    }), { collected: 0, outstanding: 0, target: 0 });
  }, [students]);

  return {
    ...totals,
    isLoading,
    collectionRate: totals.target > 0 ? (totals.collected / totals.target) * 100 : 0
  };
}
