function CreateJSONError(code, msg) {
    error = {
        code: code,
        msg: msg,
    }

    return error
}

module.exports = CreateJSONError