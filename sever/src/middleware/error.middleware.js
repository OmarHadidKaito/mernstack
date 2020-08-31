import { NOT_FOUND, INTERNAL_SERVER_ERROR } from 'http-status'

function NOT_FOUND_404(req, res, next) {
    let err = new Error('not found')
    err.status = NOT_FOUND
    next(err)
}

function ERROR_SEVER(err, req, res, next) {
    const status = err.status || INTERNAL_SERVER_ERROR
    const error = err.message || `error processing`
    res.status(status).send({
        error
    })
}


export {
    NOT_FOUND_404,
    ERROR_SEVER
}