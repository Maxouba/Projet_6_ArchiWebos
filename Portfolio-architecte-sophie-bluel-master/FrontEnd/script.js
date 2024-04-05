// script.js

const galleryImg = document.querySelector('all_gallery')
const numberOfImg = img.length;


//appel réseau au serveur afin de récupérer les données des images du serveur
async function getProjects() {
    return fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then(works => {
            let worksData = works
            return works
        })
}

// cette fontion est apellée pour traiter les images
async function initProjects() {
    const projects = await getProjects();
    // Parcourir les données des images
    for (let index = 0; index < projects.length; index++) {
        const project = projects[index];

        // Créer l'élément `img`
        const img = document.createElement('img');
        img.src = project.image_url; // Remplacer "image_url" par l'attribut de l'URL de l'image dans vos données
        img.alt = project.title; // Remplacer "title" par l'attribut du titre de l'image dans vos données

        // Créer l'élément `figcaption`
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = project.title; // Remplacer "title" par l'attribut du titre de l'image dans vos données

        // Ajouter les éléments à la figure
        const figure = document.createElement('figure');
        figure.appendChild(img);
        figure.appendChild(figcaption);

        // Ajouter la figure à la galerie
        galleryImg.appendChild(figure);
    }

    console.log(projects);
}

initProjects()

function togglePopup(){
    let popup = document.querySelector("#popup_overlay");
    popup.classList.toggle("open");
}

