interface MyMoment {
  isValid(): boolean;
  year(): number | null;
  month(): number | null;
  date(): number | null;
  hour(): number | null;
  minute(): number | null;
  second(): number | null;
  millisecond(): number | null;
  format(formatString: string): string | null;
  subtract(amount: number, unit: string): MyMoment | null;
  add(amount: number, unit: string): MyMoment | null;
  startOf(unit: string): MyMoment | null;
  toDate(): Date | null;
}

export function MyMoment(date?: string | Date): MyMoment {
  const validDate = date ? new Date(date) : new Date();
  const isValid = !isNaN(validDate.getTime());

  return {
    isValid: () => isValid,
    year: () => isValid ? validDate.getFullYear() : null,
    month: () => isValid ? validDate.getMonth() : null,
    date: () => isValid ? validDate.getDate() : null,
    hour: () => isValid ? validDate.getHours() : null,
    minute: () => isValid ? validDate.getMinutes() : null,
    second: () => isValid ? validDate.getSeconds() : null,
    millisecond: () => isValid ? validDate.getMilliseconds() : null,
    format: (formatString) => isValid ? format(validDate, formatString) : null,
    subtract: (amount, unit) => isValid ? subtract(validDate, amount, unit) : null,
    add: (amount, unit) => isValid ? add(validDate, amount, unit) : null,
    startOf: (unit) => isValid ? startOf(validDate, unit) : null,
    toDate: () => isValid ? toDate(validDate) : null
  };
}

function subtract(date: Date, amount: number, unit: string): MyMoment {
  return add(date, -amount, unit)
}

function add(date: Date, amount: number, unit: string): MyMoment {
  const units: {[key: string]: string} = {
    year: 'FullYear',
    month: 'Month',
    week: 'Date',
    day: 'Date',
    hour: 'Hours',
    minute: 'Minutes',
    second: 'Seconds',
    millisecond: 'Milliseconds'
  };

  const newDate = new Date(date.getTime());
  const unitValue = units[unit] || 'Milliseconds';

  if (units[unit] === 'Date') {
    newDate.setDate(date.getDate() + amount);
  } else if (typeof date[`get${units[unit]}`] === 'function') {
    newDate[`set${units[unit]}`](date[`get${units[unit]}`]() + amount);
  } else {
    return MyMoment(null);
  }

  return MyMoment(newDate);
}

function format(date: Date, formatString: string): string {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');
  const millisecond = date.getMilliseconds().toString().padStart(3, '0');

  const formatTokens: {[key: string]: string} = {
    YYYY: year,
    MM: month,
    DD: day,
    HH: hour,
    mm: minute,
    ss: second,
    SSS: millisecond
  };

  return formatString.replace(/YYYY|MM|DD|HH|mm|ss|SSS/g, match => formatTokens[match]);
}

function startOf(date: Date, unit: string): MyMoment {
  const units: {[key: string]: number} = {
    year: 0,
    month: 1,
    week: 0,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  };

  const newDate = new Date(date.getTime());

  switch (unit) {
    case 'year':
      newDate.setMonth(0);
    case 'month':
      newDate.setDate(1);
    case 'week':
      newDate.setDate(date.getDate() - date.getDay());
    case 'day':
      newDate.setHours(0, 0, 0, 0);
    case 'hour':
      newDate.setMinutes(0, 0, 0);
    case 'minute':
      newDate.setSeconds(0, 0);
    case 'second':
      newDate.setMilliseconds(0);
  }

  return MyMoment(newDate);
}

function toDate(date: Date): Date {
  return new Date(date.getTime());
}