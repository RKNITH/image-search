import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async () => {
    if (!query) return;
    try {
      const response = await axios.get(`https://image-search-seven-indol.vercel.app/api/images?q=${query}`);
      setImages(response.data.results);
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-lg">
        Image Search With <span className="text-yellow-300"> Rumi</span>
      </h1>

      {/* Search Bar */}
      <div className="flex w-full max-w-xl mb-6 bg-white bg-opacity-20 p-2 rounded-lg backdrop-blur-md shadow-lg">
        <input
          type="text"
          placeholder="Search stunning images..."
          className="flex-1 p-3 rounded-l-lg focus:outline-none bg-gray-100 text-gray-900 placeholder-gray-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          className="bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-r-lg hover:bg-yellow-500 transition"
          onClick={fetchImages}
        >
          Search
        </button>
      </div>

      {/* Image Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {images.map((img) => (
          <motion.div
            key={img.id}
            whileHover={{ scale: 1.05 }}
            className="relative overflow-hidden rounded-lg cursor-pointer shadow-lg"
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img.urls.small}
              alt={img.alt_description}
              className="w-full h-52 object-cover transition-transform duration-300 hover:scale-110 rounded-lg"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-5 shadow-2xl max-w-xl"
          >
            <img
              src={selectedImage.urls.regular}
              alt={selectedImage.alt_description}
              className="rounded-lg w-full"
            />
            <div className="mt-4 flex justify-between">
              <a
                href={selectedImage.urls.full}
                download
                className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Download
              </a>
              <button
                onClick={() => setSelectedImage(null)}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default App;
