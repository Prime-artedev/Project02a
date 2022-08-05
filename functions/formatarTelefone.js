const formatarTelefone = async (ddd, telefone) => {

    let dddTelefone = ddd;
    let telefoneUser = telefone;
  
    if(telefoneUser >= 2 && telefoneUser <= 5  ){
        return '55' + dddTelefone + telefoneUser;
    }
    if (telefone.length <= 8) {
        return '55' + dddTelefone + '9' + telefoneUser;
    } else {
        return '55' + dddTelefone + telefoneUser;
    }
  
};

module.exports = formatarTelefone