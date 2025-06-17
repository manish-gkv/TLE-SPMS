import cron from 'node-cron';

class cornScheduler {
    constructor() {
        this.task = null;
        this.job = null;
        this.CronTime = '45 1 * * *'; 
    }
    setCronTime(cronTime) {
        if (this.validateCronTime(cronTime)) {
            this.CronTime = cronTime;
        } else {
            throw new Error("Invalid cron time format");
        }
    }
    setJob(job) {
        this.job = job;
    }
    schedule() {
        if (this.task) {
            this.task.stop();
        }
        this.task = cron.schedule(this.CronTime, this.job, {
            scheduled: true,
            timezone: 'Asia/Kolkata'
        });
    } 
    validateCronTime(cronTime) {
        return cron.validate(cronTime);
    }
    getCronTimeFromDB(){
        
    }
}

export default new cornScheduler();