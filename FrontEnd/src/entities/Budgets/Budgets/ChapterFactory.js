const StringUtils = require("../../../utils/String");

module.exports = class ChapterFactory {
    static create(){
        return{
            Description: StringUtils.Empty,
            Quantity: 0,
            Lines: []
        };
    }
}