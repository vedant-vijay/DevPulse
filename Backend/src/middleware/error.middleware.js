export async function errorHandler(err, req, res, next) {
  console.error(err.stack); 
  
  const statusCode = err.statusCode || 500; 
  res.status(statusCode);

  res.json({
    status: 'error',
    message: err.message || 'Something went wrong!',
  });

};