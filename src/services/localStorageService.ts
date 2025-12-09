export function saveToLocalStorage<T>(key: string, value: T) {
  //convert to string
  const jsonValue = JSON.stringify(value);

  //save to local storage
  localStorage.setItem(key, jsonValue);
}

export function getItemFromLocalStorage<T>(key: string): T | null {
  //get item
  const jsonValue = localStorage.getItem(key);
  if (jsonValue === null) return null;

  //try to parse
  try {
    const value = JSON.parse(jsonValue);
    return value as T;
  } catch {
    return null;
  }
}

export function removeFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}

export function clearLocalStorage() {
  localStorage.clear();
}
