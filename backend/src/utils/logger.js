import winston from 'winston'
import { env } from "../config/config.js"

const customLevelOpt = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  colors: {
    fatal: 'red',
    error: 'cyan',
    warn: 'yellow',
    info: 'blue',
    http: 'black',
    debug: 'green'
  }
}

// Filters
const warnFilter = winston.format((info, opts) => {
  return info.level === 'warn' ? info : false
})

const debugHttpInfoFilter = winston.format((info, opts) => {
  if (info.level === 'debug' || info.level === 'http' || info.level === 'info') {
    return info  
  } else {
    return false
  }  
})

const devFilter = winston.format((info, opts) => {
  if (env.environment === 'development') {
    return info  
  } else {
    return false
  }  
})

const prodFilter = winston.format((info, opts) => {
  if (env.environment === 'production') {
    return info  
  } else {
    return false 
  }  
})

// Create the logger with the transports we need
const logger = winston.createLogger({
  levels: customLevelOpt.levels, // Defines that the logger levels are the previous ones
  // Defines the transports that my logger will get
  transports: [
    // Only if we are in prod enviroment
    new winston.transports.Console({ 
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors }),
        winston.format.simple(),
        prodFilter()
      )
    }),
    // Only save loggers of Debug - Http - Info
    new winston.transports.File({ 
      level: 'info',
      filename: './logs/info.log',
      format: winston.format.combine(
        winston.format.simple(),
        debugHttpInfoFilter()
      )      
    }),   
    // Only save warning loggers
    new winston.transports.File({ 
      level: 'warn',
      filename: './logs/warning.log',
      format: winston.format.combine(
        winston.format.simple(),
        warnFilter()
      )      
    }),    
    new winston.transports.File({ 
      level: "fatal",
      filename: './logs/errors.log',
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors }),
        winston.format.simple()
      )
    }),
    // Only if we are in prod enviroment
    new winston.transports.File({ 
      level: "error",
      filename: './logs/errors.log',
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors }),
        winston.format.simple(),
        prodFilter()
      )
    }),
    // Only if we are in dev enviroment
    new winston.transports.Console({ 
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors }),
        winston.format.simple(),
        devFilter()
      )
    })
  ]
})

export const addLogger = (req, res, next) => {
  req.logger = logger // Being able to use the previously defined logger
  req.logger.info(`${req.method} in ${req.url} - ${new Date().toLocaleTimeString}`)
  next()
}