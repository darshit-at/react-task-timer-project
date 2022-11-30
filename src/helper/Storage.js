export const setItem = (key, Value) => {
  if (typeof Value === "object") {
    localStorage.setItem(key, JSON.stringify(Value));
    return;
  }
  localStorage.setItem(key, Value);
};

export const getItem = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
};

export const clearStorage = () => {
  localStorage.clear();
};

export const removeKey = (key) => {
  localStorage.removeItem(key);
};
