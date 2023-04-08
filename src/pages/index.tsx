import { GyameraMainView } from "@/components/GyameraMainView";
import { swrFetcher } from "@/lib/swrFetcher";
import Head from "next/head";
import dynamic from "next/dynamic";

import useSWR from "swr";
import styles from "@/styles/Home.module.css";

const GyazoOAuthLink = dynamic(
  () =>
    import("../components/GyazoOAuthLink").then(
      (module) => module.GyazoOAuthLink
    ),
  {
    ssr: false,
  }
);

export default function Home() {
  const { data: gyazoLoginState } = useSWR("/api/gyazo/me", swrFetcher);

  return (
    <>
      {gyazoLoginState ? (
        <GyameraMainView />
      ) : (
        <>
          <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className={styles.main}>
            <GyazoOAuthLink />
          </main>
        </>
      )}
    </>
  );
}
