import { useWriteContract } from "wagmi";
import { CONTRACTS, TOKEN_FACTORY } from "../constants";
import { parseEther } from "viem";


export const useWriteCreateToken = () => {
    const { data: hash, error, writeContractAsync } = useWriteContract();
    const CreateToken = (name: string, symbol: string, description: string, initialSupply: BigInt, pairAmount: BigInt, ethAmount: BigInt, creator: string) => {
        return writeContractAsync({
            address: CONTRACTS.TOKEN_FACTORY,
            abi: TOKEN_FACTORY,
            functionName: "createTokenWithEthPair",
            args: [name, symbol, description, initialSupply, pairAmount, ethAmount, creator],
            value: parseEther('0.01'),
        });
    }
    return { hash, CreateToken, error };
};