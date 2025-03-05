import { io } from 'socket.io-client';

// 创建 Socket.IO 实例
const socket = io('http://localhost:4000', {
  reconnection: true, // 允许自动重连
  reconnectionAttempts: 5, // 最大重连次数
  reconnectionDelay: 1000, // 重连延迟
});

// 心跳配置
const HEARTBEAT_INTERVAL = 1000; // 心跳间隔 1 秒
const HEARTBEAT_TIMEOUT = 3000; // 心跳超时 3 秒

let heartbeatTimer = null;
let heartbeatTimeout = null;

// 发送心跳包
function sendHeartbeat() {
  console.log('发送心跳包');
  socket.emit('heartbeat', 'ping');

  // 设置超时检测
  heartbeatTimeout = setTimeout(() => {
    console.error('心跳超时，连接可能已断开');
    socket.disconnect(); // 主动断开连接
  }, HEARTBEAT_TIMEOUT);
}

// 启动心跳
function startHeartbeat() {
  heartbeatTimer = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);
}

// 停止心跳
function stopHeartbeat() {
  clearInterval(heartbeatTimer);
  clearTimeout(heartbeatTimeout);
}

// 监听服务器的心跳响应
socket.on('heartbeat', (data) => {
  // console.log('11111',data);
  
  if (data === 'pong') {
    console.log('收到心跳响应');
    clearTimeout(heartbeatTimeout); // 收到响应后清除超时检测
  }
});

// 监听连接成功事件
socket.on('connect', () => {
  console.log('已连接到服务器');
  startHeartbeat(); // 启动心跳
});

// 监听连接断开事件
socket.on('disconnect', () => {
  console.log('连接已断开');
  stopHeartbeat(); // 停止心跳
});

export default socket