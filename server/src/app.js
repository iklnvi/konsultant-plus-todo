const express = require("express");
const morgan = require("morgan");
const { createServer } = require("http");
const todoRouter = require("./router/todoRouter");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/getTodo", todoRouter);

const server = createServer(app);

module.exports = server;
