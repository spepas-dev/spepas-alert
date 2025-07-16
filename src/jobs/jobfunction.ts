import dotenv from 'dotenv';

import { sendAlert } from './sendAlert';

dotenv.config({});
export async function jobFunction({ serviceName, serviceUrl }: { serviceName: string; serviceUrl: string }): Promise<void> {
  await fetch(serviceUrl, {
    method: 'GET'
    // headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        console.log(`[OK] ${serviceName} is UP: ${serviceUrl}`);
      } else {
        console.error(`[ERROR] Unexpected response code: ${res.statusText}`);
        sendAlert({ serviceName, serviceUrl });
      }
    })
    .catch((err) => {
      sendAlert({ serviceName, serviceUrl });
      console.error('❌ Error sending alert:', err);
    });
}
