import { useState, useEffect } from "react";
import { TokenData } from "../types/types";

const useTokenExplorer = () => {
  const [data, setData] = useState<TokenData[] | null>(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://cloutponder.onrender.com/token-explorer"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenData();
  }, []);

  return { data, loading, error };
};

export default useTokenExplorer;
