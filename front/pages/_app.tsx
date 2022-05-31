import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Base from "../components/layout/base";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_API;

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Base>
        <Component {...pageProps} />
      </Base>
  )
}

export default MyApp
