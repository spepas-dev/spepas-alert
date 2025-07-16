import express from 'express';
import cron from 'node-cron';

import { jobs } from './jobs';

const app = express();
const port = 4002;

app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', true);

export function startScheduler() {
  cron.schedule('*/5 * * * *', async () => {
    // console.log('Cron job triggered');

    await Promise.all(
      jobs?.map(async (job) => {
        try {
          await job.handler();
          // console.log(`${job.job_name} completed`);
        } catch (err) {
          console.log(`${job.job_name} failed: ${(err as Error).message}`);
        }
      })
    );

    // console.log('All jobs completed');
  });
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  startScheduler();
});
