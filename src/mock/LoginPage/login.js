import Mock from 'mockjs'
let params =  Mock.mock(
    "ecnueyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlY251IiwiaGVhZF9pbWciOiJodHRwczovL3hkLXZpZGVvLXBjLWltZy5vc3MtY24tYmVpamluZy5hbGl5dW5jcy5jb20veGRjbGFzc19wcm8vZGVmYXVsdC9oZWFkX2ltZy8xNC5qcGVnIiwiaWQiOiJ0ZXN0dHR0Iiwibm5hbWUiOiJ0ZXN0dHR0IiwicGhvbmUiOiIxMzIxMTIyMzMxMSIsImlhdCI6MTY0NzM5NTYzOCwiZXhwIjoxNjQ4MDAwNDM4fQ"
)

let token = Mock.mock({
        "category": "1",
        "create_time": "2022-01-13 13:55:50",
        "head_img": "https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/14.jpeg",
        "nname": "testttt",
        "phone": "13211223311",
        "user_id": "testttt",
})

let registRes = Mock.mock({
    "identify": true
})

export default {
    login: () => ({
        code: 200,
        data: params
    }),
    findByToken: () => ({
        code: 200,
        data: token,
    }),
    register: ()=>({
        code:200,
        data:registRes
    })
}