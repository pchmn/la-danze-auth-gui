
export enum StorageKey {
  AccessToken = 'accessToken'
}

export function setStorage(key: string, obj: any) {
  localStorage.setItem(key, JSON.stringify(obj));
}

export function getStorage(key: string): any {
  const item = localStorage.getItem(key);
  return !item || item === 'undefined' ? null : JSON.parse(item);
}

export function removeStorage(key: string) {
  localStorage.removeItem(key);
}