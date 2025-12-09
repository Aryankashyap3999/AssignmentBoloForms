export const auditLog = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (data) {
    const audit = {
      method: req.method,
      endpoint: req.originalUrl,
      statusCode: res.statusCode,
      timestamp: new Date(),
      ip: req.ip || req.connection.remoteAddress
    };

    console.log('[AUDIT]', JSON.stringify(audit));
    res.send = originalSend;
    return res.send(data);
  };

  next();
};
