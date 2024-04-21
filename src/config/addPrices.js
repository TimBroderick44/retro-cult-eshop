import firebaseAdmin from "firebase-admin";
import serviceAccount from "../../serviceKey.json" assert { type: "json" };

// Initialize Firebase Admin with service account
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

const db = firebaseAdmin.firestore();

function getRandomPrice() {
    // Define the probability for each range
    const ranges = [
        { min: 50, max: 99, probability: 5 },
        { min: 100, max: 200, probability: 80 },
        { min: 201, max: 300, probability: 10 },
        { min: 301, max: 500, probability: 5 },
    ];

    // Calculate the total weight (ChatGPT)
    let totalProbability = ranges.reduce(
        (acc, range) => acc + range.probability,
        0
    );
    let randomIndex = Math.random() * totalProbability;

    for (let range of ranges) {
        randomIndex -= range.probability;
        if (randomIndex <= 0) {
            return Math.floor(
                Math.random() * (range.max - range.min + 1) + range.min
            );
        }
    }

    // Fallback to the lowest range, just in case of floating point imprecision
    return 50;
}

async function updateGamePrices() {
    try {
        // Reference to the collection of games
        const gamesRef = db.collection("playstation-games");

        // Get all game documents in the collection
        const snapshot = await gamesRef.get();

        // Update each game with random price information (there are APIs for this, but need to pay)
        const updates = snapshot.docs.map((doc) => {
            const loosePrice = getRandomPrice();
            const cibPrice = Math.round(loosePrice * 1.5); // Ensure it's a whole number
            const newPrice = loosePrice * 3; // This will be a whole number already

            // Structure the price data as an array
            const priceData = {
                price: [
                    { type: "loose", amount: loosePrice },
                    { type: "CIB", amount: cibPrice },
                    { type: "new", amount: newPrice },
                ],
            };

            // Updating the document with the new price array
            return doc.ref.update(priceData);
        });

        // Await all the update promises to complete
        await Promise.all(updates);

        console.log("All games have been updated with random prices.");
    } catch (error) {
        console.error("Error updating documents", error);
    }
}

// Call the function to start the update process
updateGamePrices();
