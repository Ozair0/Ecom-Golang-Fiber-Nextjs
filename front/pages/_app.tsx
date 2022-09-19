import "../styles/globals.css";
import Base from "../components/layout/base";
import { persistor, store } from "../store/store";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }: AppProps) {
  // const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Base>
          <Component {...pageProps} />
        </Base>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
