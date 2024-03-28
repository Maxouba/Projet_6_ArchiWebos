// script.js
const images_gallery = [
    {
        "images" : "abajour-tahina.png",
        "tagLine" : "Abajour"
    },
    {
        "images" : "appartement-paris-v.png",
        "tagLine" : "Salon d'un <span>appartement parisien lumineux</span>"      
    },
    {
        "images" : "appartement-paris-x.png",
        "tagLine" : "Cuisine d'un <span>appartement parisien</span>"      
    },
    {
        "images" : "appartement-paris-xviii.png",
        "tagLine" : "Chambre d'un <span>appartement parisien</span>"      
    },
    {
        "images" : "bar-lullaby-paris.png",
        "tagLine" : "<span>Bar Lullaby à Paris</span> avec un comptoir de couleur bleu"      
    },
    {
        "images" : "hotel-first-arte-new-delhi.png",
        "tagLine" : "Salle du restaurant de <span>l'hôtel First Arte New-Delhi</span>"      
    },
    {
        "images" : "la-balisiere.png",
        "tagLine" : "Accueil de l'hôtel <span>La Balisière à Biarritz</span>"      
    },
    {
        "images" : "le-coteau-cassis.png",
        "tagLine" : "Chambre d'une <span>villa dans les hauteurs de Saint Tropez</span>"      
    },
    {
        "images" : "le-coteau-cassis.png",
        "tagLine" : "Chambre d'une <span>villa dans les hauteurs de Saint Tropez</span>"      
    },
    {
        "images" : "restaurant-sushisen-londres.png",
        "tagLine" : "Restaurant Sushisen à Londres"      
    },
    {
        "images" : "restaurant-sushisen-londres.png",
        "tagLine" : "Restaurant Sushisen à Londres"      
    },
    {
        "images" : "structures-thermopolis.png",
        "tagLine" : "Structues en thermopolis"     
    },
    {
        "images" : "villa-ferneze.png",
        "tagLine" : "<span>Villa Ferneze</span> en Italie"     
    },
];

newImg();

const galleryImg = document.querySelector('all_gallery')
const numberOfImg = img.length;

function newImg(){
    const gallery = document.querySelector(".gallery");
    for (let index = 0; index <img.length; index++) {
    }
}

async function getProjects() {
    return fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then(works => {
            let worksData = works
            return works
        })
}

async function initProjects() {
    const projects = await getProjects();
console.log(projects); }

initProjects()

function togglePopup(){
    let popup = document.querySelector("#popup_overlay");
    popup.classList.toggle("open");
}

