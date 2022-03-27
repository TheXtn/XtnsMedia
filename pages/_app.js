import Layout from '../Components/layout/layout'
import '../styles/globals.css';
import {Provider} from "next-auth/client";
import NProgress from 'nprogress'
import React from "react";
import Router from 'next/router'
import LinearIndeterminate from "../Components/ui/loading";
import { Skeleton } from 'antd';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {

      setLoading(true);
    };
    const end = () => {

      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
      <Provider session={pageProps.session}>
           <Layout>
       {loading ? (
       <LinearIndeterminate/>
      ) : (
        <Component {...pageProps} />
      )}
    </Layout>
      </Provider>

  );
}

export default MyApp;
