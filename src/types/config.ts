
/**
 * @fileOverview Configuration Types for Shule Altra.
 */

import { Timestamp } from 'firebase/firestore';

export interface IntegrationConfig {
  n8nWebhookUrl: string;
  n8nEnabled: boolean;
  updatedAt: Timestamp | null;
}

export const DEFAULT_INTEGRATION_CONFIG: IntegrationConfig = {
  n8nWebhookUrl: '',
  n8nEnabled: false,
  updatedAt: null,
};
