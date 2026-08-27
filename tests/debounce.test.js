import debounce from '../src/debounce.js';

describe('debounce', () => {
  jest.useFakeTimers();

  test('应该在延迟后执行函数', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 1000);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('多次调用只执行最后一次', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 1000);

    debounced('a');
    debounced('b');
    debounced('c');

    jest.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledWith('c');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('immediate 模式立即执行', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 1000, { immediate: true });

    debounced('a');
    expect(fn).toHaveBeenCalledWith('a');

    jest.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('cancel 方法取消执行', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 1000);

    debounced();
    debounced.cancel();

    jest.advanceTimersByTime(1000);
    expect(fn).not.toHaveBeenCalled();
  });
});
