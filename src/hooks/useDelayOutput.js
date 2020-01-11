import { useState, useEffect } from "react";

const useDelayOutput = (value, delay) => {
  const [delayedValue, setDelayedValue] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDelayedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  });

  return delayedValue;
};

export default useDelayOutput;
