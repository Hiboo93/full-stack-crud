import express from "express";
import { router } from "./routes/clientRoute.js";
import cors from "cors";


const app = express();
const port = 3000;

app.use(cors());
app.use("/", router);

app.use((req, res) => {
  res.status(404).send("Page non trouvé");
})


app.listen(port, () => {
  console.log("Server running on port :" + port );
})