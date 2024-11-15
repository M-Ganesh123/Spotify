const photo = document.querySelector(".music-ig-area");
const faPlay = document.querySelector(".fa-play");
const faPause = document.querySelector(".fa-circle-pause");
const playlistBox = document.querySelector(".playlist");
const musicPlayBox = document.querySelector(".musicplay");
let play = document.querySelector("#play");
let backword = document.querySelector("#backword");
let forword = document.querySelector("#forword");
let forwardAro = document.querySelector("#aro");
let forwordMusic = document.querySelector("#music");
let backBtn = document.querySelector("#back");
let songsList = [];

async function getToken() {
  const client_id = "d30cc03b1a69430bba4dbad8af240b0a"; // Replace with your client ID
  const client_secret = "5ff1e4705bef462eb355143bdb472e28"; // Replace with your client secret

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(client_id + ":" + client_secret),
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

async function searchSong(query) {
  const token = await getToken();

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track&limit=28`,
    {
      method: "GET",
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data.tracks.items;
}

async function getsongs(query) {
  songsList = await searchSong(query);

  const playlist = document.getElementById("playlist");
  // console.log(songsList);

  playlist.innerHTML = ""; // Clear the playlist

  songsList.forEach((song, index) => {
    let img = document.createElement("img");
    const li = document.createElement("li");
    let t = 1;
    li.textContent = `${songsList[index].name} - ${songsList[index].artists[0].name}`;

    li.addEventListener("click", () => {
      playSong(songsList[index].preview_url, index);
      // li.style.backgroundColor = "#1db954";
      if (window.matchMedia("(max-width:650px)").matches) {
        playlistBox.style.display = "none";
      }
      if (window.matchMedia("(max-width:650px)").matches) {
        musicPlayBox.style.display = "block";
      }
      if (window.matchMedia("(max-width:650px)").matches) {
        backBtn.style.display = "block";
      }
      backBtn.addEventListener("click", () => {
        if (window.matchMedia("(max-width:650px)").matches) {
          playlistBox.style.display = "block";
        }
        if (window.matchMedia("(max-width:650px)").matches) {
          musicPlayBox.style.display = "none";
        }
        if (window.matchMedia("(max-width:650px)").matches) {
          backBtn.style.display = "none";
        }
        if (window.matchMedia("(max-width:650px)").matches) {
          forwardAro.style.display = "block";
          forwordMusic.style.display = "block";
        }
      });
      forwardAro.addEventListener("click", () => {
        if (window.matchMedia("(max-width:650px)").matches) {
          playlistBox.style.display = "none";
        }
        if (window.matchMedia("(max-width:650px)").matches) {
          musicPlayBox.style.display = "block";
        }
        if (window.matchMedia("(max-width:650px)").matches) {
          forwardAro.style.display = "none";
          forwordMusic.style.display = "none";
        }
        if (window.matchMedia("(max-width:650px)").matches) {
          backBtn.style.display = "block";
        }
      });
      let i = 1;
      let limit = index;
      backword.addEventListener("click", () => {
        if (0 < limit) {
          playSong(songsList[index - i].preview_url, index);
          img.src = `${songsList[index - i].album.images[0].url}`;
          if (t == 1) {
            photo.innerHTML = "";
            photo.appendChild(img);
          }
          i = i - 1;
          limit = index - i;
          console.log(limit);
        }
      });
      console.log(limit);

      forword.addEventListener("click", () => {
        if (limit < songsList.length) {
          playSong(songsList[index + i].preview_url, index);
          img.src = `${songsList[index + i].album.images[0].url}`;
          if (t == 1) {
            photo.innerHTML = "";
            photo.appendChild(img);
          }
          i = i + 1;
          limit = index + i;
          console.log(limit);
        }
        return limit;
      });
      console.log(limit);
    });
    li.addEventListener("click", () => {
      // console.log(li);

      img.src = `${songsList[index].album.images[0].url}`;
      if (t == 1) {
        photo.innerHTML = "";
        photo.appendChild(img);
      }
    });

    playlist.appendChild(li);
  });
}

document.getElementById("search-btn").addEventListener("click", () => {
  const query = document.getElementById("search").value;
  getsongs(query);
});
document.getElementById("search").addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    const query = document.getElementById("search").value;
    getsongs(query);
  }
});
(async () => {
  try {
    let q = "trending songs";
    const articles = await getsongs(q);
  } catch (error) {
    console.error("Error fetching initial random news", error);
  }
})();

let audio = new Audio();
const pause = document.createElement("i");

function playSong(url, index) {
  if (audio.src !== url) {
    audio.src = url;
    audio.play();

    play.innerHTML = `<i class="fa-regular fa-circle-pause"></i>`;
  } else {
    if (audio.paused) {
      audio.play();
      play.innerHTML = `<i class="fa-regular fa-circle-pause"></i>`;
    } else {
      audio.posh();
      play.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }
  }

  audio.addEventListener("ended", () => {
    photo.innerHTML = "";
    play.innerHTML = `<i class="fa-solid fa-play"></i>`;

    if (window.matchMedia("(max-width:650px)").matches) {
      playlistBox.style.display = "block";
    }
    if (window.matchMedia("(max-width:650px)").matches) {
      musicPlayBox.style.display = "none";
    }
    if (window.matchMedia("(max-width:650px)").matches) {
      backBtn.style.display = "none";
    }
    if (window.matchMedia("(max-width:650px)").matches) {
      forwardAro.style.display = "none";
      forwordMusic.style.display = "none";
    }
  });
}
let t = 1;
play.addEventListener("click", () => {
  if (t == 1) {
    play.innerHTML = `<i class="fa-regular fa-circle-pause"></i>`;
    audio.play();
    t = 0;
  } else {
    play.innerHTML = `<i class="fa-solid fa-play"></i>`;
    audio.pause();
    t = 1;
  }
});
