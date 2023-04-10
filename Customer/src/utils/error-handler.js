const {createLogger, transport, transports} = require('winston');
const {AppError} = require('./app-errors')

const LogErrors = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({filename: 'app_error.log'})
    ]
});

class ErrorLogger {
    constructor(){}
    async LogError(err){
        console.log('==================== Start Error Logger ===============');
        LogErrors.log({
            private: true,
            level: 'error',
            message: `${new Date()}-${JSON.stringify(err)}`
          });
        console.log('==================== End Error Logger ===============');
        // log error with Logger plugins
      
        return false;
    }

    isTrustError(error){
        if(error instanceof AppError){
            return error.isOperational;
        } else {
            return false;
        }
    }
}