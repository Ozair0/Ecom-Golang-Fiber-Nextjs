import "../styles/globals.css";
import Base from "../components/layout/base";
import { persistor, store } from "../store/store";
import { Provider, useDispatch } from "react-redux";
import { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import Cart from "../components/cart";
import { useEffect } from "react";
import { showCart } from "../store/toggleCart";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    store.dispatch(showCart(false));
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Base>
          <Cart />
          <Component {...pageProps} />
        </Base>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
