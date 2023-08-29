/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

import * as admin from "firebase-admin";
import * as express from "express";
admin.initializeApp();

const app = express();

const db = admin.firestore();

app.get("/hello-world", (req, res) => {
  logger.info("Hello logs!", {structuredData: true});
  res.status(200).send("Hello World!");
});


app.get("/productos", (req, res) => {
  db.collection("Productos").get() .then((snapshot) => {
    const productos: object[] = [];
    snapshot.forEach((doc) => {
      productos.push(doc.data());
    });
    res.status(200).send(JSON.stringify(productos));
  }).catch((err) => {
    console.log("Error getting documents", err);
  });
});


exports.api = onRequest(app);
