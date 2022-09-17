import "../styles/globals.css";
import type { AppProps } from "next/app";
import Base from "../components/layout/base";
import { setCookie } from "cookies-next";

function MyApp({ Component, pageProps }: AppProps) {
  setCookie(
    "jwt",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjM1MjU0NjEsInN1YiI6Ijk4In0.maHf60_-_oAAK4YQgYyZhQdjKAo53GOpr9CFkdlo9K8"
  );
  return (
    <Base>
      <Component {...pageProps} />
    </Base>
  );
}

export default MyApp;
