const galleryImg = document.querySelector('.gallery');
const token = localStorage.getItem('token');
const editionMode = document.querySelector('.edition_mode')

//appel réseau au serveur afin de récupérer les données des images du serveur
async function getProjects() {
    return fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then(works => {
            let worksData = works
            return works
        })
}

//cette fontion est apellée pour traiter les images
async function initProjects() {
    const projects = await getProjects();
    // Parcourir les données des images
    for (let index = 0; index < projects.length; index++) {
        const project = projects[index];

        // Créer l'élément `img`
        const img = document.createElement('img');
        img.src = project.imageUrl;
        img.alt = project.title;

        // Créer l'élément `figcaption`
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = project.title;

        // Ajout des éléments à la figure existante
        const figure = document.createElement('figure');
        figure.appendChild(img);
        figure.appendChild(figcaption);
        
        // Récupérer l'élément gallery
        const gallery = document.querySelector('.gallery');
        gallery.appendChild(figure);
    }

    console.log(projects);
}

initProjects()

function togglePopup(){
    let popup = document.querySelector("#popup_overlay");
    popup.classList.toggle("open");
}

if (token) {
    editionMode.classList.remove('hidden')
}