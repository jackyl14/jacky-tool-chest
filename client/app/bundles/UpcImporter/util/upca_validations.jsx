export function checkStringFormat(string) {
  var errorString = null;
  var noSpacesString = _.replace(string, /\s+/g, "");
  if(!_.isEmpty(noSpacesString) && _.toInteger(noSpacesString) === 0) {
    errorString = "Make sure all UPC-As are numbers";
  }
  return errorString;
}

export function checkStringSize(string) {
    var errorString = null;
    var stringLength = string.length;
    if(stringLength > 12) {
      errorString = "Failed digit test: expecting no more than 12 digits";
    } else if(stringLength < 12) {
      errorString = "Failed digit test: expecting 12 digits including leading zeros";
    }
    return errorString;
}

export function checkUPCADigitCalc(string) {
  var errorString = null;
  var stringLength = string.length;

  if(stringLength === 12) {
    var sumOddIndices = _.toInteger(string[0]) + _.toInteger(string[2]) +
                          _.toInteger(string[4]) + _.toInteger(string[6]) +
                          _.toInteger(string[8]) + _.toInteger(string[10]);
    var sumEvenIndices = _.toInteger(string[1]) + _.toInteger(string[3]) +
                          _.toInteger(string[5]) + _.toInteger(string[7]) +
                          _.toInteger(string[9]);
    var intermediateValue = (sumOddIndices*3 + sumEvenIndices) % 10;
    var lastDigit = intermediateValue === 0 ? 0 : 10 - intermediateValue

    if(lastDigit !== _.toInteger(string[stringLength-1])) {
      errorString = `Failed digit calculation: expecting last digit to be ${lastDigit}`
    }
  }
  return errorString;
}

export function validateUPCA(array) {
  // key will be index of array
  // value will be array of error messages
  var errorBank = {};
  var errors;

  _(array).forEach((element, index) => {
    errors = []
    errors.push(checkStringSize(element));
    errors.push(checkUPCADigitCalc(element));
    errors = _.compact(errors);
    
    if(!_.isEmpty(errors)) {
      errorBank[index] = errors;
    }
  });

  return errorBank;
}
