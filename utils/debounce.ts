export function debounce(func: Function, wait: number) {
  let timeout: string | number | Timeout | undefined;

  return function () {
    const context: any = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}