import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";
const app = express();

app.use(express.json());
app.use("/api/user", router);

app.use("/api/blog", blogRouter);

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://2020BCS0067:divyaLM51@assignment.ad4mnfz.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000);
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/", (req, res, next) => {
  res.send("hello world");
});

// mongodb+srv://2020BCS0067:<password>@assignment.ad4mnfz.mongodb.net/?retryWrites=true&w=majority
