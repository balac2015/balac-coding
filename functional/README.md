
## functions 函数式编程

- throttle.js 节流

Throttle 节流函数详解：

1. 浏览器 DOM 事件里，事件随用户的操作不间断触发。如：重新调整浏览器窗口大小（resize），浏览器页面滚动（scroll），鼠标移动（mousemove）。

2. 会有性能损失，UI 反映慢、浏览器卡死等。	所以通常来会给相应事件添加延迟执行的逻辑。