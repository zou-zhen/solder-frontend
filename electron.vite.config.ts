import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
// import mockServer from 'vite-plugin-mock-server'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      vue()
      // mockServer({
      //   logLevel: 'info',
      //   urlPrefixes: ['/api/'],
      //   mockRootDir: path.relative(__dirname, './src/renderer/src/api/mock'), // 模拟数据文件所放置的目录
      //   mockJsSuffix: '.mock.js', // js模拟数据文件的后缀
      //   mockTsSuffix: '.mock.ts', // js模拟数据文件的后缀
      //   noHandlerResponse404: true
      // })
    ],
    server: {
      open: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:5000', //
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/stream': {
          target: 'http://127.0.0.1:5000', // 目标地址
          changeOrigin: true, // 伪造请求头中的 Origin
          ws: false, // 禁用 WebSocket 代理，因为这是 SSE
          rewrite: (path) => path.replace(/^\/stream/, '/stream'), // 保留路径
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Connection', 'keep-alive') // 确保代理连接保持活跃
            })
            proxy.on('error', (err) => {
              console.error('Proxy error:', err)
            })
          }
        },
        '/videostream': {
          target: 'http://127.0.0.1:5500', // 后端服务器地址
          changeOrigin: true, // 是否修改源头为目标地址
          rewrite: (path) => path.replace(/^\/videostream/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Connection', 'keep-alive') // 确保代理连接保持活跃
            })
            proxy.on('error', (err) => {
              console.error('Proxy error:', err)
            })
          }
        },
        '/offer': {
          target: 'http://127.0.0.1:8765', // 后端服务器地址
          changeOrigin: true, // 是否修改源头为目标地址
          rewrite: (path) => path.replace(/^\/offer/, 'offer'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Connection', 'keep-alive') // 确保代理连接保持活跃
            })
            proxy.on('error', (err) => {
              console.error('Proxy error:', err)
            })
          }
        }
      }
    }
  }
})
