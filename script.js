
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

/*************************************************************
 * Aunque me parece un poco excesivo, a fin de aplicar DRY
 * (don't repeat yourself) voy a definir una función para añadir
 * los atributos. (He dejado comentados y muy indentadas las 
 * líneas originales que voy a dejar de repetir)
 * ************************************************************/
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Creamos elementos html para los links y las fotos
function displayPhotos() {
    //Para cada objeto en photosArray
    photosArray.forEach((photo)=>{
        //Creamos un <a> por cada foto, para enlazar con la imagen en unsplash.com
        const item = document.createElement("a");
                //item.setAttribute("href", photo.links.html);
                //item.setAttribute("target", "_blank");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank"
        });
        //Creamos un <img> para cada foto
        const img = document.createElement("img");
                //img.setAttribute("src", photo.urls.regular);
                //img.setAttribute("alt", photo.alt_description);
                //img.setAttribute("title", photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        //Metemos el <img> dentro del <a>, y este dentro de imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// API para conectar con unsplash.com
const count = 10;
const apiKey = "uImVW0oqK2ZVcNjm8Gs3X5IcdNCzF8tj1pCxCPaPMHU";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
//Obtiene fotos de unsplash.com utilizando su API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Aquí tratamos el error
    }
}

//ejecutamos getPhotos al cargar la página
getPhotos();