import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    lineChartContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "70%",
        marginInline: "auto",
        marginBlock: "15px"
    },

    "@media(max-width: 800px)": {
        lineChartContainer: {
            width: "100%",

            marginInline: "0"
        },
    }
});


export default function RatingsChart(props){
    const classes=useStyles();
    const userRatings=props.userRatings;
    let c=0;
    const data={
        labels:userRatings.map(rating=> ++c),
        datasets:[{
            label: props.name,
            data: userRatings.map(rating=> rating.newRating),
            backgroundColor: 'rgb(0, 30, 50)',
            borderColor: 'rgb(0, 122, 204)'
        }]
    };

    return (
        <>
            <Box className={classes.lineChartContainer}>
                <Typography variant="h6">Rating Change Curve</Typography>
                <Line data={data} />
            </Box>  
        </>
    );
}