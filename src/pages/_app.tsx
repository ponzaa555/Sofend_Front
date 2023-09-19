import { AppProps } from "next/app";
import { type AppType } from "next/dist/shared/lib/utils";
import "~/styles/globals.css";
import { SessionProvider } from "next-auth/react";


const MyApp: AppType = ({ Component, pageProps }:AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>);
};

export default MyApp;
