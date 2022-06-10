import TopNav from "../components/TopNav";
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContextProvider } from "lib/context";
import { SSRProvider } from "react-bootstrap";
function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as any).getLayout || ((page: any) => page);
  return (
    <SSRProvider>
      <AppContextProvider>
        {getLayout(
          <>
            <ToastContainer position="top-center" />
            <TopNav />
            <Component {...pageProps} />
          </>
        )}
      </AppContextProvider>
    </SSRProvider>
  );
}

export default MyApp;
