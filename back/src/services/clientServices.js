import { query } from "../db.js";


export const getAllClients = async () => { 
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

export const createClient = async (clientData) => { 
  try {
    const { name, email, job, rate, isactive } = clientData;
    const { rows } = await query(
      'INSERT INTO client_tb (name, email, job, rate, isactive) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, email, job, rate, isactive]
    );

    console.log("Fetched clients:", rows);
    return rows[0];
  } catch (error) {
    console.error("Error in getClients:", error);
    throw error; // Rejeter l'erreur pour le gestionnaire dans le contrôleur
  }
 };

export const updateClient = async (clientId, clientData) => { 
  try {
    const { name, email, job, rate, isactive } = clientData;
    const { rows } = await query(
      'UPDATE client_tb SET name = $1, email = $2, job = $3, rate = $4, isactive = $5 WHERE id = $6 RETURNING *', [name, email, job, rate, isactive, clientId]
    );
    console.log("Fetched clients:", rows);
    return rows[0];
  } catch (error) {
    console.error("Error in getClients:", error);
    throw error; // Rejeter l'erreur pour le gestionnaire dans le contrôleur
  }
 };

 export const deleteClient = async (clientId) => {
  const { rowCount } = await query('DELETE FROM client_tb WHERE id = $1', [clientId]);
  return rowCount > 0;
 };