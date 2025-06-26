import { useReadContract, useSendTransaction, useWriteContract } from "wagmi";
import { CONTRACTS, PAIR, TOKEN } from "../constants";
import { Address, parseEther } from "viem";

export const useWriteBuy = () => {
    const { data: hash, error, sendTransaction } = useSendTransaction();

    const Buy = (pairAddress: `0x${string}` | undefined, amount: string) => {
        return sendTransaction({
            to: pairAddress,
            value: parseEther(amount),
        });
    };
    return { hash, Buy, error };
};

export const useWriteSell = () => {
    const { data: hash, error, writeContractAsync } = useWriteContract();

    const Approve = async (tokenAddress: `0x${string}`, spender: `0x${string}` | undefined, amount: string) => {
        const bigintAmount = BigInt(Number(amount) * 1e18)
        return await writeContractAsync({
            address: tokenAddress,
            abi: TOKEN,
            functionName: "approve",
            args: [
                spender,
                bigintAmount
            ],
        });
    }

    const Sell = async (pairAddress: Address, amount: string) => {
        const bigintAmount = BigInt(Number(amount) * 1e18)

        return await writeContractAsync({
            address: pairAddress,
            abi: PAIR,
            functionName: "sell",
            args: [bigintAmount, 1],
        });
    };
    return { hash, Approve, Sell, error };
};


export const useGetAllowance = (address: `0x${string}` | undefined, owner: `0x${string}` | undefined, spender: `0x${string}` | undefined) => {
    const { data: allowance } = useReadContract({
        address: address,
        abi: TOKEN,
        functionName: "allowance",
        args: [owner, spender]
    });

    return Number(allowance);
};
