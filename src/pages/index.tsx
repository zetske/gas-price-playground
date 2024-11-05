import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LuLoader2 } from "react-icons/lu";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { holesky } from "viem/chains";
import { useEstimateFeesPerGas, useGasPrice } from "wagmi";
import { useApprove, useApproveGasCost } from "../web3/hooks";
import { formatUnits } from "viem";
import {
  codeString,
  codeString2,
  codeString3,
  codeString4,
} from "../content/index";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: gasPrice, refetch } = useGasPrice({
    chainId: holesky.id,
  });

  const { data: gasPriceOnMainnet } = useGasPrice();

  const { data } = useEstimateFeesPerGas({
    chainId: holesky.id,
  });

  const approve = useApprove();
  const { approveGas, refetch: refetchApproveGasCost } = useApproveGasCost();

  if (!gasPrice || !approveGas || !data || !gasPriceOnMainnet) {
    return <div className={styles.loading}><LuLoader2 /></div>;
  }

  const approveFee = gasPrice * approveGas;
  const approveFeeInEth = formatUnits(approveFee, 18);

  const handleApprove = async () => {
    try {
      const tx = await approve();
      console.log(tx);
    } catch (error) {
      console.error(error);
    }
  };

  const refetchData = () => {
    refetch();
    refetchApproveGasCost();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Gas Calculation</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main className={styles.main}>
        <h2 className={styles.header}>Understanding Gas Calculation</h2>
        <div className={styles.items}>
          <div className={styles.section}>
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
          <div className={styles.section}>
            <div
              style={{
                marginTop: "13px",
              }}
            >
              <ConnectButton />
            </div>
            <div>
              <div className={styles.right}>
                <div className={styles.grid}>
                  <h2>Current Gas Price</h2>
                  <div>
                    <p>mainnet: {formatUnits(gasPriceOnMainnet, 9)}</p>
                    <p>holesky: {formatUnits(gasPrice, 9)} </p>
                  </div>
                  <button onClick={refetchData}>Refresh</button>
                </div>

                <div className={styles.grid}>
                  <h2>Approve spend of 1 OMNI</h2>
                  <p
                    style={{
                      lineHeight: "1.5",
                    }}
                  >
                    Transaction cost will be:
                    <br></br> ± {parseFloat(approveFeeInEth).toFixed(8)} ETH
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
              <h3>encodeFunctionData() from viem</h3>
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
      <footer className={styles.footer}>
        <Link target="blank" href={'https://github.com/zetske'}>Made with ❤️ by Anzette</Link>
      </footer>
    </div>
  );
};

export default Home;
