export const codeString = `
    import { encodeFunctionData, parseUnits } from "viem";
    import { useEstimateGas, useGasPrice } from "wagmi";

    export const useApproveGasCost = () => {
    const encodedApproveData = encodeFunctionData({
        abi: TokenABI, // note here that is uses token abi
        functionName: "approve",

        // contract address wanting to spend token and the amount to approve
        args: ["0x0000...", parseUnits("1", 18)],
    });

    const { data: approveGas } = useEstimateGas({
        to: "0xD036C60f46FF51dd7Fbf6a819b5B171c8A076b07", // token address
        account: userAddress,
        chainId: holesky.id,
        data: encodedApproveData, // hashstring of the function call
    });

    return approveGas; // eg. 46666n

    };
  `;

  export const codeString2 = `
   import { useGasPrice } from "wagmi";

   const { data: gasPrice, refetch } = useGasPrice({
        chainId: holesky.id,
   });
    `;

  export const codeString3 = `
    // this is what we see in Metamask
    const approveFee = formatUnits(approveGas * gasPrice, 18);

    // when working with a user's MAX amount, you can add a small 
    // buffer to ensure the transaction goes through
    const buffer = parseUnits("0.01", 18);
    const maxFee = gasCost + buffer + amount
  `;

  export const codeString4 = `
    import { encodeFunctionData } from 'viem'
    
    const data = encodeFunctionData({
        abi: ABI, // The contract's ABI (Application Binary Interface)
        functionName: 'name', // The function name you're calling
        args: [arg1, arg2], // Arguments that you are passing to the function
    })
  `;