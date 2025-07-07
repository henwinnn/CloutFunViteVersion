import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const fetchTokenExplorer = async () => {
  const res = await fetch("https://cloutponder.onrender.com/token-explorer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
  query MyQuery {
  tokenPrices {
    items {
      blockNumber
      description
      ethAmount
      id
      initialSupply
      liquidity
      marketCap
      name
      pair
      symbol
      timestamp
      token
      tokenPrice
    }
  }
}
`,
    }),
  });

  const { data } = await res.json();

  return { tokensMap: data.tokenPrices.items };
};

export const useTokenExplorerQuery = () => {
  return useQuery({
    queryKey: ["tokenPrices"],
    queryFn: fetchTokenExplorer,
    refetchInterval: 10000, // Refetch every 10 seconds
  });
};
