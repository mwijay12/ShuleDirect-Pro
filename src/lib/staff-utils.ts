import { Firestore, collection, getDocs } from 'firebase/firestore';

export async function generateStaffNo(db: Firestore, schoolId: string): Promise<string> {
  const year = new Date().getFullYear();
  const staffRef = collection(db, 'schools', schoolId, 'staff');
  const snapshot = await getDocs(staffRef);
  
  const prefix = `ALT-STF-${year}`;
  
  // Extract all sequence numbers for the current year
  const sequences = snapshot.docs
    .map(doc => doc.data().staffNo as string)
    .filter(no => no?.startsWith(prefix))
    .map(no => {
      const parts = no.split('-');
      return parseInt(parts[parts.length - 1], 10);
    })
    .filter(seq => !isNaN(seq));

  const maxSeq = sequences.length > 0 ? Math.max(...sequences) : 0;
  const nextSeq = String(maxSeq + 1).padStart(3, '0');
  
  return `${prefix}-${nextSeq}`;
}
