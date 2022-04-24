const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('-------')
  next()
}

function tokenExtractor(req, res, next) {
  let authorization = req.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

function errorHandler(err, req, res, next) {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' })
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired' })
  }
  logger.error(err.message)
  next(err)
}

function unknownEndpoint(req, res) {
  return res.status(404).end()
}

module.exports = {
  requestLogger,
  tokenExtractor,
  errorHandler,
  unknownEndpoint,
}
