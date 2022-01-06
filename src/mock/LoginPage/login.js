import Mock from 'mockjs'
let params =  Mock.mock({ // 数据池
    "identify":"true",
    "user":"10010101",
    "gender":"男",
    "name":"张三",
    "nname":"华东师范大学用户",
    "phone":"13112860101",
    "token":"token123xckjvqjwoierdslkflasdlfaooqrwe"
})

let token = Mock.mock({
    "identify":true,
})

let registRes = Mock.mock({
    "identify": true
})

export default {
    login: () => ({
        code: 200,
        data: params
    }),
    tokenCertify: () => ({
        code: 200,
        data: token,
    }),
    register: ()=>({
        code:200,
        data:registRes
    })
}