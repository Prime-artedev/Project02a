const axios = require("axios").default;

const sendVideo = async (contentStepMessage, uriCall, uriKey, paramsToSend) => {
        
    paramsToSend['recipient_type'] = 'individual';
    paramsToSend['type'] = 'video';
    paramsToSend['video'] = {};
    paramsToSend.video['link'] = contentStepMessage[0];
    paramsToSend.video['caption'] = contentStepMessage[1];

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

module.exports = sendVideo