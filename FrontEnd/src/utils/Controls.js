module.exports = class ControlUtils {    
    static ShowElement(id){
        var element = document.getElementById(id);
        if(element) element.style.display = "block";
    }
    static HideElement(id){
        var element = document.getElementById(id);
        if(element) element.style.display = "none";
    }
}
