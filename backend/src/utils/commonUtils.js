export const getCurrentDate = () => {
  return new Date();
};

export const formatFileName = (name) => {
  return name.trim().toLowerCase().replace(/\s+/g, '_');
};

export const addTimestampToFileName = (filename) => {
  const ts = Date.now();
  const ext = filename.split('.').pop();
  const base = filename.replace(`.${ext}`, '');
  return `${base}_${ts}.${ext}`;
};

export const getTimeDifference = (start, end) => {
  return Math.floor((new Date(end) - new Date(start)) / 1000);
};

