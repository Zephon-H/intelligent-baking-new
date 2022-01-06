import Mock from 'mockjs'

let params = Mock.mock({ // 数据池

        location: '650000',
        // label: '云南省',
        children: [{
            location: '650100',
            // label: '昆明市',
            children: [{
                location: '654100',
                // label: '东川区',
                children: [{
                    value: '10001',
                    label: '设备1'
                },{
                    value: '10002',
                    label: '设备2'
                }
                ]
            }, {
                location: '650300',
                label: '安宁市'
            }, {
                location: '650032',
                label: '西山区'
            }]
        }, {
            location: '674100',
            // label: '丽江市',
            children: [ {
                location: '674201',
                // label: '永胜县'
            }]
        }]

})

let deviceDataDetail = Mock.mock({
    "dryBallTemp": [10, 15, 32, 55, 88, 99, 66, 76, 60, 70, 75, 77],
    "dryBallTempTarget": [8, 12, 30, 40, 70, 88, 68, 52, 30, 40, 50, 55],
    "wetBallTemp": [0, 0, 10, 13, 20, 80, 22,  4, 2, 5, 10, 20],
    "wetBallTempTarget": [0, 10, 6, 11, 15, 54, 12,  8, 1, 3, 7, 12],
    "run_time": ["1d", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "11d", "12d"]
})

export default {
    getSearchData: () => ({
        code: 200,
        data: params
    }),
    getDeviceDataDetail:()=>( {
        code: 200,
        data: deviceDataDetail
    })
}
