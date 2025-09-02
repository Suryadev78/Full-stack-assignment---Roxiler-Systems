import express from "express";
import cors from "cors";
import mainRouter from "./routes/mainRouter.js";
// import { Router } from "express";
// import 

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1",mainRouter);







app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})