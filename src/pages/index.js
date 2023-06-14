import { Box, Button, Input, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useRef } from 'react';
import UserData from "@/components/UserData";
import TagChart from "@/components/TagChart";
import RatingsChart from "@/components/RatingsChart";

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
  },

})

export default function Home() {
  const classes = useStyles();

  const [userData, setUserData] = useState(null);
  const [userProblems, setUserProblems] = useState(null);
  const [userRatings, setUserRatings] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const inputUserName = useRef('');

  async function sendReq() {
    let user = inputUserName.current.value;
    inputUserName.current.value = '';
    
    await fetch(`${process.env.NEXT_PUBLIC_URL}user.info?handles=${user}`)
      .then(response => {
        if (response.status == 200) {
          setErrorMessage(null);
          return response.json();
        }
        setErrorMessage(`Username "${user}" not found`);
        return null;
      })
      .then(data => {
        if (data) return data.result[0];
        return null;
      })
      .then(data => {
        setUserData(data);
      });

    await fetch(`${process.env.NEXT_PUBLIC_URL}user.status?handle=${user}`)
      .then(response => {
        if (response.status == 200) return response.json();
        return null;
      })
      .then(data => {
        if (data) return data.result;
        return null;
      })
      .then(problems => {
        setUserProblems(problems);
      });

    await fetch(`${process.env.NEXT_PUBLIC_URL}user.rating?handle=${user}`)
      .then(response => {
        if (response.status == 200) return response.json();
        return null;
      })
      .then(data => {
        if (data) return data.result;
        return null;
      })
      .then(ratings => {
        console.log(ratings);
        setUserRatings(ratings);
      });
  }

  return (
    <>
      <Box className={classes.container}>
        <Input className={classes.userInput} inputRef={inputUserName} placeholder="Enter username"/>
        <Button onClick={sendReq}>Search</Button>
        {errorMessage && <Typography variant="h6">{errorMessage}</Typography>}
      </Box>
      {userData && <UserData userData={userData} />}
      {userProblems && <TagChart userProblems={userProblems}/>}
      {userRatings && userData && <RatingsChart userRatings={userRatings} name={`${userData.firstName} ${userData.lastName}`}/>}
    </>
  )
}