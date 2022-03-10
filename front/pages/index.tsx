import styles from "../styles/Home.module.css";
import { Context } from "react";
import Image from "next/image";
import axios from "axios";

interface Props {
  status: string;
}

const people = [
  {
    name: "Calvin Hawkins",
    email: "calvin.hawkins@example.com",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Kristen Ramos",
    email: "kristen.ramos@example.com",
    image:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Ted Fox",
    email: "ted.fox@example.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];
const Home = (props: Props) => {
  return (
    <div className={styles.container}>
      <h1 className="text-3xl underline">Welcome</h1>
      <p>Status: {props.status}</p>
      <form className="flex items-center space-x-6">
        <div className="shrink-0">
          <Image
            className="h-16 w-16 object-cover rounded-full"
            width={100}
            height={100}
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
            alt="Current profile photo"
          />
        </div>
        <label className="block">
          <span className="sr-only">Choose profile photo</span>
          <input
            type="file"
            className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
          />
        </label>
      </form>
    </div>
  );
};

export async function getServerSideProps(context: Context<any>) {
  let status: string = "";
  await axios
    .get("http://localhost:3000/api/status")
    .then((res) => {
      status = res.data.message;
    })
    .catch((error) => {
      status = "Server Down!";
    });
  return {
    props: { status }, // will be passed to the page component as props
  };
}

export default Home;
