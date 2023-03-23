
import { Grid, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    gridItem: {
        textAlign: "center",
        border: "1px solid black"
    }
});

export default function UserDetailRow(props) {
    const classes = useStyles();
    return (
        <>
            <Grid item xs={4} className={classes.gridItem}>
                <Typography variant="h6">{props.property}</Typography>
            </Grid>
            <Grid item xs={8} className={classes.gridItem}>
                <Typography variant="h6">{props.value}</Typography>
            </Grid>
        </>
    );
}