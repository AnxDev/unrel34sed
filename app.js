let cd_wrapper = document.getElementById("cd_wrapper");
let cd_cover = document.getElementById("cd-cover");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ canvas: cd_cover, antialias: true, alpha: true });
camera.position.z = 5.4;
renderer.setSize(cd_wrapper.clientWidth, cd_wrapper.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
const purpleLight = new THREE.PointLight(0x800080, 1);
purpleLight.position.set(-4, 4, 4);
scene.add(purpleLight);
const greenLight = new THREE.PointLight(0x00ff00, 1);
greenLight.position.set(4, -4, 4);
scene.add(greenLight);
const geometry = new THREE.CylinderGeometry(2.1,2.1,0.12,64)
const edgeMaterial = new THREE.MeshPhysicalMaterial({ color: 0xd8b4fe, // Leggera tinta violacea
    transparent: true,
    opacity: 0.75,
    roughness: 0.1,
    metalness: 0.2});

const material = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.8, roughness: 0.2 });
const cdTexture = new THREE.TextureLoader().load("cover1.png");
const faceMaterial = new THREE.MeshPhysicalMaterial({ map: cdTexture, metalness: 0.3, roughness: 0.2, transparent: true, iridescence:1.0, iridescenceIOR: 1.3, iridescenceThicknessRange: [100, 400] });
const cd = new THREE.Mesh(geometry, [material, faceMaterial, faceMaterial, edgeMaterial]);
cd.rotation.x = Math.PI / 2 - 0.25;
cd.rotation.z = -0.15;
scene.add(cd);
function animate() {
    requestAnimationFrame(animate);
    cd.rotation.x = (Math.PI / 2 - 0.35) + Math.sin(Date.now() * 0.0015) * 0.12;
    cd.rotation.y += 0.04;
    renderer.render(scene, camera);
}
animate();

let panel_expander = document.getElementById("panel-expander");
let bg = document.getElementById("bg");
let title = document.getElementById("title");
let artist = document.getElementById("artist");
let progressBar = document.getElementById("progress-bar");
let currentTime = document.getElementById("current-time");
let totalTime = document.getElementById("total-time");
let prevBtn = document.getElementById("prev-btn");
let playBtn = document.getElementById("play-btn");
let nextBtn = document.getElementById("next-btn");
let progressContainer = document.getElementById("progress-container");
const audio = new Audio();
let currentTrackIndex = 0;
let isPlayerOpen = false;

let tracks = [
    {
        title: "0h my",
        artist: "tha Supreme",
        src: "tracks/ohmy.mp3",
        cover: "cover1.png",
        duration: 81,
    },
    {
        title: "2ombie",
        artist: "tha Supreme",
        src: "tracks/2ombie.mp3",
        cover: "cover1.png",
        duration: 76,
    },
    {
        title: "1000 mila gua1",
        artist: "tha Supreme",
        src: "tracks/1000milaguai.mp3",
        cover: "cover1.png",
        duration: 65,
    },
    {
        title: "goddamn",
        artist: "tha Supreme",
        src: "tracks/goddamn.mp3",
        cover: "cover2.png",
        duration: 72,
    },
    {
        title: "h4ppY!!!",
        artist: "tha Supreme",
        src: "tracks/happy.mp3",
        cover: "cover1.png",
        duration: 59,
    },
    {
        title: "m!ei fr@",
        artist: "tha Supreme",
        src: "tracks/mieifra.mp3",
        cover: "cover3.png",
        duration: 80,
    },
    {
        title: "piLe di caSh",
        artist: "tha Supreme",
        src: "tracks/piledicash.mp3",
        cover: "cover4.png",
        duration: 134,
    },
    {
        title: "purp!e haze",
        artist: "tha Supreme",
        src: "tracks/piledicash.mp3",
        cover: "cover3.png",
        duration: 62,
    },
    {
        title: "quesTa noTTe",
        artist: "tha Supreme",
        src: "tracks/questanotte.mp3",
        cover: "cover4.png",
        duration: 65,
    },
    {
        title: "sad smile",
        artist: "tha Supreme",
        src: "tracks/sadsmile.mp3",
        cover: "cover5.png",
        duration: 66,
    },
    {
        title: "sPeeDy GoNzaLeS",
        artist: "tha Supreme",
        src: "tracks/speedygonzales.mp3",
        cover: "cover4.png",
        duration: 70,
    },
    {
        title: "tasKE",
        artist: "tha Supreme",
        src: "tracks/taske.mp3",
        cover: "cover4.png",
        duration: 45,
    },
    {
        title: "yoU deSERVE",
        artist: "tha Supreme",
        src: "tracks/youdeserve.mp3",
        cover: "cover6.png",
        duration: 65,
    },
]
function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    title.textContent = track.title;
    artist.textContent = track.artist;
    faceMaterial.map = new THREE.TextureLoader().load(track.cover);
    faceMaterial.needsUpdate = true;
    totalTime.textContent = formatTime(track.duration);
    currentTime.textContent = "0:00";

    audio.currentTime = 0;
}
cd_wrapper.addEventListener("click", () => {
    if (!isPlayerOpen) {
        panel_expander.classList.remove("grid-rows-[0fr]");
        panel_expander.classList.add("grid-rows-[1fr]");
        panel_expander.classList.remove("opacity-0");
        panel_expander.classList.add("opacity-100");
        isPlayerOpen = true;

        cd_wrapper.classList.remove("w-96", "h-96");
        cd_wrapper.classList.add("w-56", "h-56");
        audio.play();
        playBtn.textContent = "Pause";
        panel_expander.classList.add("mt-12");
    } else {
        if(audio.paused) {
            audio.play();
            playBtn.textContent = "Pause";
        } else {
            audio.pause();
            playBtn.textContent = "Play";
        }
    }
});
prevBtn.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playBtn.textContent = "Pause";
});
nextBtn.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playBtn.textContent = "Pause";
}); 
playBtn.addEventListener("click", () => {
    if(audio.paused) {
        audio.play();
        playBtn.textContent = "Pause";
    } else {
        audio.pause();
        playBtn.textContent = "Play";
    }
});
audio.addEventListener("timeupdate", () => {
    if(!audio.duration) return;
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTime.textContent = formatTime(audio.currentTime);
});
progressContainer.addEventListener("click", (e) => {
    if(!audio.duration) return;
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const newTime = (clickX / width) * audio.duration;
    audio.currentTime = newTime;
});
loadTrack(currentTrackIndex);