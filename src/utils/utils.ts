export function convertStringToBytes(str) {
  if (typeof str !== 'string') {
    throw new Error('str expects a string');
  }
  var myBuffer = [];
  var buffer = Buffer.from(str, 'utf8');
  for (var i = 0; i < buffer.length; i++) {
    //@ts-ignore
    myBuffer.push(buffer[i]);
  }
  return myBuffer;
}

export function sortObject(obj) {
  if (obj === null) return null;
  if (typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(sortObject);
  const sortedKeys = Object.keys(obj).sort();
  const result = {};
  sortedKeys.forEach(key => {
    result[key] = sortObject(obj[key]);
  });
  return result;
}

export function randomDeepColor() {
  const r = Math.floor(123 - Math.random() * 123);
  const g = Math.floor(123 - Math.random() * 123);
  const b = Math.floor(123 - Math.random() * 123);
  return 'rgba(' + r + ',' + g + ',' + b + ',0.8)';
}

export function getRankColor(num) {
  return ['red', 'green', 'yellow'][num];
}
