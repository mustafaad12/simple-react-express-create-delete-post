import express, { Router } from "express";
import postsRouter from "./routes/postsRouter.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", postsRouter);

app.get("/", (req, res) => {
  res.json("hello");
});

app.listen(5000, () => {
  console.log("api is running...");
});
