
module.exports.handler = async (event, context) => {

    return {
        statusCode: 200,
        body: JSON.stringify({message: "HELLO WORLD I'M SECRET"})
    }
}