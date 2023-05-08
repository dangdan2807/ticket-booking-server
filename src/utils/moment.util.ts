export class MyMoment {
  private date;
  constructor(date?) {
    this.date = date ? new Date(date) : new Date();
  }

  format(format) {
    const pad = (value) => (value < 10 ? `0${value}` : value.toString());
    const year = this.date.getFullYear();
    const month = pad(this.date.getMonth() + 1);
    const day = pad(this.date.getDate());
    const hours = pad(this.date.getHours());
    const minutes = pad(this.date.getMinutes());
    const seconds = pad(this.date.getSeconds());

    format = format.replace('YYYY', year);
    format = format.replace('MM', month);
    format = format.replace('DD', day);
    format = format.replace('HH', hours);
    format = format.replace('mm', minutes);
    format = format.replace('ss', seconds);

    return format;
  }

  subtract(amount, unit) {
    const unitsInMilliseconds = {
      milliseconds: 1,
      seconds: 1000,
      minutes: 60000,
      hours: 3600000,
      days: 86400000,
      months: 2592000000,
      years: 31536000000,
    };

    const milliseconds = amount * unitsInMilliseconds[unit];
    const newDate = new Date(this.date.getTime() - milliseconds);
    return new MyMoment(newDate);
  }

  add(amount, unit) {
    const unitsInMilliseconds = {
      milliseconds: 1,
      seconds: 1000,
      minutes: 60000,
      hours: 3600000,
      days: 86400000,
      months: 2592000000,
      years: 31536000000,
    };

    const milliseconds = amount * unitsInMilliseconds[unit];
    const newDate = new Date(this.date.getTime() + milliseconds);
    return new MyMoment(newDate);
  }

  startOf(unit) {
    const newDate = new Date(this.date.getTime());

    if (unit === 'year') {
      newDate.setMonth(0);
      newDate.setDate(1);
      newDate.setHours(0, 0, 0, 0);
    } else if (unit === 'month') {
      newDate.setDate(1);
      newDate.setHours(0, 0, 0, 0);
    } else if (unit === 'day') {
      newDate.setHours(0, 0, 0, 0);
    } else if (unit === 'hour') {
      newDate.setMinutes(0, 0, 0);
    } else if (unit === 'minute') {
      newDate.setSeconds(0, 0);
    } else if (unit === 'second') {
      newDate.setMilliseconds(0);
    }

    return new MyMoment(newDate);
  }

  endOf(unit) {
    const newDate = new Date(this.date.getTime());

    if (unit === 'year') {
      newDate.setFullYear(newDate.getFullYear() + 1);
      newDate.setMonth(0, 0);
      newDate.setDate(0);
      newDate.setHours(23, 59, 59, 999);
    } else if (unit === 'month') {
      newDate.setMonth(newDate.getMonth() + 1, 0);
      newDate.setHours(23, 59, 59, 999);
    } else if (unit === 'day') {
      newDate.setHours(23, 59, 59, 999);
    } else if (unit === 'hour') {
      newDate.setMinutes(59, 59, 999);
    } else if (unit === 'minute') {
      newDate.setSeconds(59, 999);
    } else if (unit === 'second') {
      newDate.setMilliseconds(999);
    }

    return new MyMoment(newDate);
  }

  toDate() {
    return this.date;
  }

  diff(moment, unit) {
    const diffMilliseconds = Math.abs(this.date - moment.toDate());

    const unitsInMilliseconds = {
      milliseconds: 1,
      seconds: 1000,
      minutes: 60000,
      hours: 3600000,
      days: 86400000,
      months: 2592000000,
      years: 31536000000,
    };

    return Math.round(diffMilliseconds / unitsInMilliseconds[unit]);
  }
}
