module.exports = {
    entry: __dirname + "/public/js/src/app.js",
    output: {
        path: __dirname + '/public/js',
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [
                    /node_modules/
                ]
            }
        ]
    }
}