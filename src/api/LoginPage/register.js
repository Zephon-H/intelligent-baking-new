import {url} from '../main'
import axios from 'axios'
//注册请求
export function registerRequest(obj){
    let requestUrl=url+'/LoginPage/Register'
    let post={
        nname: obj.nname.value,
        user_id:obj.user_id.value,
        password:obj.password.value,
        phone: obj.phone.value,
    }
    let bool
    axios.post(requestUrl,post).then((res)=>{
        bool=res.data.code===200
    }).catch((err)=>{
        console.log(err)
    }).finally(()=>{
        obj.register(bool)
    })
}