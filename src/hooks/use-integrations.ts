
'use client';

import { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore, useAuth } from '@/firebase';
import { IntegrationConfig, DEFAULT_INTEGRATION_CONFIG } from '@/types/config';

export function useIntegrations() {
  const db = useFirestore();
  const { schoolId, role } = useAuth();
  const [config, setConfig] = useState<IntegrationConfig>(DEFAULT_INTEGRATION_CONFIG);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!schoolId) return;

    const configRef = doc(db, 'schools', schoolId, 'config', 'integrations');
    
    const unsubscribe = onSnapshot(configRef, (snapshot) => {
      if (snapshot.exists()) {
        setConfig(snapshot.data() as IntegrationConfig);
      }
      setLoading(false);
    }, (err) => {
      console.error('[INTEGRATIONS] Fetch error:', err);
      setError('Failed to load integration settings.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db, schoolId]);

  const updateConfig = async (updates: Partial<IntegrationConfig>) => {
    if (!schoolId || role !== 'ADMIN') {
      throw new Error('Unauthorized: Admin access required.');
    }

    const configRef = doc(db, 'schools', schoolId, 'config', 'integrations');
    try {
      await updateDoc(configRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error('[INTEGRATIONS] Update error:', err);
      throw new Error('Failed to save configuration node.');
    }
  };

  return { config, loading, error, updateConfig };
}
