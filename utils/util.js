exports.sendResponse = function (req, res, httpstatus, status, data, message) {
  res.status(httpstatus).json({ status: status, message: message, data: data });
};
exports.sendErrorResponse = function (
  req,
  res,
  httpstatus,
  status,
  errMessage
) {
  res.status(httpstatus).json({ status: status, message: errMessage });
};
