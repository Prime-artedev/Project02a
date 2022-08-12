const axios = require("axios").default;
const FormData = require('form-data');



//Conectando usuário ao banco de dados
const getOrCreateUser = async (nextStepUser) => {
  
  let dataUpdate = new FormData();
  dataUpdate.append('passo_text', nextStepUser);
  
  let getUserChat = await getUserBd(data.numeroBot, data.telefone_formatado);
  let upDateStepUser = await updateUser(getUserChat.response, );
  }



const getUserBd = async (numeroBot, telefone_formatado) => {
  
    let filtro = '[{"key": "telefone_bot_text", "constraint_type": "equals", "value": "' + numeroBot + '"}, {"key": "telefone_text", "constraint_type": "equals", "value": "' + telefone_formatado + '"}]'; 
    let config = {
      method: 'get',
      url: encodeURI('https://dash.zapbrand.com.br/version-test/api/1.1/obj/Atendimento_Eduzz_Bot?constraints=' + filtro),
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

const updateUser = async (data) => {
  
    let primeiroNome = data.nome.match(/[^\s]+/);
    var config = {
      method: 'post',
      url: encodeURI('https://dash.zapbrand.com.br/version-test/api/1.1/obj/Atendimento_Eduzz_Bot'),
      headers: { 
        'Content-type': 'application/json',
        'Toke': '0674e1613b0bc343c32e3eba6dd70a30'
      },
      responseType: 'json',
      data: {
        "id_mensagem_recebida_text": data.id_msg,
        "nome_text": data.nome,
        "passo_text": 'Saludo',
        "telefone_bot_text": data.numeroBot,
        "telefone_text": data.telefone_formatado,
        "variaveis_text": '{"whatsapp":"' + data.telefone_formatado + '","primeiro_nome":"' + primeiroNome + '"}',
        "ultima_mensagem_bot_text": "Usuário Criado!",
      }
    };

    let urlResponse = await axios(config).catch(err => {
      console.log(err);
    });
  
  
    let filtro = '[{"key": "_id", "constraint_type": "equals", "value": "' + urlResponse.data.id + '"}]'; 
    let configGetUser = {
      method: 'get',
      url: encodeURI('https://dash.zapbrand.com.br/version-test/api/1.1/obj/Atendimento_Eduzz_Bot?constraints=' + filtro),
      headers: { 
        'Content-type': 'application/json'
      },
      responseType: 'json',
    };
  
    let urlResponseGetUser = await axios(configGetUser).catch(err => {
      console.log(err);
    });
  
    return urlResponseGetUser.data;
  
}

module.exports = getOrCreateUser