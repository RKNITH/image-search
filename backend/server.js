require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

app.get("/", (req, res) => {
    res.send("Welcome to the Image Search API");
}
)

// Route to fetch images from Unsplash
app.get("/api/images", async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
    }

    try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: {
                query,
                client_id: UNSPLASH_ACCESS_KEY,
                per_page: 20
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch images" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
