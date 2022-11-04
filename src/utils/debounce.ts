import Timeout = NodeJS.Timeout;

export function debounce(func: Function, wait: number) {
  let timeout: string | number | Timeout | undefined;

  return () => {
    // @ts-ignore
    const context: Function = this;
    const args = arguments;
    const callbackToRun = () => {
      timeout = undefined;
      func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(callbackToRun, wait);
  };
}
