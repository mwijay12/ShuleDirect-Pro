
'use client';

import { useMemo } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, doc, serverTimestamp } from 'firebase/firestore';
import { addDocumentNonBlocking, updateDocumentNonBlocking, setDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export interface SyllabusTopic {
  name: string;
  nectaCode: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Revised';
  hoursTaught: number;
}

export interface SyllabusTracking {
  id: string;
  subject: string;
  class: string;
  teacherId?: string;
  teacherName?: string;
  percentageCovered: number;
  topics: SyllabusTopic[];
  lastUpdated: any;
  schoolId: string;
}

const DEFAULT_SYLLABUS_DATA = [
  { subject: "Mathematics", level: "Form 2", percentage: 78, topics: [{ name: "Quadratic Equations", nectaCode: "CSEE-MATH-2.1", status: "Completed", hoursTaught: 12 }] },
  { subject: "Physics", level: "Form 2", percentage: 62, topics: [{ name: "Kinematics", nectaCode: "CSEE-PHYS-2.3", status: "In Progress", hoursTaught: 8 }] },
  { subject: "Kiswahili", level: "Form 2", percentage: 94, topics: [{ name: "Sarufi", nectaCode: "CSEE-KISW-2.1", status: "Completed", hoursTaught: 15 }] },
  { subject: "English", level: "Form 2", percentage: 78, topics: [{ name: "Composition", nectaCode: "CSEE-ENGL-2.4", status: "Completed", hoursTaught: 10 }] },
];

export function useSyllabusTracking(schoolId: string = 'school-001') {
  const db = useFirestore();

  const trackingQuery = useMemoFirebase(() => 
    query(
      collection(db, 'schools', schoolId, 'syllabus_tracking'),
      orderBy('subject', 'asc')
    ), [db, schoolId]
  );

  const { data: trackerData, isLoading } = useCollection<SyllabusTracking>(trackingQuery);

  const initializeDefaultSyllabus = () => {
    DEFAULT_SYLLABUS_DATA.forEach(item => {
      addDocumentNonBlocking(collection(db, 'schools', schoolId, 'syllabus_tracking'), {
        subject: item.subject,
        class: item.level,
        percentageCovered: item.percentage,
        topics: item.topics,
        lastUpdated: serverTimestamp(),
        schoolId
      });
    });
  };

  const updateCoverage = (id: string, percentage: number) => {
    updateDocumentNonBlocking(doc(db, 'schools', schoolId, 'syllabus_tracking', id), {
      percentageCovered: percentage,
      lastUpdated: serverTimestamp()
    });
  };

  const updateTopic = (id: string, topics: SyllabusTopic[]) => {
    updateDocumentNonBlocking(doc(db, 'schools', schoolId, 'syllabus_tracking', id), {
      topics,
      lastUpdated: serverTimestamp()
    });
  };

  // NECTA Readiness Calculation
  const readiness = useMemo(() => {
    if (!trackerData || trackerData.length === 0) return { overall: 0, status: 'UNKNOWN' };
    const avg = trackerData.reduce((acc, curr) => acc + curr.percentageCovered, 0) / trackerData.length;
    return {
      overall: Math.round(avg),
      status: avg > 85 ? 'OPTIMAL' : avg > 60 ? 'ON TRACK' : 'CRITICAL'
    };
  }, [trackerData]);

  return {
    syllabus: trackerData || [],
    isLoading,
    readiness,
    updateCoverage,
    updateTopic,
    initializeDefaultSyllabus
  };
}
