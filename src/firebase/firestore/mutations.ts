
'use client';
/**
 * @fileOverview Hardened Mutation Engine with Retry Queue for Shule Altra.
 */

import {
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const { firestore: db } = initializeFirebase();

const retryQueue: Array<{
  op: () => Promise<void>;
  attempts: number;
  path: string;
}> = [];

let retryTimer: NodeJS.Timeout | null = null;

function processRetryQueue() {
  if (retryQueue.length === 0) {
    if (retryTimer) clearInterval(retryTimer);
    retryTimer = null;
    return;
  }

  if (!retryTimer) {
    retryTimer = setInterval(async () => {
      const item = retryQueue[0];
      try {
        await item.op();
        retryQueue.shift();
        console.log(`[MUTATION] Recovered: ${item.path}`);
      } catch (err) {
        item.attempts++;
        if (item.attempts > 5) retryQueue.shift(); // Drop after 5 tries
      }
    }, 5000);
  }
}

export function addDocumentNonBlocking(path: string, data: any) {
  const docRef = doc(collection(db, path));
  const payload = { ...data, _id: docRef.id, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
  
  const op = () => setDoc(docRef, payload);
  op().catch(() => {
    retryQueue.push({ op, attempts: 0, path: docRef.path });
    processRetryQueue();
  });
  
  return docRef.id;
}

export function updateDocumentNonBlocking(path: string, data: any) {
  const docRef = doc(db, path);
  const payload = { ...data, updatedAt: serverTimestamp() };
  
  const op = () => updateDoc(docRef, payload);
  op().catch(() => {
    retryQueue.push({ op, attempts: 0, path: docRef.path });
    processRetryQueue();
  });
}

export async function batchMutations(ops: Array<{ type: 'set' | 'update' | 'delete', path: string, data?: any }>) {
  const batch = writeBatch(db);
  ops.forEach(o => {
    const ref = doc(db, o.path);
    if (o.type === 'set') batch.set(ref, { ...o.data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    if (o.type === 'update') batch.update(ref, { ...o.data, updatedAt: serverTimestamp() });
    if (o.type === 'delete') batch.delete(ref);
  });
  return batch.commit();
}
