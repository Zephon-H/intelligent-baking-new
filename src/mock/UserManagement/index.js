import Mock from 'mockjs'
let params =  Mock.mock({ // 数据池
    'identify':true
})

export default {
    changePwd: () => ({
        code: 200,
        data: params
    }),
    changeInfo: ()=>({
        code: 200,
        data: Mock.mock({
            "identify": true
        })
    })
}