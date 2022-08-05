const axios = require("axios").default;

const sendAudio = async (contentStepMessage, uriCall, uriKey, paramsToSend) => {
        
    paramsToSend['recipient_type'] = 'individual';
    paramsToSend['type'] = 'audio';
    paramsToSend['audio'] = {};
    paramsToSend.audio['link'] = contentStepMessage[0];

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

module.exports = sendAudio