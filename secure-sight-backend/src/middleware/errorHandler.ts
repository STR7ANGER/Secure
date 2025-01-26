import { Request, Response, NextFunction } from 'express'
import logger from '../utils/logger'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err)
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
  })
}

export default errorHandler