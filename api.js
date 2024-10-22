const express = require("express");
const db = require("./db/transactions.json");
const user = require("./db/user.json");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();

const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get("/health-check", (_, res) => {
  return res.sendStatus(200);
});

app.post("/auth", (req, res) => {
  const { cpf, password } = req.body;

  if (cpf === user.cpf && password === user.password)
    return res.status(200).json({
      token: user.token,
    });

  return res.sendStatus(401);
});

app.get("/list", (req, res) => {
  const token = req.headers.token;

  if (!token || token !== user.token) return res.sendStatus(401);

  return res.json(db);
});

app.listen(port, () => {
  console.log(`[api] running on port \`${port}\``);
});