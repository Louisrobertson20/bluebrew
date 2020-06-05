let workers = process.env.WEB_CONCURRENCY || 2;

let maxJobsPerWorker = 50;

workQueue.process(maxJobsPerWorker, async (job) => {
  // ...
});
