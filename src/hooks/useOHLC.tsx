import { useState, useEffect } from "react";

interface OHLCData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
  timestamp?: number;
}

interface UseOHLCReturn {
  data: OHLCData[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useOHLC = (pairAddress: string): UseOHLCReturn => {
  const [data, setData] = useState<OHLCData[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOHLCData = async () => {
    if (!pairAddress) {
      setError("Pair address is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://cloutponder.onrender.com/tradingview/${pairAddress}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // // Option 1: Transform and store the data
      const transformedData: OHLCData[] = result.data.map((item: any) => ({
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        time: item.time,
      }));

      setData(transformedData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching OHLC data"
      );
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pairAddress) {
      fetchOHLCData();
    }
  }, [pairAddress]);

  const refetch = () => {
    fetchOHLCData();
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
};
