const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	// 打包的时候不带map文件
	productionSourceMap:false,
  transpileDependencies: true,
  
  lintOnSave: false,
  
  // 代理跨域
  devServer: {
  	proxy: {
  		'/api': {
  			target: 'http://gmall-h5-api.atguigu.cn',
  			ws: true, //用于支持websocket
  			changeOrigin: true //用于控制请求头的host值
  		},
  
  	}
  }
})
