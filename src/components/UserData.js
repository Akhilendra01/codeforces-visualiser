import { Box, Grid } from "@mui/material";
import UserDetailRow from "./UserDetailRow";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    userDetailsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: "50px"
    },

    grid: {
        width: "50%",
        margin: "20px",
    },

    "@media(max-width: 800px)": {
        userDetailsContainer: {
            flexDirection: "column",
            marginInline: "5px"
        },
        grid: {
            width: "100%",
            fontSize: "12px",
            margin: "0",
            marginBlock: "20px",
        }
    }
});

export default function UserData(props) {
    const userData=props.userData;
    const classes = useStyles();
    return (
        <>
            {userData && <Box className={classes.userDetailsContainer}>
                {userData.titlePhoto && <img src={userData.titlePhoto} alt="profile photo" />}
                <Grid container className={classes.grid}>
                    <UserDetailRow property={`Handle`} value={userData.handle} />
                    <UserDetailRow property={`Name`} value={`${userData.firstName} ${userData.lastName == undefined ? '' : userData.lastName}`} />
                    <UserDetailRow property={`Organization`} value={userData.organization} />
                    <UserDetailRow property={`Rating`} value={userData.rating} />
                    <UserDetailRow property={`Rank`} value={userData.rank} />
                    <UserDetailRow property={`Max Rating`} value={userData.maxRating} />
                    <UserDetailRow property={`Max Rank`} value={userData.maxRank} />
                    <UserDetailRow property={`Friend Count`} value={userData.friendOfCount} />
                    <UserDetailRow property={`Location`} value={`${userData.city}, ${userData.country}`} />
                </Grid>
            </Box>}
                        
        </>
    );
}