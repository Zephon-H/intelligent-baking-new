module.exports = {
	publicPath: './',
    devServer: {
        proxy: {
            // '/api': {
            //     target: 'http://127.0.0.1:8080', //对应自己的接口
            //     changeOrigin: true,
            //     ws: true,
            //     pathRewrite: {
            //         '^/api': ''
            //     }
            // },
            // '/api1': {
            //     target: 'http://183.239.241.108:50001', //对应自己的接口
            //     changeOrigin: true,
            //     ws: true,
            //     pathRewrite: {
            //         '/api': '/api1'
            //     }
            // }
        }
    }
}