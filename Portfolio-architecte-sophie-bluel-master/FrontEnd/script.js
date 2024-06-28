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

//appel réseau au serveur afin de récupérer les données des images du serveur
async function getProjects() {
  return fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => {
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
})

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
  deleteProject()
}


//Suppression d'un projet dans la modale

function deleteProject() {
  const trashAll = document.querySelectorAll(".fa-trash-can");
  trashAll.forEach(trash => {
    trash.addEventListener("click",(e)=>{
      const id = trash.id
      console.log(id)
      const init = {
        method:"DELETE",
        headers:{
          "content-Type":"application/json",
          "Authorization":"Bearer " + token
      },
      }
      fetch("http://localhost:5678/api/works/" + id,init)
      .then((response)=>{
        if(!response.ok) {
          console.log("La suppression n'a pas fonctionné")
      }
      return response.json()
      })
      .then((data)=>{
        console.log("La suppression a réussi, voici la data :" ,data)
        displayGallerypopup
      })
    })
  })
}

//Faire apparaître la deuxième modale pour ajouter une photo

const btnAddModal = document.querySelector(".popup_content .style_button")
const modalAddphoto = document.querySelector(".popup_add_projet")
const popupDelete = document.querySelector(".popup_delete_project")
const arrowLeft = document.querySelector(".fa-arrow-left")

function displayAddModal() {
  btnAddModal.addEventListener("click",()=>{
    modalAddphoto.classList.remove('hidden');
    popupDelete.classList.add('hidden');
  })
}

displayAddModal()

// Faire la prévisualisation de l'image

const previewImg = document.querySelector(".popup_add_projet img")
const inputFile = document.querySelector(".popup_add_projet input")
const labelFile = document.querySelector(".popup_add_projet label")
const iconFile = document.querySelector(".popup_add_projet .fa-image")
const pFile = document.querySelector(".popup_add_projet p")
const containerFile = document.querySelector(".containerFile")

// Ecouter les changements sur l'input file
inputFile.addEventListener("change",()=>{
  //Récuperer ce qu'il y a dans l'input
  const file = inputFile.files[0]
  console.log(file);
  if(file) {
    previewImg.classList.remove('hidden')
    previewImg.src = URL.createObjectURL(file)
    containerFile.classList.add('hidden')
  }
})


async function getCategories(){
  return fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((categories) => {
    return categories;
  });
}

//Créer une liste de catégorie dans l'input select
async function dislayCategoryModal(){
  const select = document.querySelector(".popup_add_projet select")
  const categories = await getCategories()
  categories.forEach(category => {
    //Créer une option
    const option = document.createElement("option")
    //Attribuer une valeur à l'option quand on va cliquer sur la catégorie
    option.value = category.id
    option.textContent = category.name
    select.appendChild(option)
  })
}
dislayCategoryModal()


//Faire un POST pour ajouter un projet

const form = document.querySelector(".popup_add_projet form")

form.addEventListener("submit", async (e)=>{
  //Retirer le comportement par défaut
  e.preventDefault()
  const formData = new FormData()
  const title = document.querySelector(".popup_add_projet #title").value
  const category = document.querySelector(".popup_add_projet #category").value
  formData.append("title", title)
  formData.append("category", Number(category))
  formData.append("image", inputFile.files[0])
  console.log(title)
  console.log(category)
  console.log(inputFile.files[0])

  fetch("http://localhost:5678/api/works",{
  method : "POST",
  body:formData,
  headers:{
    "Authorization":"Bearer " + token
  }
})
  .then((response) => {
    console.log(response)
    return response.json()
  })
  .then(data => {
    console.log("voici la photo ajoutée", data)
    displayGallerypopup();
    displayAddModal()
  })
})

//Fonction vérifiant si tous les inputs sont remplis

function FormCompleted(){
  const buttonValidate = document.querySelector(".popup_add_projet button")
  form.addEventListener("input",()=>{
    if(title.value && category.value && previewImg.src) {
      buttonValidate.disabled = false
      buttonValidate.classList.remove('button_grey')
      buttonValidate.classList.add('style_button')
    }
    else{
      buttonValidate.disabled = true
      buttonValidate.classList.add('button_grey')
      buttonValidate.classList.remove('style_button')
    }
  })
}
FormCompleted()

const arrowlastModal = document.querySelector(".popup_add_projet .fa-arrow-left")

arrowlastModal.addEventListener("click",()=>{
  const firstModal = document.querySelector(".popup_delete_project");
  const lastModal = document.querySelector(".popup_add_projet");
  firstModal.classList.remove('hidden')
  lastModal.classList.add('hidden')
})
