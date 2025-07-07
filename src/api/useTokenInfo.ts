import { useState, useEffect } from "react";
import { TokenData, TokenInfo } from "../types/types";

//CG-GqhpcCXadMuF2zwJUr5H2XYv

const useTokenInfo = (pair: string) => {
  const [data, setData] = useState<TokenInfo | null>(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://cloutponder.onrender.com/token/${pair}`
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

export default useTokenInfo;
