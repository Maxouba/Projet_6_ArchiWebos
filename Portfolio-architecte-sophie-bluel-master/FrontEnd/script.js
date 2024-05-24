const galleryImg = document.querySelector(".gallery");
const galleryPopup = document.querySelector(".admin_gallery");
const token = localStorage.getItem("token");
const editionMode = document.querySelector(".edition_mode");
const projectFilter = document.querySelector(".project_filter");
const logoutButton = document.querySelector("#logout_button");
const loginButton = document.querySelector("#login_button");
const modifButton = document.querySelector(".popup_button");
const listeFilter = document.querySelectorAll(".project_filter li");
let projects = [];
const trashAll = document.querySelectorAll(".fa-trash-can");

//appel réseau au serveur afin de récupérer les données des images du serveur
async function getProjects() {
  return fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => {
      let worksData = works;
      return works;
    });
}

//Cette fontion est apellée pour traiter les images
async function initProjects() {
  projects = await getProjects();
  // Parcourir les données des images
  for (let index = 0; index < projects.length; index++) {
    const project = projects[index];

    // Créer l'élément `img`
    const img = document.createElement("img");
    img.src = project.imageUrl;
    img.alt = project.title;

    // Créer l'élément `figcaption`
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = project.title;

    // Ajout des éléments à la figure existante
    const figure = document.createElement("figure");
    figure.appendChild(img);
    figure.appendChild(figcaption);

    // Récupérer l'élément gallery
    const gallery = document.querySelector(".gallery");
    gallery.appendChild(figure);

  }
  displayGallerypopup();

}

initProjects()

function togglePopup() {
  const popupOverlay = document.getElementById("popup_overlay");
  if (popupOverlay.style.display === "none") {
    popupOverlay.style.display = "block";
  } else {
    popupOverlay.style.display = "none";
  }
}

// Afficher les éléments quand un utilisateur est connecté
if (token) {
  editionMode.classList.remove('hidden');
  projectFilter.classList.remove('hidden');
  logoutButton.classList.remove('hidden');
  loginButton.classList.add('hidden');
  projectFilter.classList.add('hidden');
  modifButton.classList.remove("hidden");
}

// Écouteur d'événement "click" pour le bouton "logout"
logoutButton.addEventListener("click", logout);

// Fonction de déconnexion
function logout() {
  localStorage.removeItem("token");
}

// Filtrer les projets

listeFilter.forEach((element) => {
  element.addEventListener("click", (event) => {
    const categoryId = event.target.dataset.id;
    let filterProjects = projects.filter((project) => {
      return project.categoryId == categoryId;
    });

    // Effacer le contenu de la gallerie
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    if (categoryId == "0") {
      filterProjects = projects;
    }
    for (let index = 0; index < filterProjects.length; index++) {
      const project = filterProjects[index];

      // Créer l'élément `img`
      const img = document.createElement("img");
      img.src = project.imageUrl;
      img.alt = project.title;

      // Créer l'élément `figcaption`
      const figcaption = document.createElement("figcaption");
      figcaption.textContent = project.title;

      // Ajout des éléments à la figure existante
      const figure = document.createElement("figure");
      figure.appendChild(img);
      figure.appendChild(figcaption);

      // Récupérer l'élément gallery
      const gallery = document.querySelector(".gallery");
      gallery.appendChild(figure);
    }
  });
});

//Affichage des projets dans la modale

function displayGallerypopup() {
  console.log(projects)
  //Effacer notre projet à chaque appel de la galleryPopup
  galleryPopup.innerHTML = "";

  projects.forEach((project) => {
    // Créer l'élément `img`
    const div = document.createElement('div');

    const img = document.createElement('img');
    const trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash-can");
    trash.id = project.id;
    img.src = project.imageUrl;
    div.appendChild(trash);
    div.appendChild(img);
    galleryPopup.appendChild(div)
  });
}
