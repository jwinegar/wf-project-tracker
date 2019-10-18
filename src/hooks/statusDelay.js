import { useState, useEffect } from "react";

export const useStatusDelay = props => {
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(props);
    }, 750);

    return () => clearTimeout(delay);
  });

  return loading;
};
