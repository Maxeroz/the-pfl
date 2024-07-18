export function getLastElement(str, delimiter = " ") {
  const arr = str.split(delimiter);
  return arr.pop();
}

export function removeStringFromArray(arr, str) {
  return arr.filter((item) => item !== str);
}

export function getDifference(num1, num2) {
  return num1 - num2;
}

export function removeObjectById(array, idToRemove) {
  return array.filter((obj) => obj.id !== idToRemove);
}
