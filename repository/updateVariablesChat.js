const axios = require("axios").default;
const FormData = require('form-data');

const updateVariablesChat = async (variables, to, from) => {
  
  let getUser = await getUserBd(from, to);
  
  let dataUpdate = new FormData();
  dataUpdate.append('variaveis_text', JSON.stringify(variables));
  
  let config = {
      method: 'patch',
      url: 'https://dash.zapbrand.com.br/version-test/api/1.1/obj/Atendimento_Eduzz_Bot/' + getUser.response.results[0]._id,
      headers: { 
          'Content-type': 'application/json',
          ...dataUpdate.getHeaders()
      },
      responseType: 'json',
      data: dataUpdate
  };
  
  let updateUser = await axios(config).catch(err => {
      console.log(err);
  });
  
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


module.exports = updateVariablesChat