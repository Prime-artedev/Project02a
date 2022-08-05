const axios = require("axios").default;

async function obterConteudoTipoMessage(tipo, body, token){
  const op = tipo;
  switch (op) {
      
    case 'text':
      return body.text.body
      break;
      
    case 'image':
      
      let imageUrlFacebook = await getUrlFacebook(body.image.id, token);
      let imageUrlImageFacebook = await getUrlImageFacebook(imageUrlFacebook, token);
      return 'https:' + imageUrlImageFacebook;
      break;
      
    case 'video':
      
      let videoUrlFacebook = await getUrlFacebook(body.video.id, token);
      let videoUrlVideoFacebook = await getUrlImageFacebook(videoUrlFacebook, token);
      return 'https:' + videoUrlVideoFacebook;
      break;
    
    case 'interactive':
      
      return body.interactive.type == 'list_reply' ? body.interactive.list_reply.id : body.interactive.button_reply.id;
      break;
      
  }
}

const getUrlFacebook = async (id, token) => {
    var config = {
      method: 'get',
      url: 'https://graph.facebook.com/v13.0/' + id,
      headers: { 
        'Content-type': 'application/json', 
        'Authorization': 'Bearer ' + token
      },
      responseType: 'json',
    };

    let urlResponse = await axios(config);
    return urlResponse.data.url;
}

const getUrlImageFacebook = async (url, token) => {
    
    var config = {
      method: 'post',
      url: 'https://consulta.nowplataforma.com.br/version-test/api/1.1/wf/ImagemFacebook',
      headers: { 
        "Content-Type": "application/json",
      },
      data:{
        url: url,
        token: 'Bearer ' + token
      },
    };
  
    let urlResponse = await axios(config);
    return urlResponse.data.response.url;
}

module.exports = obterConteudoTipoMessage