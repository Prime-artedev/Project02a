const removeAcento = require('../functions/removerAcento.js');
const trocarVariaveisDoTexto = require('../functions/trocarVariaveis.js');

const getIntention = async (contentBot, userMessage, stepUser, variablesChat, lastMessagebot) => {
  
  let findIntention = Object.entries(contentBot);
  let positionInicial = 0;
  let intention;
    
  if(findIntention[2][1].filter(item => item.triggers.includes(removeAcento(userMessage).toLowerCase())).length != 0){
      intention = findIntention[2][1].filter(item => item.triggers.includes(removeAcento(userMessage).toLowerCase()));
      //nextStepUser = intention[0].nextStep;

  }else if(findIntention[2][1].filter(item => item.id.includes(stepUser))){
      intention = findIntention[2][1].filter(item => item.id.includes(stepUser));
      //nextStepUser = intention[0].nextStep;

      /*Pegando posição de onde o usuário parou*/

      let positionQuestionUser = Object.entries(intention[0].contents);
      for(let p = 0; p < positionQuestionUser.length; p++){
          let itemPosition = Object.entries(positionQuestionUser[p][1][0]);
          let itemCompare = trocarVariaveisDoTexto(itemPosition[0][1][0], variablesChat);

          if(itemCompare == lastMessagebot){
             positionInicial = p + 1;
             break;
          }
      }

      /*---------------------------------------*/

  }
  
  let lengthIntention = intention[0].contents.length;
  
  return {intention, positionInicial, lengthIntention};
  
}

module.exports = getIntention





