module.exports = {
    devServer: {
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://api.bossreport.net/api',
          ws: true,
          pathRewrite: {
            '^/api': '/'
          }
        }
      }
    }
  };
  