import moment from 'moment';

let dateFunc = {
  getMonthViewStartDate (date, firstDay) {
    firstDay = parseInt(firstDay);
    let start = moment(date);
    let startOfMonth = moment(start.startOf('month'));
    console.log('startOfMonth:',startOfMonth)
    console.log(startOfMonth.day()) // 每月的第一天是星期几？
    start.subtract(startOfMonth.day(), 'days');

    if (startOfMonth.day() < firstDay) {
      start.subtract(7, 'days');
    }
    start.add(firstDay, 'days');
    console.log('start:',start)
    return start;
  },
  getMonthViewEndDate (date) {
    return this.getMonthViewStartDate().add(6, 'weeks');
  }
};

export default dateFunc;
