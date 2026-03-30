import { logger } from "../utils/logger.js";
export async function errorHandler(err, req, res, next) {
  logger.error(err.stack); 
  
  const statusCode = err.statusCode || 500; 
  res.status(statusCode);

  res.json({
    status: 'error',
    message: err.message || 'Something went wrong!',
  });

};