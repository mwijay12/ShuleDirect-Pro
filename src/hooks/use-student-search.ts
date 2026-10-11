
'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  type QueryDocumentSnapshot,
  type DocumentData,
} from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const { firestore: db } = initializeFirebase();
const PAGE_SIZE = 20;
const DEBOUNCE_MS = 300;

export function useStudentSearch(schoolId: string = 'school-001') {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const lastDocRef = useRef<QueryDocumentSnapshot<DocumentData> | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const searchStudents = useCallback(
    async (searchTerm: string, filters?: any, paginate = false) => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

      setLoading(true);
      
      debounceTimerRef.current = setTimeout(async () => {
        try {
          const studentsRef = collection(db, 'schools', schoolId, 'students');
          const constraints: any[] = [];

          if (filters?.class) constraints.push(where('class', '==', filters.class));
          if (filters?.type) constraints.push(where('type', '==', filters.type));

          if (searchTerm.trim()) {
            const upper = searchTerm.trim().toUpperCase();
            constraints.push(where('name', '>=', upper), where('name', '<=', upper + '\uf8ff'));
          }

          constraints.push(orderBy('name'));
          constraints.push(limit(PAGE_SIZE));

          if (paginate && lastDocRef.current) {
            constraints.push(startAfter(lastDocRef.current));
          }

          const q = query(studentsRef, ...constraints);
          const snapshot = await getDocs(q);

          const fetched = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

          if (snapshot.docs.length > 0) {
            lastDocRef.current = snapshot.docs[snapshot.docs.length - 1];
          }

          setResults(prev => paginate ? [...prev, ...fetched] : fetched);
          setHasMore(snapshot.docs.length === PAGE_SIZE);
          setLoading(false);
        } catch (error) {
          console.error('[SEARCH] Failed:', error);
          setLoading(false);
        }
      }, DEBOUNCE_MS);
    },
    [schoolId]
  );

  return { results, loading, hasMore, searchStudents };
}
