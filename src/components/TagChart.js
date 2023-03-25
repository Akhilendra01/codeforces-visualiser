import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import { Box, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    tagChartContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "70%",
        marginInline: "auto",
        marginBlock: "15px"
    },

    pieChartContainer: {
        display: "flex",
        flexDirection: "row",
        width: "25%",
        marginInline: "auto",
        marginBlock: "0px",
        justifyContent: "center",
        alignItems: "center",
        paddingBlock: "20px",
        margrinBlock:"15px"
    },

    "@media(max-width: 800px)":{
        tagChartContainer:{
            width: "100%",

            marginInline:"0"
        },
        pieChartContainer:{
            width: "60%",
            flexDirection:"column"
        }
    }
});

function refineData(data) {
    let res = {};
    for (let problem of data) {
        if (problem.verdict !== "OK") continue;
        for (let tag of problem.problem.tags) {
            if (res[tag]) res[tag]++;
            else res[tag] = 1;
        }
    }
    return res;
}


function getAccuracy(data) {
    let accepted = 0, total = 0;
    for (let problem of data) {
        if (problem.verdict == 'OK') accepted++;
        total++;
    }
    return [accepted, total];
}

export default function TagChart(props) {
    const classes = useStyles();

    const data = props.userProblems;
    const chartData = refineData(data);
    const colors = Object.keys(chartData).map(key => {
        let r = Math.floor(Math.random() * 255) + 1;
        let g = Math.floor(Math.random() * 255) + 1;
        let b = Math.floor(Math.random() * 255) + 1;
        return `rgb(${r}, ${g}, ${b})`;
    });
    const chartInput = {
        labels: Object.keys(chartData),
        datasets: [{
            label: "Solved",
            data: Object.values(chartData),
            backgroundColor: colors
        }]
    }
    const [accepted, total] = getAccuracy(data);
    const accuracy=100*accepted/total;
    const pie = {
        labels: ["Accepted", "Wrong Answer"],
        datasets: [{
            label: "Submissions",
            data: [accepted, total - accepted],
            backgroundColor: ["green", "red"]
        }]
    }
    return (
        <>
            <Box className={classes.tagChartContainer}>
                <Typography variant="h6">Tag Chart</Typography>
                <Bar data={chartInput}/>
            </Box>
            <Box className={classes.pieChartContainer}>
                <Pie data={pie} />
                <Typography variant="h6">Accuracy={accuracy.toPrecision(4)}%</Typography>
            </Box>
        </>
    );
}