function renderMusic(){

    const container = document.getElementById("music-container");
    
    music.forEach(song => {
    
    const card = document.createElement("div");
    
    card.classList.add("sub-column");
    
    card.innerHTML = `
    
    <h3>${song.title}</h3>
    
    <p>
    <strong>${song.artist}</strong> — ${song.album} (${song.year})
    </p>
    
    <div class="music-player">
    <iframe
    width="100%"
    height="200"
    src="https://www.youtube.com/embed/${song.youtube}"
    frameborder="0"
    allowfullscreen>
    </iframe>
    </div>
    
    <p>${song.comment}</p>
    
    `;
    
    container.appendChild(card);
    
    });
    
    }
    
    window.addEventListener("DOMContentLoaded", renderMusic);