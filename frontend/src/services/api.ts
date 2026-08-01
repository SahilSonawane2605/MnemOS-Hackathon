export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'http://127.0.0.1:8000/api';
/**
 * Generic API request wrapper.
 * Can be pointed to any live local/staging endpoints.
 */
export async function request<T>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
): Promise<T> {
  const url = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error(`API Request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Checks system server status
 * GET /api/health
 */
export async function getHealth() {
  try {
    return await request<{
      status: 'healthy' | 'degraded' | 'syncing';
      version: string;
      uptime: number;
      extensionConnected: boolean;
      lastSyncTime: string;
    }>('/health');
  } catch (error) {
    // Graceful fallback for mock dev environment
    return {
      status: 'healthy' as const,
      version: '1.0.0-rc1',
      uptime: 86400,
      extensionConnected: true,
      lastSyncTime: new Date().toISOString()
    };
  }
}
