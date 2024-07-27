import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import multer from "multer";
import helmet from "helmet";
import path from "path";
import morgan from "morgan";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { verifyToken } from "./middleware/auth.js";
import postRoutes from "./routes/post.js";
import { createPost } from "./controllers/posts.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

// configurations
// Configure fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure express
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Configure cors
app.use(cors());

// Configure dotenv
dotenv.config();

app.use("/assets", express.static(path.join(__dirname, "public/assets")));
//multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Configure helmet
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Configure morgan
app.use(morgan("common"));

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

//mongoose setup
const port = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL || "no_url ", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      // User.insertMany(users);
      // Post.insertMany(posts);
      console.log(`listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("no connection", err);
  });
