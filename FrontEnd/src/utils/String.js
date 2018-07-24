module.exports = class StringUtils{
    static Empty = '';

    static IsNullOrEmpty (value) {
        if(value == null) return true;
        value = value.trim(value);
        return value === this.Empty;
    }
};