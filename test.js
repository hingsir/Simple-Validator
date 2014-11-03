var Validator = require('./validator')

var params = {
    name: {
        type: 'string',
        required: '用户名不能为空',
        err: '用户名长度4到16个字符',
        regexp: /\w{4,16}/,
        min: 4,
        max: 16
    },
    email: {
        type: 'email',
        required: '邮箱不能为空',
        err: '邮箱不合法'
    },
    age: {
        type: 'number',
        err: '年龄1到120之间',
        min: 1,
        max: 120
    }
}

var obj = {
    name:'hingsir',
    age: 99,
    email:'hingsir1024@gmail.com'
}

var validator = new Validator(params);
console.log(validator.validate(obj))

obj = {
    name:'hingsir',
    age: -12,
    email:'hingsir1024@gmail.com'
}
console.log(validator.validate(obj))
