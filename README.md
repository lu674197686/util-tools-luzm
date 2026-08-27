# utils-debounce-throttle

防抖和节流工具函数库

## 安装

\`\`\`bash
npm install @yourusername/utils-debounce-throttle
\`\`\`

## 使用

### 防抖

\`\`\`javascript
import { debounce } from '@yourusername/utils-debounce-throttle';

const handleInput = debounce((value) => {
  console.log('输入值:', value);
}, 300);

// 使用
handleInput('hello');
\`\`\`

### 节流

\`\`\`javascript
import { throttle } from '@yourusername/utils-debounce-throttle';

const handleScroll = throttle(() => {
  console.log('滚动位置:', window.scrollY);
}, 200);

window.addEventListener('scroll', handleScroll);
\`\`\`

## API

### debounce(fn, delay, options)

- `fn`: 需要防抖的函数
- `delay`: 延迟时间（毫秒），默认 300
- `options`: 配置选项
  - `immediate`: 是否立即执行，默认 false
  - `maxWait`: 最大等待时间

### throttle(fn, interval, options)

- `fn`: 需要节流的函数
- `interval`: 时间间隔（毫秒），默认 300
- `options`: 配置选项
  - `leading`: 是否立即执行，默认 true
  - `trailing`: 是否尾部执行，默认 true

## License

MIT
