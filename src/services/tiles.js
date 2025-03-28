// src/services/tiles.js

const tileBaseUrl = import.meta.env.VITE_TILES_URL;

export const getTileUrl = (tileId) => {
    return `${tileBaseUrl}/data/${tileId}/{z}/{x}/{y}.png`;
};
