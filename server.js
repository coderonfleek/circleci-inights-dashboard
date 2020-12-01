require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const cors = require('cors');
const axios = require("axios")


app.use(cors())

let port = process.env.PORT || "5000";

const api_v1 = "https://circleci.com/api/v1.1/";
const api_v2 = "https://circleci.com/api/v2/";
//const api_token = "e08b677187020815e12ef5f1c47eeddde0421ed1";

axios.defaults.headers.common['Circle-Token'] = process.env.API_KEY;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get("/getprojects", async (req, res) => {
    //let projects = await axios.get(`${api_v2}project/gh/coderonfleek/node-azure-web-app/pipeline`);
    let projects = await axios.get(`${api_v1}projects`);

    res.send(projects.data);
});

app.get("getpipelines/:project_slug", async (req, res) => {

    const project_slug = req.params.project_slug;

    let pipelines = await axios.get(`${api_v1}projects`);

    res.send(pipelines.data);
})

app.listen(port, () => {
    console.log(`App Running at http://localhost:${port}`);
})