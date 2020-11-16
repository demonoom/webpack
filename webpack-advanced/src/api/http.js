let host = 'http://192.168.1.22:9999'
if (!IS_DEV) {
    host = 'http://www.itheima.com'
}

import axios from 'axios'

let url = host + '/api/v1/getUserInfo'

export const getUserInfo = () => axios.get(url)