module.exports = class ControlUtils {    
    static ShowElement(id){
        var element = document.getElementById(id);
        if(element) element.style.display = "block";
    }
    static HideElement(id){
        var element = document.getElementById(id);
        if(element) element.style.display = "none";
    }
    static AppendOptionsToSelectControl(id, options, properties){
        var element = document.getElementById(id);
        if((element == null) || (options == null)) return; 
        properties = properties || { Value: 'id', Text: 'value'};
        
        for (var i = 0; i < options.length; i++)
            element.options[i] = null;
        
        var optionElement = document.createElement('option');
        optionElement.setAttribute('value', '');
        optionElement.appendChild(document.createTextNode('Select an option ...'));
        element.appendChild(optionElement);

        for(var option in options){
            optionElement = document.createElement('option');
            optionElement.setAttribute('value', option[properties.Value]);
            optionElement.appendChild(document.createTextNode(option[properties.Text]));
            element.appendChild(optionElement);
        }
    }
}
