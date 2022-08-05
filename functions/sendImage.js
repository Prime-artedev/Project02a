const axios = require("axios").default;

const sendImage = async (contentStepMessage, uriCall, uriKey, paramsToSend) => {
        
    paramsToSend['recipient_type'] = 'individual';
    paramsToSend['type'] = 'image';
    paramsToSend['image'] = {};
    paramsToSend.image['link'] = encodeURI(contentStepMessage[0]);
    paramsToSend.image['caption'] = contentStepMessage[1];

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

module.exports = sendImage