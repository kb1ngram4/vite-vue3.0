// 监听主线程消息
self.onmessage = (event) => {
  console.log('worker', event.data)
  const { type, data } = event.data
  
  switch (type) {
    case 'calculate':
      // 耗时计算示例
      const result = heavyCalculation(data)
      self.postMessage({ type: 'calculate_result', data: result })
      break
      
    case 'sort':
      // 大数据排序示例
      const sorted = data.sort((a: number, b: number) => a - b)
      self.postMessage({ type: 'sort_result', data: sorted })
      break
      
    default:
      break
  }
}

// 模拟耗时计算
function heavyCalculation(num: number): number {
  let result = 0
  for (let i = 0; i < num; i++) {
    result += Math.sqrt(i)
  }
  return result
}

// 防止TS报错
export {} 