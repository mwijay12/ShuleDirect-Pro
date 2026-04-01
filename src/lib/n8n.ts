
/**
 * Real n8n Webhook Integration — Mwijay Edition
 */
export async function triggerN8nWebhook(webhookPath: string, data: any) {
  const baseUrl = localStorage.getItem("shule_n8n_url");
  if (!baseUrl) {
    console.warn("n8n Webhook Base URL not configured in Settings.");
    return null;
  }

  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const url = `${cleanBase}/${webhookPath}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        node: "ShuleDirect Pro 2026",
      }),
    });

    if (!response.ok) throw new Error(`Webhook Error: ${response.statusText}`);
    
    return await response.json();
  } catch (error) {
    console.error("n8n Dispatch Failed:", error);
    return null;
  }
}
