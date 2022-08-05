const axios = require("axios").default;

const sendDocument = async (contentStepMessage, uriCall, uriKey, paramsToSend) => {
        
    paramsToSend['recipient_type'] = 'individual';
    paramsToSend['type'] = 'document';
    paramsToSend['document'] = {};
    paramsToSend.document['link'] = contentStepMessage[0];
    paramsToSend.document['filename'] = contentStepMessage[1];

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

module.exports = sendDocument