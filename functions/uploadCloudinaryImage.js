const axios = require("axios").default;

const uploadCloudinaryImage = async (image, uploadPreset, cloudinaryUser, cloudinaryPass) => {
  
    let data = {
      "upload_preset": uploadPreset,
      "file": image
    };
        
    let optionsCloudinary = {
        method: 'post',
        url: 'https://api.cloudinary.com/v1_1/prime-arte/image/upload',
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
    let cloudinaryUrl = urlResponse.data.url;
  
    return {cloudinaryPublicID, cloudinaryPublicIDForTransform, cloudinaryUrl};

}

module.exports = uploadCloudinaryImage