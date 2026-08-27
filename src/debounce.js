/**
 * 防抖函数
 * @param {Function} fn - 需要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @param {Object} options - 配置选项
 * @param {boolean} options.immediate - 是否立即执行
 * @param {boolean} options.maxWait - 最大等待时间（类似节流效果）
 * @returns {Function} 防抖处理后的函数
 */
 function debounce(fn, delay = 300, options = {}) {
  const { immediate = false, maxWait } = options;

  let timer = null;
  let maxTimer = null;
  let lastCallTime = 0;
  let lastInvokeTime = 0;
  let result = null;

  // 判断是否应该执行
  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    // 首次调用 或 超过延迟时间 或 超过最大等待时间
    return (
      lastCallTime === 0 ||
      timeSinceLastCall >= delay ||
      (maxWait && timeSinceLastInvoke >= maxWait)
    );
  }

  // 执行函数
  function invokeFunc(time) {
    lastInvokeTime = time;
    result = fn.apply(this, arguments);
    return result;
  }

  // 清除定时器
  function clearTimers() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (maxTimer) {
      clearTimeout(maxTimer);
      maxTimer = null;
    }
  }

  // 延迟执行
  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    // 保存上下文和参数
    const context = this;

    // 更新最后调用时间
    lastCallTime = time;

    // 如果当前应该执行
    if (isInvoking) {
      // 如果是首次调用且 immediate 为 true，立即执行
      if (immediate && lastInvokeTime === 0) {
        invokeFunc.call(context, ...args);
        return result;
      }

      // 清除之前的定时器
      clearTimers();

      // 设置执行定时器
      timer = setTimeout(() => {
        timer = null;
        invokeFunc.call(context, ...args);
      }, delay);

      // 设置最大等待定时器
      if (maxWait) {
        maxTimer = setTimeout(() => {
          maxTimer = null;
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          invokeFunc.call(context, ...args);
        }, maxWait);
      }

      return result;
    }

    // 如果不执行，重置定时器
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      invokeFunc.call(context, ...args);
    }, delay);

    return result;
  }

  // 取消功能
  debounced.cancel = function() {
    clearTimers();
    lastCallTime = 0;
    lastInvokeTime = 0;
  };

  // 立即执行功能
  debounced.flush = function() {
    if (timer) {
      const context = this;
      invokeFunc.call(context);
      clearTimers();
    }
  };

  return debounced;
}

export default debounce;
