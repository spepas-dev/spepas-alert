import dotenv from 'dotenv';

dotenv.config({});

export async function sendAlert({ serviceName, serviceUrl }: { serviceName: string; serviceUrl: string }) {
  await fetch(process.env.TEAMS_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `🚨 *ALERT*: ${serviceName} is DOWN at ${serviceUrl}`
    })
  })
    .then((res) => {
      if (res.ok) {
        console.log('✅ Alert sent to Microsoft Teams');
      } else {
        console.error('❌ Failed to send alert', res.statusText);
      }
    })
    .catch((err) => console.error('❌ Error sending alert:', err));
}
