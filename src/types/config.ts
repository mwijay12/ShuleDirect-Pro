
export interface IntegrationConfig {
  n8nWebhookUrl: string;
  n8nEnabled: boolean;
  updatedAt: any;
}

export const DEFAULT_INTEGRATION_CONFIG: IntegrationConfig = {
  n8nWebhookUrl: '',
  n8nEnabled: false,
  updatedAt: null,
};
