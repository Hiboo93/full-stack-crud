import * as clientServices from "../services/clientServices.js";

export const getAllClients = async (req, res) => {
  try {
    const clients = await clientServices.getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const createClient = async (req, res) => {
  try {
    const clientData = req.body;
    const newClient = await clientServices.createClient(clientData)
    res.status(200).json(newClient);
  } catch (error) {
    console.error("Error adding client:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const updateClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const clientData = req.body;
    const updatedClient = await clientServices.updateClient(clientId, clientData);
    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" })
    }
    res.status(200).json(updatedClient);
    // const newClient = await clientServices.createClient(clientData)
    
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const deleted = await clientServices.deleteClient(clientId);
    if (!deleted) {
      return res.status(404).json({ message: "Client not found" })
    }
    res.status(200).send();
    // const newClient = await clientServices.createClient(clientData)
    
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}