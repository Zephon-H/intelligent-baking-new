import Mock from 'mockjs'

// let params = Mock.mock({ // 数据池
//     "云南省": {"total": 1000, "abnormal": 10},
//     "贵州省": {"total": 100}
// })
let provinceParams = Mock.mock(
    {
        location: '650000', // 邮编
        device_number: 600,
        children: [
            {
                location: '650100',
                device_number: 100,
                children: [
                    {
                        location: '654100',
                        device_number: 20,
                    },
                    {
                        location: '650041',
                        device_number: 80,
                    }
                ]
            },
            {
                location: '674100',
                device_number: 500
            }]
    })
// let provinceParams = Mock.mock({ // 数据池
//     "昆明市": {"total": 600, "abnormal": 3},
//     "普洱市": {"total": 200},
//     "丽江市": {"total": 200, "abnormal": 7}
// })
// let cityParams = Mock.mock({
//     "东川区": {"total": 340},
//     "晋宁县": {"total": 260, "abnormal": 3}
// })


let deviceData = Mock.mock({
    "runningDevice": [10, 100, 300, 500, 600, 1000, 800, 600, 100],
    "abnormalDevice": [0, 0, 10, 13, 20, 80, 22, 4, 2],
    "run_time": ["1d", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d"]
})


export default {
    // mapData: () => ({
    //     code: 200,
    //     data: params
    // }),
    mapDataProvince: () => ({
        code: 200,
        data: provinceParams
    }),
    // mapDataCity: () => ({
    //     code: 200,
    //     data: cityParams
    // }),
    deviceData: () => ({
        code: 200,
        data: deviceData
    })
}
