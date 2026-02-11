const CustomAPIError = require('./custom-error')
const {statusCodes} = require('http-status-codes')

class badRequestError extends CustomAPIError {
  constructor(message) {
    super(message)
    this.statusCode = statusCodes.BAD_REQUEST
  }
}

module.exports = badRequestError
