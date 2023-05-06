import * as shortId from 'shortid';
import moment from 'moment';

export function generateOrderCode() {
  const date = new Date();
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  shortId.characters(
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@',
  );
  const code = shortId.generate().replace(/[$@]/g, '');
  return `${year}${month}${day}${code}`;
}

export function generateCode() {
  shortId.characters(
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@',
  );
  const code = shortId.generate().replace(/[$@]/g, '');
  return code;
}

export function generateStaffCode() {
  shortId.characters(
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@',
  );
  const randomNum = Math.floor(Math.random() * 1000000).toString();
  const code = `NV${shortId.generate().replace(/[$@]/g, '')}${randomNum}`;
  return code;
}

export function generateCustomerCode() {
  shortId.characters(
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@',
  );
  const randomNum = Math.floor(Math.random() * 1000000).toString();
  const currentDate = moment().format('YYYYMMDD');
  const code = `KH${currentDate}${shortId
    .generate()
    .replace(/[$@]/g, '')}${randomNum}`;
  return code;
}
