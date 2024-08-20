import axios from "axios";

const API_KEY = "BHFSslXjpcJi0nbhSTxm2YWkQxs0fzZw7YDR-csYYcs";
axios.defaults.baseURL =  "https://api.unsplash.com/search/photos";

const fetchImages = async (currentPage, searchQuery) => {
    const response = await axios.get("", {
        params: {
            query: searchQuery,
            page: currentPage,
            per_page: 15,
            orientation: "landscape",
            client_id: API_KEY,
        },
    });
    return response.data;
};

export default fetchImages;