// 保存模拟数据路径
import Mock from 'mockjs'
import login from './LoginPage/login'
import home from './HomePage/home'
import lines from "./lines";
// import log from "echarts/src/scale/Log";
// import dataQuery from './DataQuery'
// import userManagement from './UserManagement'

// Mock.mock(/\/LoginPage\/Login/,'post',login.login)
// Mock.mock(/\/LoginPage\/find_by_token/, 'get', login.findByToken)
// Mock.mock(/\/LoginPage\/Register/,'post',login.register)
// /LoginPage/Login

Mock.mock(/\/api\/LoginPage\/Login/,'post',login.login)
Mock.mock(/\/api\/LoginPage\/find_by_token/, 'get', login.findByToken)
// Mock.mock('/api/LoginPage/Login ','post', login.login)
// Mock.mock(/\/LoginPage\/find_by_token/, 'get', login.findByToken)
Mock.mock(/\/api\/api\/query\/detailRoastedTobacco/,'post',home.detailData)
Mock.mock(/\/api\/api\/query\/linesdata/,'post',lines.linesData)
/*
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
*/

