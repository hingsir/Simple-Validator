/**
 * Constructs a validator for the specified params.
 * params may contains below:
 * type: specifies the data type of a parameter item.it can be 'string','email' or 'number'.
 * required: specifies the message when this item is required but is null actually.
 * err: specifies the message when validate failed.
 * regexp: you can supply a regular expression to the validator.
 * min: if type is 'string',it means the minimum length of the string.
 *      if type is 'number',it means the minimum value of the number.
 * max: if type is 'string',it means the maximum length of the string.
 *      if type is 'number',it means the maximum value of the number.
 * @param params
 * @constructor
 * @author hingsir <hingsir1024@gmail.com>
 * @date 2014-11-03
 */
function Validator(params) {
    this.params = params;
}

module.exports = Validator ;

/**
 *  Returns the result of the validation.
 *  only when the return value equals 'true' means validation passed.
 * @param obj
 * @returns {*}
 */
Validator.prototype.validate = function (obj) {
    var params = this.params;
    for (var i in params) {
        var param = params[i]
            , value = obj[i]
        var required = param.required;
        if (required) {
            if (!value) {
                return required;
            }
        }
        if (!_validateField(param, value))
            return param.err || i + ' invalid.';
    }
    return true;

    function _validateField(field, value) {
        var type = field.type || 'string'
            , regexp = field.regexp || undefined
            , min = field.min || 0
            , max = field.max || 0
        switch (type) {
            case 'string':
                return _validateString(regexp, min, max, value);
                break;
            case 'number':
                return _validateNumber(regexp, min, max, value);
                break;
            case 'email':
                return _validateEmail(regexp, min, max, value);
                break;
            default :
                throw "unknown type \'" + type + '\'';
        }
    }

    function _validateEmail(regexp, min, max, value) {
        regexp = regexp || /^\w+(\.\w+)*@\w+(\.\w+)+$/;
        if (!regexp.test(value)) {
            return false;
        }
        return true;
    }

    function _validateNumber(regexp, min, max, value) {
        value = Number(value);
        if (Number.isNaN(value)) {
            return false;
        }
        if (regexp) {
            if (!regexp.test(value)) {
                return false;
            }
        }
        if (!(min === 0 && max === 0)) {
            if (value < min || value > max) {
                return false;
            }
        }
        return true;
    }

    function _validateString(regexp, min, max, value) {
        if (regexp) {
            if (!regexp.test(value)) {
                return false;
            }
        }
        if (!(min === 0 && max === 0)) {
            if (value.length < min || value.length > max) {
                return false;
            }
        }
        return true;
    }
}
