import {url} from "./main";
import * as request from "@/utils/request";

export function getLinesData(obj, params) {
    // let dataMonitoringRequestUrl = url + '/HomePage/Home/DeviceData'
    let dataMonitoringRequestUrl = url + '/api/query/linesdata'
    let lines_data = [], red = [], time = []
    request.post(dataMonitoringRequestUrl, params).then(res => {
        console.log(res.data)
        lines_data = res.data.blue
        red = res.data.red
        time = res.data.time
        // time = res.data.run_time
    }).catch(err => {
        console.log(err)
    }).finally(() => {
        obj.setDataDeviceOption(lines_data, red, time)
    })
}