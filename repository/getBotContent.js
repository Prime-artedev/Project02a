const getBotContent = async () => {

  return {
        "Name": "Nestle Bot",
        "description": "",
        "steps": [
            {
                "id": "Saludo",
                "label": "Saludo",
                "triggers": ["oi", "bauducco 70 anos", "endBot"],
                "contents": [
                    [{"buttonReply": ["Olá! Bem vindo a Imersão na prática. A maneira mais rápida de gerar 2 anos de faturamento em apenas 2 dias!", [{"reply": "fluxosuafoto(-)Faça a sua foto"},  {"reply": "fluxovideo(-)Faça o seu vídeo"}], "none"]}]
                ],
                "nextStep": "endBot"
            },
            {
                "id": "fluxosuafoto",
                "label": "fluxosuafoto",
                "triggers": ["fluxosuafoto"],
                "contents": [
                    [{"goToRule": ["limite@029830923804398", "<variable.foto_count_individual>:equals:20"]}],
                    [{"question": ["Por favor, envie a sua foto. Capriche! 📸", "none"]}], 
            		    [{"variableSave": ["foto", ["validImage", "Ops, por favor, envie a sua foto 📸"], "none"]}],
                    [{"text": ["Estamos preparando a sua arte...", "none"]}],
                    [{"uploadCloudPublicIDImage": ["<variable.foto>", "foto", "eduzzPhotos", "429282383232114", "FUG52Np2tu04_63RIPe4u6zQGNI", "none"]}],
                    [{"uploadCloudPublicIDImage": ["https://res.cloudinary.com/prime-arte/image/upload/c_fill,g_face:center,h_1000,w_1000/v1657628807/<variable.foto_forTransform>.jpg", "foto", "eduzzPhotos", "429282383232114", "FUG52Np2tu04_63RIPe4u6zQGNI", "none"]}], 
            		    [{"image": ["https://res.cloudinary.com/prime-arte/image/upload/bo_1px_solid_rgb:ff0000,c_scale,fl_no_overflow,g_east,h_965,u_image:<variable.foto>,w_965,x_-110,y_67/v1658745282/Eduzz/Campanhas/ImersaoNaPratica/InversaoNaPraticaPost.png", "", "none"]}],
                    [{"image": ["https://res.cloudinary.com/prime-arte/image/upload/c_scale,h_1010,u_image:<variable.foto>,w_1010,y_-110/v1658745283/Eduzz/Campanhas/ImersaoNaPratica/imersaoNaPraticaStory.png", "Pronto, agora é só compartilhar a sua foto em suas redes sociais. Use as hashtags #ImersãoNaPratica e #NaPratica", "none"]}],
                    [{"variableSaveValueCount": ["foto_count_individual", "none"]}]
                ],
                "nextStep": "endBot"
            },
            {
                "id": "fluxovideo",
                "label": "fluxovideo",
                "triggers": ["fluxovideo"],
                "contents": [
                    [{"question": ["Por favor, grave ou envie seu vídeo de até 1 min. Capriche! 📹", "none"]}], 
            		    [{"variableSave": ["video", ["validVideo", "Por favor, grave ou envie seu vídeo de até 1 min. Capriche! 📹"], "none"]}],
                    [{"text": ["Estamos preparando o seu vídeo...", "none"]}],
                    [{"uploadCloudPublicIDVideo": ["<variable.video>", "video", "eduzzPhotos", "429282383232114", "FUG52Np2tu04_63RIPe4u6zQGNI", "none"]}],
                    [{"uploadGoogle": ["https://res.cloudinary.com/prime-arte/video/upload/c_pad,fl_no_stream,h_1280,q_60,w_720/c_scale,h_1280,l_image:Eduzz:Campanhas:ImersaoNaPratica:videoStory,w_720/v<variable.video_Version>/<variable.video_WithFormat>", "video", "none"]}],
                    [{"video": ["<variable.video>", "Pronto, agora é só compartilhar a sua foto em suas redes sociais. Use as hashtags #ImersãoNaPratica e #NaPratica", "none"]}]
                ],
                "nextStep": "endBot"
            },
            {
                "id": "Limite",
                "label": "Limite",
                "triggers": ['limite@029830923804398'],
                "contents": [
            		[{"text": ["Você atingiu o máximo de personalizações", "none"]}], 
                ],
                "nextStep": "endBot"
            }
        ]
    };
  
}

module.exports = getBotContent