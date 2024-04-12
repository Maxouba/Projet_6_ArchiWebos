const loginForm = document.querySelector('.login_form');

loginForm.addEventListener('submit',function(event){
    // Retirer la requête de changement de page quand on valide le formulaire de connexion
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('pass').value

    // Récupérer les réponses du serveur pour les différentes authentifications sur le site
    const fetchConnexion = fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
        })
    })

    // Vérification de la connexion : si un token nous est envoyé, l'utilisateur est connecté
    fetchConnexion.then((response) => response.json())
        .then(login => {
            if (login.token) {
                localStorage.setItem('token', login.token)
                // Redirection vers la page index.html
                window.location.href = "./index.html"
                console.log("connect")
            } else {
                console.error("Erreur dans l’identifiant ou le mot de passe")
                
            }
        })
})