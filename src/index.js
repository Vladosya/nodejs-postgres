const express = require("express");
const userRouter = require("./routes/user.router.js");
const postRouter = require("./routes/post.router.js");

require("dotenv/config");

const app = express();

const PORT = process.env.PORT ? process.env.PORT : 8080;

app.use(express.json());
app.use("/api-v1", userRouter);
app.use("/api-v1", postRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

// http://localhost:3000/ - home address
// select * from post; - select нужен, чтобы получить все поля