const axios = require("axios").default;

const uploadGoogle = async (video) => {
  
    let data = {
      "video": video
    };
        
    let optionsGoogle = {
        method: 'post',
        url: 'https://1070-21a-dock--cloudwhats.bubbleapps.io/version-test/api/1.1/wf/uploadgoogle',
        headers: {
          "Content-Type": "application/json"
        },
        data: data,
    }

    let urlResponse = await axios(optionsGoogle).catch(err => {
      console.log(err);
    });
  
  
    return urlResponse.data;

}

module.exports = uploadGoogle