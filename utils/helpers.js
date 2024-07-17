export function getLastElement(str, delimiter = " ") {
  const arr = str.split(delimiter);
  return arr.pop();
}

export function removeStringFromArray(arr, str) {
  return arr.filter((item) => item !== str);
}
