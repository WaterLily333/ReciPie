import axios from "axios";

const getImg = async (title) => {
    try {
        const response = await axios.get(`https://pixabay.com/api/`, {
            params: {
                key: '46179411-8ca467e89de390329b1cc9304',
                q: title, // Search term entered by the user
                image_type: "photo", // Specify image type (photo, vector, or illustration)
                per_page: 3, // Number of results to retrieve
            },
        });
        const randomNumber = Math.floor(Math.random() * 2) + 1;
        console.log('res', response.data.hits[randomNumber].webformatURL);
        return response.data.hits[randomNumber].webformatURL;
    } catch (error) {
        console.error("Error fetching images from Pixabay:", error);
    }
};

export default { getImg };
