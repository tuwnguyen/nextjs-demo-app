import TopNav from "../components/TopNav";
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext, AppContextProvider } from "lib/context";
import { ThemeProvider } from "styled-components";
import { useContext, useState } from "react";
import { lightTheme, darkTheme, GlobalStyles } from "utils/themeConfig";
function MyApp({ Component, pageProps }: AppProps) {
  const { dataAppContext, setDataAppContext } = useContext(AppContext);

  const getLayout = (Component as any).getLayout || ((page: any) => page);
  return (
    <AppContextProvider>
      {getLayout(
        <>
          <ThemeProvider
            theme={dataAppContext.theme == "light" ? lightTheme : darkTheme}
          >
            <GlobalStyles />
            <ToastContainer position="top-center" />
            <TopNav />
            <Component {...pageProps} />
          </ThemeProvider>
        </>
      )}
    </AppContextProvider>
  );
}

export default MyApp;
