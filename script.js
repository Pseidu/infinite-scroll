// API para conectar con unsplash.com
const count = 10;
const apiKey = "uImVW0oqK2ZVcNjm8Gs3X5IcdNCzF8tj1pCxCPaPMHU";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Obtiene fotos de unsplash.com utiizando su API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        // Aquí tratamos el error
    }
}

//ejecutamos getPhotos al cargar la página
getPhotos();