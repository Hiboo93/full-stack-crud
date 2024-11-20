import * as clientServices from "../services/clientServices.js";

export const getClients = async (req, res) => {
  try {
    const clients = await clientServices.getClients();
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}