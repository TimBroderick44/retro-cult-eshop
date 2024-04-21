import firebaseAdmin from "firebase-admin";
import serviceAccount from "../../serviceKey.json" assert { type: "json" };

// Initialize Firebase Admin with service account
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

const db = firebaseAdmin.firestore();

async function addQuantitiesAndFavoriteFlag() {
    try {
        const gamesRef = db.collection("playstation-games");
        const snapshot = await gamesRef.get();

        const updates = snapshot.docs.map((doc) => {
            // This function will generate random quantities.
            const quantities = [
                {
                    type: "loose",
                    amount: Math.floor(Math.random() * (3 - 2 + 1)) + 2,
                },
                {
                    type: "CIB",
                    amount: Math.floor(Math.random() * (3 - 1 + 1)) + 1,
                },
                {
                    type: "new",
                    amount: Math.floor(Math.random() * (1 - 0 + 1)) + 0,
                },
            ];
            const updatedData = {
                quantity: quantities,
                favourite: false, 
            };
            return doc.ref.update(updatedData);
        });

        await Promise.all(updates);
        console.log(
            "All games have been updated with quantities and the favourite flag."
        );
    } catch (error) {
        console.error("Error updating documents", error);
    }
}

addQuantitiesAndFavoriteFlag();

