export const errorHandler = (err, req, res, next) => {
    const error = new Error();
    error.statusCode= statusCode || 500;
    error.message = message || 'Internal Server Error';
    return error;
    
}