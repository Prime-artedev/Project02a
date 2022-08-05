const axios = require("axios").default;

const uploadCloudinaryVideo = async (video, uploadPreset, cloudinaryUser, cloudinaryPass) => {
  
    let data = {
      "upload_preset": uploadPreset,
      "file": video
    };
        
    let optionsCloudinary = {
        method: 'post',
        url: 'https://api.cloudinary.com/v1_1/prime-arte/video/upload',
        headers: {
          "Content-Type": "application/json",
          "user": cloudinaryUser, 
          "pass": cloudinaryPass
        },
        data: data,
    }

    let urlResponse = await axios(optionsCloudinary).catch(err => {
      console.log(err);
    });
  
    let cloudinaryPublicID = urlResponse.data.public_id.replace(/[/]/g, ':');
    let cloudinaryPublicIDForTransform = urlResponse.data.public_id;
    let cloudinaryPublicIDWithFormat = urlResponse.data.public_id + '.' + urlResponse.data.format;
    let cloudinaryUrl = urlResponse.data.url;
    let cloudinaryVersion = urlResponse.data.version;
  
    return {cloudinaryPublicID, cloudinaryPublicIDForTransform, cloudinaryPublicIDWithFormat, cloudinaryUrl, cloudinaryVersion};

}

module.exports = uploadCloudinaryVideo