const express = require("express");
const cors = require("cors");

const certificateRoutes = require("./routes/certificateRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/certificate", certificateRoutes);

app.listen(3000, () => {
    console.log("Server running on port 5000");
});