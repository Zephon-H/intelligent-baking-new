import {url} from '../main'
import axios from  'axios'
//登录请求  请求成功保存用户信息到localstorge
export function loginRequest(obj){
    let requestUrl=url+'/LoginPage/Login'
    let getUserUrl = url + "/LoginPage/find_by_token"
    console.log(requestUrl)
    let post={
        user_id:obj.userId,
        password:obj.password
    }
    let bool
    axios.post(requestUrl,post).then((res)=>{
        console.log(res.data)
        let token = res.data.data
        let user = null
        axios.get(getUserUrl+"?user_id="+obj.user_id,{headers:{token}}).then(r=>{
            console.log(r.data)
            user = r.data.data
            bool = res.data.code === 200
            console.log(user)
            localStorage.setItem('token',token)
            localStorage.setItem('user',JSON.stringify(user))
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
            console.log(bool)
            obj.login(bool)
        })
    }).catch((err)=>{
        console.log(err)
    })
}