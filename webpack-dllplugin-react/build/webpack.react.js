const webpack = require('webpack')
const path = require('path')
module.exports = {
    mode: 'production',
    entry: {
        react: [
            'react',
            'react-dom'
        ]
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name]_dll.js',
        library: '[name]_dll'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_dll',
            path: path.join(__dirname, '../dist/manifest.json')
        })
    ]
}