// 保存模拟数据路径
import Mock from 'mockjs'
import login from './LoginPage/login'
import home from './HomePage/home'
import dataQuery from './DataQuery'
import userManagement from './UserManagement'

Mock.mock(/\/LoginPage\/Login/,'post',login.login)
Mock.mock(/\/LoginPage\/TokenCertify/, 'get', login.tokenCertify)
Mock.mock(/\/LoginPage\/Register/,'post',login.register)
// /LoginPage/Login


Mock.mock(/\/HomePage\/Home\/MapData\/000000/,'post',home.mapData)
Mock.mock(/\/HomePage\/Home\/MapData\/530000/,'post',home.mapDataProvince)   // 云南省
Mock.mock(/\/HomePage\/Home\/MapData\/[530100,530700]/,'post',home.mapDataCity)   // 昆明市 530100

// Mock.mock(/\/HomePage\/Home\/DeviceData/,'post',home.deviceData)
Mock.mock('/api/HomePage/Home/DeviceData','post',home.deviceData)



Mock.mock(/\/HomePage\/Home\/QueryData/,'post',dataQuery.getSearchData)

// Mock.mock(/\/HomePage\/Home\/DeviceDataDetail/,'post',dataQuery.getDeviceDataDetail)

Mock.mock('/api/HomePage/Home/DeviceDataDetail','post',dataQuery.getDeviceDataDetail)


Mock.mock(/\/HomePage\/UserManagement\/Pwd/,'post',userManagement.changePwd)
Mock.mock(/\/HomePage\/UserManagement\/Manage/,'post',userManagement.changeInfo)
