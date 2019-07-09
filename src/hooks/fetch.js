import { useState, useEffect } from "react";

const useFetch = (url, reqHeaders) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUrl() {
    const res = await fetch(url, reqHeaders);
    if (!res.ok) {
      throw new Error(res.status);
    }
    const json = await res.json();

    setData(json.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [data, loading];
};

export default useFetch;
