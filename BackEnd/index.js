const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactRoutes = require("./routes/Contact");

require("dotenv").config();
const dbConnect = require("./config/database");
const {cloudinaryConnect} = require("./config/cloudinary");
const cookieParser = require("cookie-parser");

// to entertain frontend using back-end we use cors
const cors = require("cors");

const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;

// database & cloudinary connect 
dbConnect();
cloudinaryConnect();

// middlewares
app.use(express.json());
app.use(cookieParser());

// cors setup middleware
// *** v.v.IMP inorder to entertain the frontend requests
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
)

// file upload middleware
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)


// routes mount
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactRoutes);


// default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your app is up and running successfully...",
    })
})


app.listen(PORT, ()=> {
    console.log(`App is running at ${PORT}`)
});