class WebSocketHeartbeat {
  constructor(options) {
    this.url = options.url
    this.pingTimeout = options.pingTimeout || 15000 // 发送心跳包间隔
    this.pongTimeout = options.pongTimeout || 10000 // 等待心跳响应超时
    this.reconnectTimeout = options.reconnectTimeout || 2000 // 断线重连间隔
    this.pingMsg = options.pingMsg || "heartbeat"
    this.repeatLimit = options.repeatLimit || 3 // 重连次数限制
    this.repeatCount = 0
    
    this.ws = null
    this.pingTimeoutId = null
    this.pongTimeoutId = null
    this.messageCallback = null
    this.errorCallback = null
    
    this.init()
  }

  init() {
    try {
      this.ws = new WebSocket(this.url)
      this.ws.onopen = () => {
        this.repeatCount = 0
        this.onopen()
      }
      this.ws.onclose = () => {
        this.onclose()
      }
      this.ws.onmessage = (event) => {
        this.onmessage(event)
      }
      this.ws.onerror = () => {
        this.onerror()
      }
    } catch (error) {
      this.reconnect()
    }
  }

  // 开始心跳检测
  start() {
    this.pingTimeoutId = setTimeout(() => {
      this.ws.send(this.pingMsg)
      this.pongTimeoutId = setTimeout(() => {
        this.ws.close()
      }, this.pongTimeout)
    }, this.pingTimeout)
  }

  // 重置心跳检测
  reset() {
    clearTimeout(this.pingTimeoutId)
    clearTimeout(this.pongTimeoutId)
    this.start()
  }

  // 连接成功
  onopen() {
    this.start()
  }

  // 连接关闭
  onclose() {
    this.reconnect()
  }

  // 接收消息
  onmessage(event) {
    this.reset()
    if(event.data !== this.pingMsg) {
      this.messageCallback && this.messageCallback(event.data)
    }
  }

  // 连接错误
  onerror() {
    this.errorCallback && this.errorCallback()
    this.reconnect()
  }

  // 重新连接
  reconnect() {
    if(this.repeatCount >= this.repeatLimit) return
    
    this.repeatCount++
    setTimeout(() => {
      this.init()
    }, this.reconnectTimeout)
  }

  // 发送消息
  send(message) {
    this.ws.send(message)
  }

  // 监听消息
  onMessage(callback) {
    this.messageCallback = callback
  }

  // 监听错误
  onError(callback) {
    this.errorCallback = callback
  }

  // 关闭连接
  close() {
    this.ws.close()
    clearTimeout(this.pingTimeoutId)
    clearTimeout(this.pongTimeoutId)
  }
}

export default WebSocketHeartbeat 