import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import {Context, useEffect, useState} from "react";
import axios from "axios";

interface Props {
    status: string
}

const Home = (props:Props) => {
  return (
    <div className={styles.container}>
      <h1>Welcome</h1>
        <p>Status: {props.status}</p>
    </div>
  )
}

export async function getServerSideProps(context: Context<any>) {
    let status: string = "";
    await axios.get("http://localhost:3000/api/status").then(res => {
        status = res.data.message;
    }).catch((error) => {
        status = "Server Down!";
    });
    return {
        props: {status}, // will be passed to the page component as props
    }
}

export default Home
