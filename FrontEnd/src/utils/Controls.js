module.exports = class ControlUtils {    
    static showElement(id){
        let element = document.getElementById(id);
        if(element) element.style.display = "block";
    }
    static hideElement(id){
        let element = document.getElementById(id);
        if(element) element.style.display = "none";
    }
    static appendOptionsToSelectControl(id, options, selectedValue, properties){

        let element = document.getElementById(id);
        if((element == null) || (options == null)) return; 
        properties = properties || { Value: 'id', Text: 'value'};
        
        for(let i = element.options.length - 1 ; i >= 0 ; i--) element.remove(i);
        
        let optionElement = document.createElement('option');
        optionElement.setAttribute('value', '');
        optionElement.appendChild(document.createTextNode('Select an option ...'));
        element.appendChild(optionElement);
        
        var selectedIndex=0;
        for(let iOption in options){
            let option = options[iOption];
            optionElement = document.createElement('option');
            optionElement.setAttribute('value', option[properties.Value]);
            optionElement.appendChild(document.createTextNode(option[properties.Text]));
            element.appendChild(optionElement);
            if(option[properties.Value] === selectedValue) selectedIndex = iOption;
        }
        element.selectedIndex = selectedIndex;
    }
}
