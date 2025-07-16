export interface Job {
  job_name: string;
  handler: () => Promise<void>;
}
