const axios = require('axios')

class ApiClient {

    constructor(url) {
        this.baseUrl = url
    }

    login({secret}) {
        return axios.post(`${this.baseUrl}/login`, {secret}).then(i => i.data)
    }
    
    // coisas de poc hahaha
    getPrivateContent({token}) {
        return axios.get(`${this.baseUrl}/private-route`, {headers: { Authorization: `Bearer ${token}` }}).then(i => i.data)
    }

}

;(async () => {

    const client = new ApiClient('http://localhost:3000')

    // Should return not authorized response
    console.log('\n\nShould return not authorized response:')
    try {
        const privateContent = await client.getPrivateContent({})
    } catch(e) {
        console.error(e.response.data)
    }

    console.log('\n\nRequest to return token:')
    console.log("Sending secret:", "55edeecb-dabe-450f-81f3-6055cda2939f")
    const { token } = await client.login({ "secret": "55edeecb-dabe-450f-81f3-6055cda2939f" })

    console.log("Returned token:", token)

    console.log('\n\n Retrying the first request with token:')
    const privateContent = await client.getPrivateContent({token})
    console.log(privateContent)
})()