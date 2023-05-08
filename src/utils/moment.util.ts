namespace unitOfTime {
  export type Base =
    | 'year'
    | 'years'
    | 'y'
    | 'month'
    | 'months'
    | 'M'
    | 'week'
    | 'weeks'
    | 'w'
    | 'day'
    | 'days'
    | 'd'
    | 'hour'
    | 'hours'
    | 'h'
    | 'minute'
    | 'minutes'
    | 'm'
    | 'second'
    | 'seconds'
    | 's'
    | 'millisecond'
    | 'milliseconds'
    | 'ms';

  export type Quarter = 'quarter' | 'quarters' | 'Q';
  export type IsoWeek = 'isoWeek' | 'isoWeeks' | 'W';
  export type Date = 'date' | 'dates' | 'D';
  export type DurationConstructor = Base | Quarter;

  export type DurationAs = Base;

  export type StartOf = Base | Quarter | IsoWeek | Date | null;

  export type Diff = Base | Quarter;

  export type MomentConstructor = Base | Date;

  export type All =
    | Base
    | Quarter
    | IsoWeek
    | Date
    | 'weekYear'
    | 'weekYears'
    | 'gg'
    | 'isoWeekYear'
    | 'isoWeekYears'
    | 'GG'
    | 'dayOfYear'
    | 'dayOfYears'
    | 'DDD'
    | 'weekday'
    | 'weekdays'
    | 'e'
    | 'isoWeekday'
    | 'isoWeekdays'
    | 'E';
}

export class MyMoment {
  private date;
  constructor(date?) {
    this.date = date ? new Date(date) : new Date();
  }

  format(format: string) {
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

  subtract(amount: number, unit: unitOfTime.DurationConstructor) {
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

  add(amount: number, unit: unitOfTime.DurationConstructor) {
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

  startOf(unit: unitOfTime.StartOf) {
    const newDate = new Date(this.date.getTime());

    if (unit === 'year' || unit === 'years') {
      newDate.setMonth(0);
      newDate.setDate(1);
      newDate.setHours(0, 0, 0, 0);
    } else if (unit === 'month' || unit === 'months') {
      newDate.setDate(1);
      newDate.setHours(0, 0, 0, 0);
    } else if (unit === 'day' || unit === 'days') {
      newDate.setHours(0, 0, 0, 0);
    } else if (unit === 'hour' || unit === 'hours') {
      newDate.setMinutes(0, 0, 0);
    } else if (unit === 'minute' || unit === 'minutes') {
      newDate.setSeconds(0, 0);
    } else if (unit === 'second' || unit === 'seconds') {
      newDate.setMilliseconds(0);
    } else if (unit === 'isoWeek' || unit === 'isoWeeks') {
      const dayOfWeek = new Date(this.date.getTime()).getDay();
      const diff = newDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      newDate.setDate(diff);
      newDate.setHours(0, 0, 0, 0);
    }

    return new MyMoment(newDate);
  }

  endOf(unit: unitOfTime.StartOf) {
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

  diff(moment: MyMoment | Date, unit: unitOfTime.Diff) {
    const diffMilliseconds = Math.abs(
      this.date - (moment instanceof MyMoment ? moment.toDate() : moment),
    );

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
