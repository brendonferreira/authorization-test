

const jwt = require('jsonwebtoken')
const secrets = require('./secrets')

module.exports.handler = async (event, context) => {

    const Deny = generatePolicy('user', 'Deny', '*')
    const Allow = generatePolicy('user', 'Allow', '*')

    console.log( event.headers.Authorization )

    const [ undefined, token ] = event.headers.Authorization.split(' ')
    
    const contents = jwt.decode(token)
    
    if( !contents ) {
        return Deny
    }
    
    if( !secrets[contents.secret] ) {
        return Deny
    }
   
    try {
        jwt.verify( token, secrets[contents.secret] )

        return Allow
    } catch(e) {
        return Deny
    }
}

const generatePolicy = (principalId, effect, resource) => {
    const authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        const policyDocument = {};
        policyDocument.Version = '2012-10-17';
        policyDocument.Statement = [];
        const statementOne = {};
        statementOne.Action = 'execute-api:Invoke';
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
};