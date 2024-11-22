import express from "express";
import * as clientController from "../controllers/clientController.js";

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Hello World");
// })

router.get("/clients", clientController.getAllClients);
router.post("/clients", clientController.createClient);
router.put("/clients/:id", clientController.updateClient);
router.delete("/clients/:id", clientController.deleteClient);


export default router;