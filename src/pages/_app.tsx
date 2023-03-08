import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import style from "@/styles/_app/index.module.sass";
import store from "@/redux";
import Nav from "@/components/commons/nav";
import "@/styles/default/index.sass";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={style.appContainer}>
      <Provider store={store}>
        <div className={style.view}>
          <Nav />
          <div className={style.page}>
            <Component {...pageProps} />
          </div>
        </div>
      </Provider>
    </div>
  );
}
