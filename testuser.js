var Validator = require('./validator')

function User(name, age, email) {
    this.name = name;
    this.age = age;
    this.email = email;
}
User.prototype.save = function (callback) {
    if(true){
        return callback(undefined, this);
    }else{
        return callback('Saved failed.\n ', this);
    }
}
var callback = function(err,user){
    if(err){
        console.log(err);
    } else{
        console.log('Saved successfully')
    }
};
// 无校验功能
var user = new User('hingsir',-12,'error_email')
user.save(callback);

var validator = new Validator({
    name: {
        type: 'string',
        required: '用户名不能为空',
        err: '用户名长度4到16个字符',
        regexp: /\w{4,16}/
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
})

var old_save = User.prototype.save;
var new_save = (function (old_save,validator) {
    return function (callback) {
        if(validator){
            var ret = validator.validate(this)
            if(ret !== true) {
                return callback(ret,user);
            }
        }
        return old_save.call(this,callback);
    }
})(old_save,validator)
User.prototype.save = new_save;

//有校验功能
var user1 = new User('hingsir', -12, 'error_email');
user1.save(callback);
var user2 = new User('hingsir', 99, 'hingsir1024@gmail.com');
user2.save(callback);
