const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");
const { verifyToken } = require("./middleware/auth.middleware");

const app = express();
connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/masters", require("./routes/master.routes"));
app.use("/api/rooms", require("./routes/room.routes"));
app.use("/api/contracts", require("./routes/contract.routes"));

app.get("/", (req, res) => {
  res.send("Server running and connected to PostgreSQL (TypeORM)");
});

module.exports = app;
