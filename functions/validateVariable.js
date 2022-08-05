const validateVariable = (value, typeValidate, typeMessage) => {
    let messageUser = value;
    let response;
    let regex;

    switch (typeValidate[0]) {
       case 'invalid':
         response = messageUser;
         return response;
         break;     

       case 'validEmail':
         regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/gi;
         response = messageUser.match(regex) == null ? 'not valid' : 'valid';
         return response;
         break;

       case 'validImage':
         response = typeMessage != 'image' ? 'not valid' : 'valid';
         return response;
         break;

       case 'validVideo':
         response = typeMessage != 'video' ? 'not valid' : 'valid';
         return response;
         break;
    } 

}

module.exports = validateVariable