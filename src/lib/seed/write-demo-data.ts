import { doc, writeBatch, collection, setDoc, getFirestore } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { 
  generateSchool, 
  generateStaff, 
  generateStudents, 
  generateGrades, 
  generateTransactions, 
  generateAttendance 
} from './generate-demo-data';

const { firestore: db } = initializeFirebase();
const SCHOOL_ID = 'demo-school-001';

export async function seedDemoData(onProgress?: (step: string, percent: number) => void) {
  try {
    // 1. Generate all data
    if (onProgress) onProgress('Generating data structures...', 10);
    const school = generateSchool();
    const staff = generateStaff();
    const students = generateStudents();
    const grades = generateGrades(students);
    const transactions = generateTransactions(students, staff);
    const attendance = generateAttendance(students);

    // 2. Write School Profile
    if (onProgress) onProgress('Writing school profile...', 20);
    await setDoc(doc(db, 'schools', SCHOOL_ID), school);

    // 3. Write Staff (Batched)
    if (onProgress) onProgress('Writing faculty nodes...', 30);
    const staffBatch = writeBatch(db);
    staff.forEach((s, i) => {
      const ref = doc(db, 'schools', SCHOOL_ID, 'staff', `staff-id-${i}`);
      staffBatch.set(ref, s);
    });
    await staffBatch.commit();

    // 4. Write Students (Batched)
    if (onProgress) onProgress('Synchronizing student directory...', 50);
    const studentBatch = writeBatch(db);
    students.forEach(s => {
      const ref = doc(db, 'schools', SCHOOL_ID, 'students', s.id);
      studentBatch.set(ref, s);
    });
    await studentBatch.commit();

    // 5. Write Grades (Multi-Batched)
    if (onProgress) onProgress('Compiling academic matrices...', 70);
    for (let i = 0; i < grades.length; i += 400) {
      const batch = writeBatch(db);
      const chunk = grades.slice(i, i + 400);
      chunk.forEach((g, j) => {
        const ref = doc(collection(db, 'schools', SCHOOL_ID, 'grades'));
        batch.set(ref, g);
      });
      await batch.commit();
    }

    // 6. Write Transactions
    if (onProgress) onProgress('Injecting financial ledger...', 85);
    const txBatch = writeBatch(db);
    transactions.forEach(tx => {
      const ref = doc(collection(db, 'schools', SCHOOL_ID, 'transactions'));
      txBatch.set(ref, tx);
    });
    await txBatch.commit();

    // 7. Write Attendance (Multi-Batched)
    if (onProgress) onProgress('Logging historical presence...', 95);
    for (let i = 0; i < attendance.length; i += 400) {
      const batch = writeBatch(db);
      const chunk = attendance.slice(i, i + 400);
      chunk.forEach(a => {
        const ref = doc(collection(db, 'schools', SCHOOL_ID, 'attendance'));
        batch.set(ref, a);
      });
      await batch.commit();
    }

    if (onProgress) onProgress('Seed complete!', 100);
    
    return { 
      success: true, 
      summary: `Seeded: 1 school, 8 staff, 60 students, ${grades.length} grades, ${transactions.length} transactions, ${attendance.length} attendance records.` 
    };

  } catch (error: any) {
    console.error('[SEED] Failed:', error);
    throw new Error(`Data seeding aborted: ${error.message}`);
  }
}
