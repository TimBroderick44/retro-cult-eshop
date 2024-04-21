import admin from "firebase-admin";
import serviceAccount from "../../serviceKey.json" assert { type: "json" };
import fs from "fs";

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Fetch the collection
db.collection("playstation-games")
    .get()
    .then((snapshot) => {
        const data = []; // Use an empty array to store the data
        snapshot.forEach((doc) => {
            // Push each document's data as an object into the array
            data.push({
                id: doc.id, 
                ...doc.data(), 
            });
        });
        // Write the array into a JSON file
        fs.writeFileSync("FirestoreData.json", JSON.stringify(data, null, 2));
        console.log("Data has been written to JSON file");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
