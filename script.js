
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Datos para la API para conectar con unsplash.com
const count = 30;
const apiKey = "uImVW0oqK2ZVcNjm8Gs3X5IcdNCzF8tj1pCxCPaPMHU";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Función que se ejecutará después de cada imagen que se cargue
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

/*************************************************************
 * Aunque me parece un poco excesivo, a fin de aplicar DRY
 * (don't repeat yourself) voy a definir una función para añadir
 * los atributos. (He dejado comentados y muy indentadas las 
 * líneas originales que voy a dejar de repetir para que se vea lo
 * que no repetimos)
 * ************************************************************/
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Creamos elementos html para los links y las fotos
function displayPhotos() {
    totalImages = photosArray.length;
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
        //Para ejecutar después de cada imagen que se carga
        img.addEventListener("load", imageLoaded);
        //Metemos el <img> dentro del <a>, y este dentro de imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

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

/*******************************************************
 * Cada vez que hacemos scroll comprueba si estamos cerca del final de la página, y también, si
 * están ya todas las imágenes cargadas (ready). Si es así, llama a getPhotos (carga 30 imágenes más)
********************************************************/ 
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && ready) {
        getPhotos();
        ready = false;
        imagesLoaded = 0
    }
});

//ejecutamos getPhotos al cargar la página
getPhotos();