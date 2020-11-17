let host = ''
if (!IS_DEV) {
    host = 'http://www.itheima.com'
}

// console.log(location.origin);

import axios from 'axios'

let url = host + '/api/getUserInfo'

export const getUserInfo = () => axios.get(url)

let url2 = host + '/serve/getMoney'

export const getMoney = () => axios.get(url2)