import { Box, Button, Input } from "@mui/material"

import { makeStyles } from "@mui/styles"

import { useState, useRef } from 'react';

import Image from "next/image";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15px"
  },
  userInput: {
    fontSize: "20px"
  }
})

export default function Home() {
  const classes = useStyles();

  const [userData, setUserData] = useState({});
  const [userProblems, setUserProblems] = useState({});
  const inputUserName = useRef('');

  async function sendReq() {
    let user = inputUserName.current.value;
    inputUserName.current.value = '';
    console.log(process.env.NEXT_PUBLIC_URL);

    await fetch(`${process.env.NEXT_PUBLIC_URL}user.info?handles=${user}`)
      .then(response => response.json())
      .then(data => data.result[0])
      .then(data => {
        setUserData(data);
      });
    await fetch(`${process.env.NEXT_PUBLIC_URL}user.status?handle=${user}`)
      .then(async response => await response.json())
      .then(async data => data.result)
      .then(async problems => {
        setUserProblems(problems);
      });
  }

  return (
    <>
      <Box className={classes.container}>
        <Input className={classes.userInput} inputRef={inputUserName} />
        <Button onClick={sendReq}>Search</Button>
      </Box>

      <Image src={userData.titlePhoto} alt="bcd"/>
    </>
  )
}
