"use strict";

const token = 'EAAPyG65TovABAJZCHFVgmC4BTNl5aZAXuLPe7sxxG9y2Ka9zCci6WWKo1DiwEXFb75qYjUZBZAEqpgCPzXEnLRwrImN48rCkyMEBx9yl46wxii2JTZCZAJUTJEzt0xKSNozd8ZCwOsSPcX1ubhOHZA2wQoX5P2jwcrrgFwUWXURBdqdgqABmtu70';

const request = require("request");
const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios").default;
const app = express().use(body_parser.json());
const cors = require('cors');
const fs = require('fs');
const FormData = require('form-data');

const formatarTelefone = require('./functions/formatarTelefone.js');
const obterConteudoTipoMessage = require('./functions/obterConteudoTipoMessage.js');

const getOrCreateUser = require('./repository/getOrCreateUser.js');
const getBotContent = require('./repository/getBotContent.js');
const getIntention = require('./repository/getIntention.js');

const readIntencion = require('./bot/readIntentions.js');


app.use(cors());
app.listen(process.env.PORT || 1337, () => console.log("webhook is listening"));

app.post("/webhook", async (req, res) => {
  
  let body = req.body;

  if (req.body.object) {
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
      
      //Dados da mensagem que chegou
      let numeroBot = '101971249283373';
      let numeroUser = req.body.entry[0].changes[0].value.messages[0].from;
      let numeroUserDDD = req.body.entry[0].changes[0].value.messages[0].from.substr(2, 2);
      let numeroUserFormatado = await formatarTelefone(numeroUserDDD, req.body.entry[0].changes[0].value.messages[0].from.substr(4));
      
      let tipoMensagem = req.body.entry[0].changes[0].value.messages[0].type;
      let mensagemUser = await obterConteudoTipoMessage(tipoMensagem, req.body.entry[0].changes[0].value.messages[0], token);
      
      let dadosUsuario = {
          nome: req.body.entry[0].changes[0].value.contacts[0].profile.name,
          id_msg: req.body.entry[0].changes[0].value.messages[0].id,
          type: tipoMensagem,
          numeroBot: numeroBot,
          telefone_formatado: numeroUserFormatado,
          from: numeroUser,
          msgBody: mensagemUser
      }

      let userBd = await getOrCreateUser(dadosUsuario);
      let variablesChat = JSON.parse(userBd.results[0].variaveis_text);
      
      let contentBot = await getBotContent();
      let userIntention = await getIntention(contentBot, mensagemUser, userBd.results[0].passo_text, variablesChat, userBd.results[0].ultima_mensagem_bot_text);
      
      let dataReadBot = {
        intention: userIntention.intention,
        positionInicial: userIntention.positionInicial,
        intentionStepsCount: userIntention.lengthIntention,
        variables: variablesChat,
        to: userBd.results[0].telefone_text,
        from: userBd.results[0].telefone_bot_text,
        messageUser: mensagemUser,
        typeMessage: tipoMensagem
      }
      
      readIntencion(dataReadBot);   
      
      let dataEnvio = {
        'ID da última mensagem': userBd.results[0].id_mensagem_recebida_text,
        'Nome Chat': userBd.results[0].nome_text,
        'Passo atual': userBd.results[0].passo_text,
        'Numero bot': userBd.results[0].telefone_bot_text,
        'Telefone Usuário': userBd.results[0].telefone_text,
        'Ultima mensagem do bot': userBd.results[0].ultima_mensagem_bot_text,
        'Variaveis Chat': userBd.results[0].variaveis_text,
        'ID do chat': userBd.results[0]._id,
        'Mensagem Usuário': dadosUsuario.msgBody,
        'Tipo da mensagem': dadosUsuario.type
      }
      
      console.log(dataEnvio);

      var config = {
        method: 'post',
        url: 'https://1070-21a-dock--cloudwhats.bubbleapps.io/version-test/api/1.1/wf/whatsapp_eduzz',
        headers: { 
          "Content-Type": "application/json",
        },
        data: dataEnvio,
      };

      //let urlResponse = await axios(config).catch(err => {
        //console.log(err);
      //});
      
    }

    res.sendStatus(200);
  
} else {

    res.sendStatus(404);
  }
});


app.get("/webhook", (req, res) => {

  const verify_token = '2TitQYRgXX';

  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {

    if (mode === "subscribe" && token === verify_token) {
      
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      
      res.sendStatus(403);
    }
  }
});





