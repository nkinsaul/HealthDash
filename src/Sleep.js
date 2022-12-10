

class Sleep {
    constructor(sleepData) {
        this.sleepData = sleepData 
    }

    avgHoursSleptPerDay (iD) {
        const userSleepData = this.sleepData.filter(user => {
            return user.userID === iD
        })
        const totalHoursSlept = userSleepData.reduce((acc, dataPoint) => {
            acc += dataPoint.hoursSlept
            return acc
        }, 0)
        return Math.round(totalHoursSlept / userSleepData.length)
    }
    
    avgSleepQuality (iD) {
        const userSleepData = this.sleepData.filter(user => {
            return user.userID === iD
        })
        const totalSleepQuality = userSleepData.reduce((acc, dataPoint) => {
            acc += dataPoint.sleepQuality
            return acc
        }, 0)
        return Math.round(totalSleepQuality / userSleepData.length)
    }
    
    getHoursSleptOnDay(iD, date) {
        const userSleepData = this.sleepData.filter(user => {
            return user.userID === iD && user.date === date
        })
        return userSleepData[0].hoursSlept
    }

    getSleepQualityOnDay(iD, date) {
        const userSleepData = this.sleepData.filter(user => {
            return user.userID === iD && user.date === date
        })
        return userSleepData[0].sleepQuality
    }

    getHoursSleptOverWeek(iD, startDate) {
        const userSleepData = this.sleepData.filter(user => {
            return user.userID === iD
        })

        const obj = userSleepData.find(dataPoint => {
            return dataPoint.date === startDate
        })
        let index = userSleepData.indexOf(obj)
        const hoursSleptPerWeek = userSleepData.splice(index, 3)
        return hoursSleptPerWeek.map(data => {
            return data.hoursSlept
        })
    }

    // sleep quality

    // all users, average sleep quality

}

export default Sleep;