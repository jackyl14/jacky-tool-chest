export function checkNumbersOnly(string) {
  var errorString = null;
  if(!_.isEmpty(string) && _.toInteger(string) === 0) {
    errorString = "Make sure your input has numbers only";
  }
  return errorString;
}
