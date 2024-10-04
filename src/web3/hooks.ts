import { holesky, sepolia } from "viem/chains";
import OmniABI from "./abi/Omni.json";
import OmniGasABI from "./abi/OmniGasPump.json";
import { encodeFunctionData, parseUnits } from "viem";
import { useEstimateGas, useWriteContract } from "wagmi";
import { useCallback } from "react";

const userAddress = "0xfeEb9546E9501f03aEc345fb4fbC8E255048C67d";

export const useApproveGasCost = () => {
  const encodedApproveData = encodeFunctionData({
    abi: OmniABI, // token abi
    functionName: "approve",
    args: ["0x75D3358d7Df0C6E004aEc4C26c459F211c97cB77", parseUnits("1", 18)], // contract address wanting to spend token
  });

  const { data: approveGas } = useEstimateGas({
    to: "0xD036C60f46FF51dd7Fbf6a819b5B171c8A076b07", // token address
    account: userAddress,
    chainId: holesky.id,
    data: encodedApproveData,
  });

  return approveGas;
};

export const useApprove = () => {
  const { writeContract, data, error } = useWriteContract();
  const approve = useCallback(async () => {
    return writeContract(
      {
        abi: OmniABI,
        address: "0xD036C60f46FF51dd7Fbf6a819b5B171c8A076b07",
        functionName: "approve",
        args: [
          "0x75D3358d7Df0C6E004aEc4C26c459F211c97cB77",
          parseUnits("1", 18),
        ],
        chainId: holesky.id,
      },
      {
        onError() {
          console.log("error");
          console.log(error);
        },
      }
    );
  }, [writeContract]);

  return approve;
};
