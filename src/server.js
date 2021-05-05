import express from "express";

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    return res.send("Not Allowed");
  }
  console.log("Allowed");
  next();
};

const handleHome = (req, res) => {
  //console.log(req);
  //console.log(res);
  return res.send("Hello");
};

const handleLogin = (req, res) => {
  return res.send("Login");
};

const handleProtected = (req, res) => {
  return res.send("Private Page");
};

app.use(logger);
app.use(privateMiddleware);

app.get("/", handleHome);
app.get("/login", handleLogin);
app.get("/protected", handleProtected);

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
