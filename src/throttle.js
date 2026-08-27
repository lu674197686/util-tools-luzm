/**
 * 节流函数（多种实现方式）
 * @param {Function} fn - 需要节流的函数
 * @param {number} interval - 时间间隔（毫秒）
 * @param {Object} options - 配置选项
 * @param {string} options.trailing - 是否在最后一次调用后执行
 * @param {string} options.leading - 是否在第一次调用时立即执行
 * @returns {Function} 节流处理后的函数
 */
 function throttle(fn, interval = 300, options = {}) {
  const { leading = true, trailing = true } = options;

  let timer = null;
  let lastArgs = null;
  let lastContext = null;
  let lastCallTime = 0;
  let result = null;

  // 执行函数
  function invokeFunc(time) {
    const args = lastArgs;
    const context = lastContext;
    lastArgs = null;
    lastContext = null;
    lastCallTime = time;
    result = fn.apply(context, args);
    return result;
  }

  // 延迟执行（尾部调用）
  function startTrailingTimer(time) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      const timeSinceLastCall = Date.now() - lastCallTime;
      // 如果最后一次调用和上次执行时间差大于间隔，执行
      if (trailing && lastArgs && timeSinceLastCall >= interval) {
        invokeFunc(Date.now());
      }
    }, Math.max(interval - (time - lastCallTime), 0));
  }

  function throttled(...args) {
    const time = Date.now();
    const isInvoking = leading && lastCallTime === 0;
    const timeSinceLastCall = time - lastCallTime;

    // 保存参数
    lastArgs = args;
    lastContext = this;

    // 如果是首次调用且 leading 为 true
    if (isInvoking) {
      return invokeFunc(time);
    }

    // 如果已经过了间隔时间
    if (timeSinceLastCall >= interval) {
      // 清除尾部定时器
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      return invokeFunc(time);
    }

    // 如果还没到间隔时间，设置尾部调用
    if (trailing && !timer) {
      startTrailingTimer(time);
    }

    return result;
  }

  // 取消功能
  throttled.cancel = function() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    lastArgs = null;
    lastContext = null;
    lastCallTime = 0;
  };

  return throttled;
}

export default throttle;
