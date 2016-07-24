import _ from 'lodash';
import moment from 'moment';

export function formatDate(dateString) {
  var date = moment(dateString);
  return date.format("M/DD/YYYY");
};

export function formatUSCurrency(number) {
  var numberArray = number.toString().split(".");

  if(numberArray.length === 1) {
    return `$${number}`;
  } else if(numberArray.length === 2) {
    return numberArray[1].length === 1 ? `$${number}0` : `$${_.round(number, 2)}`;
  }
};

export function formatCCLastFourDigits(lastFour) {
  return `**** ${lastFour}`
};
