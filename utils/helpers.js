export function getLastElement(str, delimiter = " ") {
  const arr = str.split(delimiter);
  return arr.pop();
}

// Примеры использования:
console.log(getLastElement("Hello world")); // Output: "world"
console.log(getLastElement("apple,banana,orange", ",")); // Output: "orange"
