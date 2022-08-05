const trocarVariaveisDoTexto = require('../functions/trocarVariaveis.js');
const validateVariable = require('../functions/validateVariable.js');
const updateLastMessage = require('../repository/updateLastMessage.js');
const updateNextStepUser = require('../repository/updateNextStepUser.js');
const updateVariablesChat = require('../repository/updateVariablesChat.js');

const sendText = require('../functions/sendText.js');
const sendImage = require('../functions/sendImage.js');
const sendVideo = require('../functions/sendVideo.js');
const sendAudio = require('../functions/sendAudio.js');
const sendDocument = require('../functions/sendDocument.js');
const sendTextInvalidData = require('../functions/sendTextInvalidData.js');
const sendQuestion = require('../functions/sendQuestion.js');
const sendButtonReply = require('../functions/sendButtonReply.js');
const sendButtonList = require('../functions/sendButtonList.js');

const uploadCloudinaryImage = require('../functions/uploadCloudinaryImage.js');
const uploadCloudinaryVideo = require('../functions/uploadCloudinaryVideo.js');
const uploadGoogle = require('../functions/uploadGoogle.js');
const goToRule = require('../functions/goToRule.js');

const readIntentions = async (data) => {
    
    let numeroBot = data.from;
    let token = 'EAAPyG65TovABAJZCHFVgmC4BTNl5aZAXuLPe7sxxG9y2Ka9zCci6WWKo1DiwEXFb75qYjUZBZAEqpgCPzXEnLRwrImN48rCkyMEBx9yl46wxii2JTZCZAJUTJEzt0xKSNozd8ZCwOsSPcX1ubhOHZA2wQoX5P2jwcrrgFwUWXURBdqdgqABmtu70';
    let apiUrl = 'https://graph.facebook.com/v13.0/' + numeroBot + '/messages?access_token=' + token;
  
    let variablesChat = data.variables;

    for(let botSteps = data.positionInicial; botSteps < data.intentionStepsCount; botSteps++){

        let contentIntention = Object.entries(data.intention[0].contents[botSteps][0]);

        let contentStep = contentIntention[0][0];
        let contentStepMessage = contentIntention[0][1];

        if(contentStepMessage[contentStepMessage.length - 1] != 'none'){
            let conditional = contentStepMessage[contentStepMessage.length - 1].split(':');
            let valueConditional = trocarVariaveisDoTexto(conditional[0], variablesChat);
            let conditionalTrueFalse;
            let variablesChatHasValue = Object.entries(variablesChat);

            if(conditional[1] == 'equals'){
                conditionalTrueFalse = (valueConditional == conditional[2]) ? true : false;
            }else if(conditional[1] == 'not equals'){
                conditionalTrueFalse = (valueConditional != conditional[2]) ? true : false;    
            }else if(conditional[1] == 'hasValue' && conditional[2] == 'true'){
                conditionalTrueFalse = variablesChatHasValue.filter(item => item.includes(valueConditional)).length != 0 ? true : false; 
            }else if(conditional[1] == 'hasValue' && conditional[2] == 'false'){
                conditionalTrueFalse = variablesChatHasValue.filter(item => item.includes(valueConditional)).length == 0 ? true : false;   
            }

            if(!conditionalTrueFalse){
               continue;
            }
        }

        contentStepMessage[0] = trocarVariaveisDoTexto(contentStepMessage[0], variablesChat);


        let paramsToSend = {
            "messaging_product": "whatsapp",
            "preview_url": false,
            "to": data.to
        }

        let options;
        let sentRequest;

        switch (contentStep) { 
            case 'goToRule':
                let dataGoToRule = goToRule(contentStepMessage[0], data.to, data.from);
                updateNextStepUser(data.intention[0].nextStep, data.to, data.from);
                updateLastMessage('Usuário enviado para intenção ' + contentStepMessage[0], data.to, data.from);
                botSteps = data.intentionStepsCount + 1;
                break;

            case 'variableSave':
                let validate = validateVariable(data.messageUser, contentStepMessage[1], data.typeMessage);

                if(validate == 'not valid'){
                   await sendTextInvalidData(contentStepMessage[1][1], apiUrl, token, paramsToSend);
                   updateNextStepUser(data.intention[0].id, data.to, data.from);
                   botSteps = data.intentionStepsCount + 1;
                   break;
                }
            
                variablesChat[contentStepMessage[0]] = data.messageUser;
                updateVariablesChat(variablesChat, data.to, data.from);
                updateLastMessage('Variável ' + contentStepMessage[0] + ' salva com sucesso!', data.to, data.from);
                break;

            case 'variableSaveValue':

                variablesChat[contentStepMessage[0]] = contentStepMessage[1];
                updateVariablesChat(variablesChat, data.to, data.from);
                updateLastMessage('Variável ' + contentStepMessage[0] + ' salva com sucesso!', data.to, data.from);
                break;

            case 'variableSaveValueCount':

                if(variablesChat[contentStepMessage[0]] == undefined){
                    variablesChat[contentStepMessage[0]] = String(1);
                    updateVariablesChat(variablesChat, data.to, data.from);
                }else{
                  variablesChat[contentStepMessage[0]] = Number(variablesChat[contentStepMessage[0]]) + 1;
                  updateVariablesChat(variablesChat, data.to, data.from);
                }

                updateLastMessage('Variável ' + contentStepMessage[0] + ' salva com sucesso!', data.to, data.from);
                break;

            case 'text':
                await sendText(contentStepMessage, apiUrl, token, paramsToSend);
                updateLastMessage(contentStepMessage[0], data.to, data.from);
                updateNextStepUser(data.intention[0].nextStep, data.to, data.from);
                break;
            
            case 'image':
                await sendImage(contentStepMessage, apiUrl, token, paramsToSend);
                updateLastMessage(contentStepMessage[0], data.to, data.from);
                updateNextStepUser(data.intention[0].nextStep, data.to, data.from);
                break;
            
            case 'video':
                await sendVideo(contentStepMessage, apiUrl, token, paramsToSend);
                updateLastMessage(contentStepMessage[0], data.to, data.from);
                updateNextStepUser(data.intention[0].nextStep, data.to, data.from);
                break;
            
            case 'audio':
                await sendAudio(contentStepMessage, apiUrl, token, paramsToSend);
                updateLastMessage(contentStepMessage[0], data.to, data.from);
                updateNextStepUser(data.intention[0].nextStep, data.to, data.from);
                break;

            case 'document':
                await sendDocument(contentStepMessage, apiUrl, token, paramsToSend);
                updateLastMessage(contentStepMessage[0], data.to, data.from);
                updateNextStepUser(data.intention[0].nextStep, data.to, data.from);
                break;

            case 'question':

                await sendQuestion(contentStepMessage, apiUrl, token, paramsToSend);

                if(botSteps < data.intentionStepsCount){
                    updateNextStepUser(data.intention[0].id, data.to, data.from);
                    botSteps = data.intentionStepsCount + 1;
                }
                
                updateLastMessage(contentStepMessage[0], data.to, data.from);
                break;

            case 'buttonReply':
                await sendButtonReply(contentStepMessage, apiUrl, token, paramsToSend);
                updateNextStepUser(data.intention[0].nextStep, data.to, data.from);
                updateLastMessage(contentStepMessage[0], data.to, data.from);
                break

            case 'buttonReplyQuestion':
                await sendButtonReply(contentStepMessage, apiUrl, token, paramsToSend);

                if(botSteps < data.intentionStepsCount){
                    updateNextStepUser(data.intention[0].id, data.to, data.from);
                    botSteps = data.intentionStepsCount + 1;
                }
            
                updateLastMessage(contentStepMessage[0], data.to, data.from);
                break

            case 'buttonList':
                await sendButtonList(contentStepMessage, apiUrl, token, paramsToSend);
                updateNextStepUser(data.intention[0].nextStep, data.to, data.from);
                updateLastMessage(contentStepMessage[0], data.to, data.from);
                break

            case 'buttonListQuestion':
                await sendButtonList(contentStepMessage, apiUrl, token, paramsToSend);

                if(botSteps < data.intentionStepsCount){
                    updateNextStepUser(data.intention[0].id, data.to, data.from);
                    botSteps = data.intentionStepsCount + 1;
                }
            
                updateLastMessage(contentStepMessage[0], data.to, data.from);
                break

            

            case 'removeBg':

                let imageReturn = JSON.parse(removeBackground(contentStepMessage[0]).body);

                variablesChat[contentStepMessage[1]] = 'https:' + imageReturn.response.imgUrl;
                lastMessagebot = 'Variavel salva!';
                break;

            case 'blurImage':

                let imageReturnBlur = JSON.parse(blurImage(contentStepMessage[0]).body);

                variablesChat[contentStepMessage[1]] = 'https:' + imageReturnBlur.response.imgUrl;
                lastMessagebot = 'Variavel salva!';
                break;

            case 'uploadCloudPublicIDImage':

                let cloudinaryImageUpload = await uploadCloudinaryImage(contentStepMessage[0], contentStepMessage[2], contentStepMessage[3], contentStepMessage[4]);
                variablesChat[contentStepMessage[1]] = cloudinaryImageUpload.cloudinaryPublicID;
                variablesChat[contentStepMessage[1] + '_forTransform'] = cloudinaryImageUpload.cloudinaryPublicIDForTransform;
                updateVariablesChat(variablesChat, data.to, data.from);
                updateNextStepUser(data.intention[0].nextStep, data.to, data.from);
                updateLastMessage('Variável ' + contentStepMessage[1] + ' salva com sucesso!', data.to, data.from);
                break;
            
            case 'uploadCloudPublicIDVideo':

                let cloudinaryVideoUpload = await uploadCloudinaryVideo(contentStepMessage[0], contentStepMessage[2], contentStepMessage[3], contentStepMessage[4]);
                variablesChat[contentStepMessage[1]] = cloudinaryVideoUpload.cloudinaryPublicID;
                variablesChat[contentStepMessage[1] + '_forTransform'] = cloudinaryVideoUpload.cloudinaryPublicIDForTransform;
                variablesChat[contentStepMessage[1] + '_WithFormat'] = cloudinaryVideoUpload.cloudinaryPublicIDWithFormat;
                variablesChat[contentStepMessage[1] + '_Url'] = cloudinaryVideoUpload.cloudinaryUrl;
                variablesChat[contentStepMessage[1] + '_Version'] = cloudinaryVideoUpload.cloudinaryVersion;
                updateVariablesChat(variablesChat, data.to, data.from);
                updateNextStepUser(data.intention[0].nextStep, data.to, data.from);
                updateLastMessage('Variável ' + contentStepMessage[1] + ' salva com sucesso!', data.to, data.from);
                break;
            
            case 'uploadGoogle':

                let googleVideoUpload = await uploadGoogle(contentStepMessage[0]);
                variablesChat[contentStepMessage[1]] = googleVideoUpload;
                updateVariablesChat(variablesChat, data.to, data.from);
                updateNextStepUser(data.intention[0].nextStep, data.to, data.from);
                updateLastMessage('Variável ' + contentStepMessage[1] + ' salva com sucesso!', data.to, data.from);
                break;

            case 'saveCustomization':
                let saveReturn = JSON.parse(saveCustomization(encodeURI(contentStepMessage[0]), contentStepMessage[1], contentStepMessage[2], contentStepMessage[3], contentStepMessage[4]).body);
                break;

            default:
                console.log('Deu ruim');
        }

    }
}

module.exports = readIntentions