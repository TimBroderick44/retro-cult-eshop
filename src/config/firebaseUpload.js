import firebaseAdmin from "firebase-admin";
import fetch from "node-fetch";
import serviceAccount from "../../serviceKey.json" assert { type: "json" };

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

const db = firebaseAdmin.firestore();

const RAWG_API_KEY = "46b422d5728b4c709486ad1b9d892539";
const PLAYSTATION_PLATFORM_ID = "27";

const fetchGamesAndUploadToFirebase = async () => {
    let nextPageUrl = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&platforms=${PLAYSTATION_PLATFORM_ID}`;
    // https://api.rawg.io/api/games?key=$46b422d5728b4c709486ad1b9d892539&platforms=$27

    while (nextPageUrl) {
        try {
            const response = await fetch(nextPageUrl);
            const data = await response.json();
            const gamesBatch = db.batch();

            for (const game of data.results) {
                const gameRef = db
                    .collection("playstation-games")
                    .doc(game.slug);
                const gameData = {
                    slug: game.slug,
                    name: game.name,
                    released: game.released,
                    background_image: game.background_image,
                    rating: game.rating,
                    metacritic: game.metacritic,
                    esrb_rating: game.esrb_rating
                        ? game.esrb_rating.name
                        : "Not Rated",
                    short_screenshots: game.short_screenshots.map(
                        (ss) => ss.image
                    ),
                    genres: game.genres.map((genre) => genre.name),
                };

                gamesBatch.set(gameRef, gameData);
            }

            await gamesBatch.commit();
            console.log("Batch committed to Firestore.");

            nextPageUrl = data.next;
        } catch (error) {
            console.error(
                "An error occurred while fetching or uploading:",
                error
            );
            nextPageUrl = null; 
        }
    }
};

fetchGamesAndUploadToFirebase();
