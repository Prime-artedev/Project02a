const getOrCreateUser = require('../repository/getOrCreateUser.js');
const axios = require("axios").default;

const goToRule = async (trigger, to, from) => {
  
  let dadosUsuario = {
    numeroBot: from, 
    telefone_formatado: to
  }

  let userBd = await getOrCreateUser(dadosUsuario);
  
  let userBdName = userBd.results[0].nome_text;
  let userBdPhone = userBd.results[0].telefone_text;
  let userBdPhoneBot = userBd.results[0].telefone_bot_text;
  
  let data = {
    "object": "whatsapp_business_account",
    "entry": [
      {
        "id": "115704854474125",
        "changes": [
          {
            "value": {
              "messaging_product": "whatsapp",
              "metadata": {
                "display_phone_number": "15550028516",
                "phone_number_id": userBdPhoneBot
              },
              "contacts": [
                {
                  "profile": {
                    "name": userBdName
                  },
                  "wa_id": userBdPhone
                }
              ],
              "messages": [
                {
                  "from": userBdPhone,
                  "id": "wamid.HBgMNTU2MTg1OTUyNjcxFQIAEhgUM0ExNEVGOTgwOTYzRkJCMUNGMkEA",
                  "timestamp": "1657027381",
                  "text": {
                    "body": trigger
                  },
                  "type": "text"
                }
              ]
            },
            "field": "messages"
          }
        ]
      }
    ]
  };

  let options = {
    method: 'post',
    url: 'https://gentle-abalone-toothpaste.glitch.me/webhook',
    data : data
  };
  
  let urlResponse = await axios(options).catch(err => {
    console.log(err);
  });
  
}

module.exports = goToRule