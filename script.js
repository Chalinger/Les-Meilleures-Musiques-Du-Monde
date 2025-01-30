var numCase = 0
fetch('musiques.json').then(function (response) {
    response.json().then(function (data) {
        data.forEach(function (element) {
            numCase = numCase + 1

            // Génération du HTML
            var htmlContent = `
                <section id="section${numCase}">
                    <img src="img/${element.image}.jpg" class="imageAlbum" alt="Album">
                    <audio src="audio/${element.song}" class="music_${numCase}" type="audio/mp3"></audio>
                    <div class="details">
                        <div class="texts">
                            <h2 class="title">${element.titre}&nbsp;-</h2>
                            <h2 class="artiste">${element.artiste}&nbsp;:&nbsp;</h2>
                            <h2 class="duration">${element.duree}</h2>
                            <button class="button" id="music_${numCase}" type="button">⏵</button>
                            <p class="description">${element.description}</p>
                        </div>
                        <div class="logos">
                            <a href="${element.spotify}">
                                <img src="img/spotify_logo.png" id="spotify" class="logo_streaming" alt="Spotify">
                            </a>
                            <a href="${element.deezer}">
                                <img src="img/deezer_logo.png" id="deezer" class="logo_streaming" alt="Deezer">
                            </a>
                            <a href="${element.apple_music}">
                                <img src="img/apple_music_logo.png" id="apple_music"  class="logo_streaming" alt="Apple_Music">
                            </a>
                        </div>
                    </div>
                </section>
            `;

            // ajout du contenu HTML au DOM
            document.getElementById("main").innerHTML += htmlContent;

            console.log("Musique " + numCase + " : ", element);
        });
        // liaison de chaque bouton a sa musique respective
        document.querySelectorAll(".button").forEach(function (button, index) {
            button.addEventListener("click", function () {
                // mettre les autres musiaues en pause
                document.querySelectorAll("audio").forEach(function (otherAudio, otherIndex) {
                    if (otherIndex !== index) {
                        otherAudio.pause();
                        otherAudio.currentTime = 0;
                        document.querySelectorAll(".button")[otherIndex].innerHTML = "⏵"; // Reset des boutons
                    }
                });

                // changement de l'etat du bouton
                const music = document.querySelector(`.music_${index + 1}`);
                if (button.innerHTML === "⏵") {
                    button.innerHTML = "⏸";
                    music.play();
                } else {
                    button.innerHTML = "⏵";
                    music.pause();
                }
                music.addEventListener('ended', () => {
                    button.textContent = '⏵'; // remet le bouton a son etat d'origine
                });
            });
        });

    });
});
const openPopupML = document.getElementById('open-popup-mention-legale');
const popupML = document.getElementById('popup-mention-legale');
const closePopupML = document.querySelector('.croix_exit');
// Ouvrir le popup
openPopupML.addEventListener('click', (e) => {
    e.preventDefault(); 
    popupML.style.display = 'flex'; 
});

// Fermer le popup
closePopupML.addEventListener('click', () => {
    popupML.style.display = 'none'; 
});

const openPopupForm = document.getElementById('open-popup-formulaire');
const popupForm1 = document.getElementById('previsualisation');
const popupForm2 = document.getElementById('formulaire');
const closePopupForm = document.querySelector('.croix_exit-formulaire');
// Ouvrir le popup
openPopupForm.addEventListener('click', (e) => {
    e.preventDefault(); 
    popupForm1.style.display = 'flex';
    popupForm2.style.display = 'block';
    openPopupForm.style.display = 'none';
});

// Fermer le popup
closePopupForm.addEventListener('click', () => {
    popupForm1.style.display = 'none'; 
    popupForm2.style.display = 'none';
    openPopupForm.style.display = 'flex';
});



document.getElementById('add-music').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('name-file').innerHTML = file.name
    }
});




// recuperation des valeurs du formulaire
var titre = document.getElementById("titre");
var artiste = document.getElementById("artiste");
var description = document.getElementById("descriptionMusique");
var audioLinkSpotify = document.getElementById("text-lien-spotify");
var audioLinkDeezer = document.getElementById("text-lien-deezer");
var audioLinkAppleMusic = document.getElementById("text-lien-apple-music");
var imageAlbum = document.getElementById("button-add-image-album").files[0] ? URL.createObjectURL(document.getElementById("add-image-album-form").files[0]) : ""
var musicFile = document.getElementById("add-music").files[0] ? URL.createObjectURL(document.getElementById("submit-fichier-audio").files[0]) : ""

titre.addEventListener('keyup', function () {
    document.querySelector("#titleTarget").innerHTML = titre.value
})

artiste.addEventListener('keyup', function () {
    document.querySelector("#artisteTarget").innerHTML = artiste.value
})

description.addEventListener('keyup', function () {
    document.querySelector("#descriptionTarget").innerHTML = description.value
})

audioLinkSpotify.addEventListener('keyup', function () {
    if (audioLinkSpotify.value.trim()) {
        document.querySelector("#spotifyID").innerHTML = `
      <a href="${audioLinkSpotify.value}">
          <img src="img/spotify_logo.png" id="spotify" class="logo_streaming" alt="Spotify">
      </a>`;
    }
    else {
        document.querySelector("#spotifyID").innerHTML = "";
    }
})

audioLinkDeezer.addEventListener('keyup', function () {
    if (audioLinkDeezer.value.trim()) {
        document.querySelector("#deezerID").innerHTML = `
      <a href="${audioLinkDeezer.value}">
          <img src="img/deezer_logo.png" id="deezer" class="logo_streaming" alt="Deezer">
      </a>`
    }
    else {
        document.querySelector("#deezerID").innerHTML = "";
    }
});


audioLinkAppleMusic.addEventListener('keyup', function () {
    if (audioLinkDeezer.value.trim()) {
        document.querySelector("#apple_musicID").innerHTML = `
      <a href="${audioLinkAppleMusic.value}">
          <img src="img/apple_music_logo.png" id="apple_music" class="logo_streaming" alt="Apple_Music">
      </a>`
    }
    else {
        document.querySelector("#apple_musicID").innerHTML = "";
    }
})

imageAlbum.addEventListener("change", function () {
    if (imageAlbum.files.length > 0) {
        document.querySelector("#new-image-album").innerHTML = `
          <img src="${imageAlbum.files[0].name}" class="imageAlbum" alt="Album">
          `;
    } else {
        document.querySelector("#no-image-album").innerHTML = `
              <img src="img/bouton_plus.png" for="add-image-album-form" id="add-image-album">
              <input type="file" id="add-image-album-form"></input>
          `;
    }
})

musicFile.addEventListener("change", function () {
    if (musicFile.files.length > 0) {
        document.querySelector(".audio").innerHTML = `
          <audio src="${musicFile.files[0].name}" class="music_6" type="audio/mp3"></audio>
          `;
    } else {
        document.querySelector(".audio").innerHTML = `
          <audio src="" class="" type="audio/mp3"></audio>
          `;
    }
})

// Fermer le popup
document.getElementById('submit-button').addEventListener('click', () => {
    popupForm2.style.display = 'none';
});