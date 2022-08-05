const axios = require("axios").default;

const getBotContentApi = async (botName) => {
  
  let filtro = '[{"key": "bot_name_text", "constraint_type": "equals", "value": "' + botName + '"}]'; 
  let config = {
    method: 'get',
    url: encodeURI('https://dash.zapbrand.com.br/version-test/api/1.1/obj/bots_js?constraints=' + filtro),
    headers: { 
      'Content-type': 'application/json'
    },
    responseType: 'json',
  };

  let urlResponse = await axios(config).catch(err => {
    console.log(err);
  });

  return urlResponse.data;
  
}

module.exports = getBotContentApi