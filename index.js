function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays) {
    return arrays.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    
    this.timeInEvents.push({
            type: 'TimeIn',
            hour: parseInt(hour),
            date
        }) 
    
    return this
}

function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    
    this.timeOutEvents.push({
            type: 'TimeOut',
            hour: parseInt(hour),
            date
        }) 
    
    return this
}

function hoursWorkedOnDate(dateStamp) {
    let inEvent = this.timeInEvents.find(e => e.date === dateStamp)

    let outEvent = this.timeOutEvents.find(e => e.date === dateStamp)

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(dateStamp) {
    let rawWage = hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour

    return parseFloat(rawWage.toString())
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName)
}

function calculatePayroll(array) {
    return array.reduce((prev, record) => prev + allWagesFor.call(record), 0)
}



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

