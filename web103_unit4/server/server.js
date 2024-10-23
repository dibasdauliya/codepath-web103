import express from "express";
import path from "path";
import favicon from "serve-favicon";
import dotenv from "dotenv";
import cors from "cors";

// import the router from your routes file
import carRouter from "./routes/carRoutes.js";
import exteriorRouter from "./routes/exteriorRoutes.js";
import roofRouter from "./routes/roofRoutes.js";
import wheelsRouter from "./routes/wheelsRoutes.js";
import interiorRouter from "./routes/interiorRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(favicon(path.resolve("../", "client", "public", "lightning.png")));
} else if (process.env.NODE_ENV === "production") {
  app.use(favicon(path.resolve("public", "lightning.png")));
  app.use(express.static("public"));
}

// specify the api path for the server to use
app.use("/api/cars", carRouter);
app.use("/api/exteriors", exteriorRouter);
app.use("/api/roofs", roofRouter);
app.use("/api/wheels", wheelsRouter);
app.use("/api/interiors", interiorRouter);

if (process.env.NODE_ENV === "production") {
  app.get("/*", (_, res) => res.sendFile(path.resolve("public", "index.html")));
}

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
