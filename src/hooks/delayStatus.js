import { useState, useEffect } from "react";

export const useDelayStatus = props => {
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(props);
    }, 1000);

    return () => clearTimeout(delay);
  });

  return loading;
};
