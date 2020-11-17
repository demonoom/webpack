const express = require('express')
const app = express()

/**
 * CORS 跨域资源共享
 * @type {*|(function(*=): function(*=, *=, *=): void)}
 */
// const cors = require('cors')
// app.use(cors())

app.get('/api/getUserInfo', (req, res) => {
    res.send({
        name: 'noom',
        age: 13
    })
})

app.get('/getMoney', (req, res) => {
    res.send({
        money: '￥200'
    })
})

app.listen(9999, () => {
    console.log('服务开启');
})