const DeveloperMode = true;
const devLogger = (title = '', log = '') => {
  if (__DEV__ && DeveloperMode) {
    console.log(title + (log ? ' :' : ''), log ? JSON.stringify(log) : '');
  }
};
const getTextSizeStyle = (fontSize: number) => ({
  fontSize,
  lineHeight: fontSize * 1.618,
});
const emailIsValid = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const getCustomData = date => {
  const tDate = new Date(date);
  const day = tDate.getDate();
  const month = tDate.getMonth() + 1;
  const year = tDate.getFullYear();
  return (
    (month < 10 ? '0' + month : month) +
    '/' +
    (day < 10 ? '0' + day : day) +
    '/' +
    year
  );
};
const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const formatAMPM = dateX => {
  let hours = dateX.getHours();
  let minutes = dateX.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
};
const secondsToHms = d => {
  d = Number(d);
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  let s = Math.floor((d % 3600) % 60);
  let h1 = h;
  if (h.toString().length === 1) {
    h = '0' + h.toString();
  }
  if (m.toString().length === 1) {
    m = '0' + m.toString();
  }
  if (s.toString().length === 1) {
    s = '0' + s.toString();
  }
  return h1 === 0 ? m + ':' + s : h + ':' + m + ':' + s;
};
const getCurrentTimeAndDate = () => {
  const newDate = new Date();
  const date =
    newDate.getFullYear() +
    '-' +
    (newDate.getMonth() + 1) +
    '-' +
    newDate.getDate() +
    ' ' +
    ('0' + newDate.getHours()).slice(-2) +
    ':' +
    ('0' + newDate.getMinutes()).slice(-2) +
    ':' +
    ('0' + newDate.getSeconds()).slice(-2);
  devLogger('Created_at', date);
  return date;
};
const getDate_time = DATEO => {
  const dx = new Date(DATEO);

  return (
    MONTH_NAMES[dx.getMonth()] +
    ' ' +
    dx.getDate() +
    ', ' +
    dx.getFullYear() +
    ' ' +
    formatAMPM(dx)
  );
};
const getMonth = (monthId: number) => {
  let mon = '';
  switch (monthId) {
    case 1:
      mon = 'Jan';
      break;
    case 2:
      mon = 'Feb';
      break;
    case 3:
      mon = 'Mar';
      break;
    case 4:
      mon = 'Apr';
      break;
    case 5:
      mon = 'May';
      break;
    case 6:
      mon = 'Jun';
      break;
    case 7:
      mon = 'Jul';
      break;
    case 8:
      mon = 'Aug';
      break;
    case 9:
      mon = 'Sep';
      break;
    case 10:
      mon = 'Oct';
      break;
    case 11:
      mon = 'Nov';
      break;
    case 12:
      mon = 'Dec';
      break;
    default:
      return;
  }
  return mon;
};
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const monthShortNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const isItOpenNow = (time: string) => {
  const [sT, eT] = time.split(' - ');
  const current = new Date().getHours();
  const res = {
    Start: convertTto24(sT),
    End: convertTto24(eT),
  };
  console.log('NN', {...res, current});
  const isIt: boolean =
    res.End > res.Start
      ? res.Start <= current && res.End > current
      : res.Start <= current && res.End > current;
  return [isIt, sT, eT];
};
const weekDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const getPriceFormat = (price: string | number) => {
  const priceX = parseInt(price);
  return priceX.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};
const objectIsEmpty = (obj: object): Boolean => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};
const getFormattedDate = (dateToBeFormated: string, short: boolean = false) => {
  const [day, month, year] = dateToBeFormated.split('-');
  const mmonth = parseInt(month) - 1;
  const thisDay = new Date(parseInt(year), mmonth, parseInt(day));
  return short
    ? `${day} ${monthShortNames[mmonth]}, ${parseInt(year) % 100}`
    : `${weekDays[thisDay.getDay()]}, ${day} ${monthNames[mmonth]}, ${year}`;
};
const convertTto24 = (time12h: string) => {
  let hours = '';
  let modifier = '';
  time12h
    .split('')
    .forEach(character =>
      isNaN(character)
        ? (modifier = modifier + '' + character)
        : (hours = hours + '' + character),
    );
  if (hours === '12') {
    hours = 0;
  }
  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  return parseInt(hours, 10);
};
export {
  isItOpenNow,
  objectIsEmpty,
  getCustomData,
  getMonth,
  getTextSizeStyle,
  devLogger,
  getPriceFormat,
  getFormattedDate,
};
