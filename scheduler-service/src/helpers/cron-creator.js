const CronJob = require('cron').CronJob;

const createCronjob = (cronExpression, executableFunction) => {
    return new CronJob(cronExpression, executableFunction);
}

module.exports = createCronjob;

// USAGE EXAMPLE (Don't delete)
//const job = createCronjob('*/10 * * * * *', yourFunctionHere);
//job.start()
