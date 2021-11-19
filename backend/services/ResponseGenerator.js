
module.exports = (error = false, message = '', data = {}) => {

    return {
        error,
        message,
        data,
    }
}
