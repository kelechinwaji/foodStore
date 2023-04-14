const {createLogger, transport, transports} = require('winston');
const {AppError} = require('./app-errors')

const LogErrors = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({filename: 'app_error.log'})
    ]
});