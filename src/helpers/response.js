// Helpers for handling responses

/**
 * Handles error responses.
 * @param {Object} res - Express response object.
 * @param {Error} error - The error object to handle.
 * @param {number} [status=500] - HTTP status code for the error response.
 */
const handleError = (res, error, status = 500) => {
    if (!res || !error) {
        console.error('Invalid arguments passed to handleError.');
        return;
    }

    res.status(status).json({
        success: false,
        error: error.message || 'An unexpected error occurred.',
    });
};

/**
 * Handles success responses.
 * @param {Object} res - Express response object.
 * @param {any} [data=null] - The data to return in the response.
 * @param {string} [message='Request successful'] - The success message.
 * @param {number} [status=200] - HTTP status code for the success response.
 */
const handleSuccess = (res, data = null, message = 'Request successful', status = 200) => {
    if (!res) {
        console.error('Invalid response object passed to handleSuccess.');
        return;
    }

    res.status(status).json({
        success: true,
        message,
        data,
    });
};

module.exports = {
    handleError,
    handleSuccess,
};
