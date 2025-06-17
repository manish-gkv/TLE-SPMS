import cron from 'node-cron';

class cornScheduler {
    constructor() {
        this.task = null;
        this.CronTime = '45 1 * * *'; 
    }
    setCronTime(cronTime) {
        if (this.validateCronTime(cronTime)) {
            this.CronTime = cronTime;
        } else {
            throw new Error("Invalid cron time format");
        }
    }
    schedule(cronTime, job) {
        if (this.task) {
            this.task.stop();
        }
        this.setCronTime(cronTime);
        this.task = cron.schedule(cronTime, job, {
            scheduled: true,
            timezone: 'Asia/Kolkata'
        });
    } 
    validateCronTime(cronTime) {
        return cron.validate(cronTime);
    }
}

export default new cornScheduler();