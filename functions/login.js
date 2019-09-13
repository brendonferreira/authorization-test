const secrets = require('./secrets')
const jwt = require('jsonwebtoken')

module.exports.handler = async (event, context) => {

    const body = JSON.parse(event.body)

    if( !secrets[body.secret] ) {
        return {
            statusCode: 401,
            body: JSON.stringify({message: "Not authored"})
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Success",
    
            // Coisas de poc dnv, enviar secret no payload da jwt
            token: jwt.sign( { secret: body.secret }, secrets[body.secret] )
        })
    }
}