
'use client';
/**
 * @fileOverview Secure Dispatch Node for Shule Altra.
 * Configuration is fetched from Firestore config rather than localStorage.
 */

import { doc, getDoc } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const { firestore: db } = initializeFirebase();

interface N8nConfig {
  webhookUrl: string;
  secret: string;
  enabled: boolean;
}

export async function getSecureWebhookConfig(
  schoolId: string = 'school-001'
): Promise<N8nConfig | null> {
  try {
    const configRef = doc(db, 'schools', schoolId, 'config', 'integrations');
    const configSnap = await getDoc(configRef);

    if (!configSnap.exists()) {
      // Fallback to localStorage during transition
      const legacyUrl = typeof window !== 'undefined' ? localStorage.getItem("shule_n8n_url") : null;
      if (legacyUrl) return { webhookUrl: legacyUrl, secret: '', enabled: true };
      return null;
    }

    const data = configSnap.data();
    return {
      webhookUrl: data.n8nWebhookUrl ?? '',
      secret: data.n8nSecret ?? '',
      enabled: data.n8nEnabled ?? false,
    };
  } catch (error) {
    console.error('[N8N] Config fetch failed:', error);
    return null;
  }
}

export async function triggerN8nWebhook(
  eventType: string,
  payload: Record<string, any>,
  schoolId: string = 'school-001'
): Promise<boolean> {
  const config = await getSecureWebhookConfig(schoolId);

  if (!config || !config.webhookUrl) {
    console.warn('[N8N] Dispatch skipped — not configured');
    return false;
  }

  try {
    const response = await fetch(config.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shule-Secret': config.secret,
        'X-Shule-Event': eventType,
      },
      body: JSON.stringify({
        schoolId,
        eventType,
        timestamp: new Date().toISOString(),
        node: "Shule Altra Pro 2026",
        data: payload,
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status}`);
    }

    console.log(`[N8N] Dispatched: ${eventType}`);
    return true;
  } catch (error) {
    console.error('[N8N] Dispatch error:', error);
    return false;
  }
}
