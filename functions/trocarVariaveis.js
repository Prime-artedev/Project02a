const trocarVariaveisDoTexto = (text, variables) => {
    let regex = /\<(.*?)\>/g;
    let variablesText = text.match(regex);

    if(variablesText != null){
        for(let v = 0; v < variablesText.length; v++){
            let variableReplace = variablesText[v].substr(0, variablesText[v].length - 1);
            variableReplace = variableReplace.substr(1);
            variableReplace = variableReplace.replace('variable.', '');

            let findVariable = Object.entries(variables);
            variableReplace = findVariable.filter(item => item.includes(variableReplace));

            if(variableReplace.length != 0){
                text = text.replace(variablesText[v], variableReplace[0][1]); 
            }else{
                text = text;
            }
        }
    }

    return text;
}

module.exports = trocarVariaveisDoTexto