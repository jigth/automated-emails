//TODO: tal cron jobs in a more flexible way here, using the installed 'cron' library
const CronJob = require('cron').CronJob;


// Print date each ten seconds
const job = new CronJob(`*/10 * * * * *`, function() {
	const d = new Date();
    console.log('Each ten Seconds!:', d);
});

job.start();