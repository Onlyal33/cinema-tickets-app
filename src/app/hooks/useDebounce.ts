import debounce from "lodash/debounce";
import { useEffect, useMemo } from "react";

const useDebounce = <Args extends unknown[]>(callback: (...args: Args) => void) => {
  const debouncedCallback = useMemo(() => {
    return debounce(callback, 1000);
  }, [callback]);

  useEffect(() => () => debouncedCallback.cancel(), [debouncedCallback]);

  return debouncedCallback;
};

export default useDebounce;
