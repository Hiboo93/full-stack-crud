import { query } from "../db.js";


export const getClients = async () => { 
  try {
    const result = await query("SELECT * FROM client_tb");
    const { rows } = result;
    console.log("Fetched clients:", rows);
    return rows;
  } catch (error) {
    console.error("Error in getClients:", error);
    throw error; // Rejeter l'erreur pour le gestionnaire dans le contrôleur
  }
 };