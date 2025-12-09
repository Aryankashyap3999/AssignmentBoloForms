import fs from 'fs';

export const isPdfFile = (filePath) => {
  return filePath.toLowerCase().endsWith('.pdf');
};

export const fileExists = (filePath) => {
  return fs.existsSync(filePath);
};

export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidBase64 = (str) => {
  try {
    return Buffer.from(str, 'base64').toString('base64') === str;
  } catch {
    return false;
  }
};

export const base64ToBuffer = (str) => {
  return Buffer.from(str, 'base64');
};

export const bufferToBase64 = (buf) => {
  return buf.toString('base64');
};
