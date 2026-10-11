import { collection, getDocs, writeBatch, doc, getFirestore } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const { firestore: db } = initializeFirebase();
const SCHOOL_ID = 'demo-school-001';
const COLLECTIONS = ['staff', 'students', 'grades', 'transactions', 'attendance'];

export async function clearDemoData() {
  try {
    for (const collName of COLLECTIONS) {
      const collRef = collection(db, 'schools', SCHOOL_ID, collName);
      const snapshot = await getDocs(collRef);
      
      if (snapshot.empty) continue;

      // Firestore batch limit is 500
      for (let i = 0; i < snapshot.docs.length; i += 400) {
        const batch = writeBatch(db);
        const chunk = snapshot.docs.slice(i, i + 400);
        chunk.forEach(d => batch.delete(d.ref));
        await batch.commit();
      }
    }
    
    return { success: true, message: "Demo school data cleared." };
  } catch (error: any) {
    console.error('[CLEAR_SEED] Failed:', error);
    throw new Error(`Clear operation failed: ${error.message}`);
  }
}
