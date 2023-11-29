export async function getGif() {
    const apiKey = process.env.API_KEY;
    const offset = Math.floor(Math.random() * 11);
    const array = [2, 6, 8, 10, 11, 13, 14, 15, 16, 18, 19];
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=monster&limit=1&offset=${array[offset]}&rating=r&lang=en&bundle=messaging_non_clips`;

    try {
        const response = await fetch(url);
        const resultText = await response.text();
        const result = JSON.parse(resultText);
        const gif = result.data[0].images.original.url;
        return gif;
    } catch (error) {
        return error;
    }
}