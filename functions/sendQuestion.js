const axios = require("axios").default;

const sendQuestion = async (contentStepMessage, uriCall, uriKey, paramsToSend) => {
        
    paramsToSend['recipient_type'] = 'individual';
    paramsToSend['type'] = 'text';
    paramsToSend['text'] = {};
    paramsToSend.text['body'] = contentStepMessage[0];

    let options = {
        method: 'POST',
        headers:{
            "Authorization": 'Bearer ' + uriKey
        },
        url: uriCall,
        data: paramsToSend,
        json:true
    } 
  
    let urlResponse = await axios(options).catch(err => {
      console.log(err);
    });

}

module.exports = sendQuestion