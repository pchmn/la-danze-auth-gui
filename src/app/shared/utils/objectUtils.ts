
export const objectUtils = {
  isObject: (obj: any): boolean => isObject(obj),
  isArray: (obj: any): boolean => isArray(obj)
};

export function isObject(obj: any): boolean {
  const call = Object.prototype.toString.call(obj);
  return call === '[object Object]' || call === '[object Array]';
}

export function isArray(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Array]';
}
