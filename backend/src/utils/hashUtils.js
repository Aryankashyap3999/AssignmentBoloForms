import crypto from 'crypto';

export const hashData = (data) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

export const hashBuffer = (buffer) => {
  return crypto.createHash('sha256').update(buffer).digest('hex');
};
