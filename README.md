Simple-Validator
================

A simple data validation framework for Node.js

How to use
============

*  `require` the validator module
```
    var Validator = require('./validator')   
```
*  Constructs a validator
```
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
```
* use `validate()`
```
    validator.validate({
        name:'hingsir',
        age:99,
        email:'hingsir1024@gmail.com'
    })
```
