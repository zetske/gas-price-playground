import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { holesky } from "viem/chains";
import { useEstimateFeesPerGas, useGasPrice } from "wagmi";
import { useApprove, useApproveGasCost } from "../web3/hooks";
import { formatUnits } from "viem";
import { codeString, codeString2, codeString3, codeString4 } from "./home/content";

const Home: NextPage = () => {
  const { data: gasPrice, refetch } = useGasPrice({
    chainId: holesky.id,
  });

  const { data: gasPriceOnMainnet } = useGasPrice();

  const { data } = useEstimateFeesPerGas({
    chainId: holesky.id,
  });

  const approve = useApprove();
  const approveGas = useApproveGasCost();

  if (!gasPrice || !approveGas || !data || !gasPriceOnMainnet) {
    return <div className={styles.main}>Loading...</div>;
  }

  const approveFee = formatUnits(approveGas * gasPrice, 18);

  const handleApprove = async () => {
    try {
      const tx = await approve();
      console.log(tx);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(approveGas);

  return (
    <div className={styles.container}>
      <Head>
        <title>Gas Calculation</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main className={styles.main}>
        <h2
          style={{
            position: "absolute",
            top: "0",
          }}
        >
          Understanding Gas Calculation
        </h2>
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "1rem",
            justifyContent: "left",
          }}
        >
          <div
            style={{
              display: "grid",
            }}
          >
            <pre>
              <code>{codeString}</code>
            </pre>
            <pre>
              <code>{codeString2}</code>
            </pre>
            <pre>
              <code>{codeString3}</code>
            </pre>
          </div>
          <div
            style={{
              display: "grid",
            }}
          >
            <div>
              <ConnectButton />
              <div
                style={{
                  display: "grid",
                  gap: "1rem",
                  gridTemplateColumns: "1fr 1fr",
                }}
              >
                <div className={styles.grid}>
                  <h2>Current Gas Price</h2>
                  <p>mainnet: {formatUnits(gasPriceOnMainnet, 9)}</p>
                  <p>holesky: {formatUnits(gasPrice, 9)} </p>
                  <button onClick={() => refetch()}>Refresh</button>
                </div>

                <div className={styles.grid}>
                  <h2>Approve spend of 1 OMNI</h2>
                  <p>
                    Transaction cost will be ~
                    {parseFloat(approveFee).toFixed(8)} ETH
                  </p>
                  <button onClick={handleApprove}>Approve</button>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "100%",
              }}
              className={styles.grid}
            >
              <h2>encodeFunctionData() from viem</h2>
              <p>
                Encodes the function name and parameters into an ABI encoded
                value (4 byte selector & arguments).
              </p>
              <p>
                If your function requires argument(s), you can pass them through
                with the args attribute. TypeScript types for args will be
                inferred from the function name & ABI, to guard you from
                inserting the wrong values.
              </p>
              <p>
                The result is a hexadecimal string (often referred to as the
                data field) that can be sent in a transaction to the contract.
              </p>
            </div>
            <pre>
              <code>{codeString4}</code>
            </pre>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>Made with ❤️ by Anzette</footer>
    </div>
  );
};

export default Home;
