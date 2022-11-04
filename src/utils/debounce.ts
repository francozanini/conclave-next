import Timeout = NodeJS.Timeout;

export function debounce(func: Function, wait: number) {
  let timeout: string | number | Timeout | undefined;

  return () => {
    const context: any = this;
    const args = arguments;
    const later = () => {
      timeout = undefined;
      func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
