const StringUtils = require("../../../utils/String");

module.exports = class ChapterLineFactory {
    static create(){
        return{
            Description: StringUtils.Empty,
            Quantity: 0
        };
    }
}