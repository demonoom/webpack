//这个webpack的配置文件就是用来打包vue全家桶的

const path = require('path')

module.exports = {
    entry: {
        vue:[
            'vue',
            'vue-router',
        ]
    },
    output: {},
    mode: "development"
}