const axios = require("axios").default;

const sendButtonReply = async (contentStepMessage, uriCall, uriKey, paramsToSend) => {
  
    let buttonsContent = contentStepMessage[1];
    let buttonsContentFormated = [];

    for(let b = 0; b < buttonsContent.length; b++){
        let itemButton = Object.entries(buttonsContent[b]);

        buttonsContentFormated.push({"type": itemButton[0][0], "reply": {"id": itemButton[0][1].split('(-)')[0], "title": itemButton[0][1].split('(-)')[1]}});

    }

    paramsToSend['recipient_type'] = 'individual';
    paramsToSend['type'] = 'interactive';
    paramsToSend['interactive'] = {};
    paramsToSend.interactive['type'] = 'button';
    paramsToSend.interactive['body'] = {};
    paramsToSend.interactive.body['text'] = contentStepMessage[0];

    paramsToSend.interactive['action'] = {};
    paramsToSend.interactive.action['buttons'] = buttonsContentFormated;

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

module.exports = sendButtonReply