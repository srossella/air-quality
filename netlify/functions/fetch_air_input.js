// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
// yarn netlify dev -> to run 
const axios = require('axios');

const handler = async (event) => {
  const {input}=event.queryStringParameters
  const API_SECRET =process.env.API_SECRET
  //const url= `https://api.waqi.info/feed/${input}/?token=${API_SECRET}`

  const url= `https://api.waqi.info/feed/${input}/?token=${API_SECRET}`
  try{
    const {data } = await axios.get(url)
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error){
    const {status}= error.response
    return {
      statusCode: status,
      body: JSON.stringify({status})
    }
  }

}

module.exports = { handler }
