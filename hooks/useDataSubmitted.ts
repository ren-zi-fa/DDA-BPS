import { useEffect, useState } from "react";

export function useDataSubmitted(url: string) {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const resp = await fetch(url);
    const result = await resp.json();
    setData(result.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    refetch: fetchData,
  };
}
