import { ApiTransportOptionsInterface, Payload } from '../utils/types';

export async function doRequest(options: ApiTransportOptionsInterface, data: Payload): Promise<void> {
  try {
    options.headers = { 'Content-Type': 'application/json', ...options.headers };
    const response = await fetch(options.url, {
      method: 'POST',
      headers: options.headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to send log data. Server returned status ${response.status}`);
    }
  } catch (error) {
    // TODO: Find a way to handle failed cases without console
    // console.error('Error sending log data:', error);
  }
}
