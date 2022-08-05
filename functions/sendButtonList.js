const axios = require("axios").default;

const sendButtonList = async (contentStepMessage, uriCall, uriKey, paramsToSend) => {
  
    let buttonsContent = contentStepMessage[2];
    let buttonsContentFormated = [];

    for(let b = 0; b < buttonsContent.length; b++){
        let itemButton = Object.entries(buttonsContent[b]);
        buttonsContentFormated.push({"id": itemButton[0][0], "title": itemButton[0][1].split('(-)')[0], "description": itemButton[0][1].split('(-)')[1]});
    }

    paramsToSend['recipient_type'] = 'individual';
    paramsToSend['type'] = 'interactive';
    paramsToSend['interactive'] = {};
    paramsToSend.interactive['type'] = 'list';
    paramsToSend.interactive['body'] = {};
    paramsToSend.interactive.body['text'] = contentStepMessage[0];

    paramsToSend.interactive['action'] = {};
    paramsToSend.interactive.action['button'] = contentStepMessage[1];
    paramsToSend.interactive.action['sections'] = [{}];
    paramsToSend.interactive.action.sections[0]['title'] = contentStepMessage[0].length <= 25 ? contentStepMessage[0] : contentStepMessage[0].substr(0, 21) + '...';
    paramsToSend.interactive.action.sections[0]['rows'] = buttonsContentFormated;

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

module.exports = sendButtonList