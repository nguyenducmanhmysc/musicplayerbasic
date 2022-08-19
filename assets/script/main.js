const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const songsAPI = {
    songs: [
        {
            id: 6,
            name: 'Họ yêu ai mất rồi',
            author: 'Doãn Hiếu',
            image: './data/img/HoYeuAiMatRoi.jpg',
            path: './data/music/HoYeuAiMatRoi.mp3'
        },
        {
            id: 1,
            name: 'Cướp đi cả thế giới',
            author: 'Bảo Yến Rosie',
            image: './data/img/CuopDiCaTheGioi.jpg',
            path: './data/music/CuopDiCaTheGioi.mp3'
        },
        {
            id: 2,
            name: 'Đừng ai nhắc về anh ấy',
            author: 'Trà My',
            image: './data/img/DungAiNhacVeAnhAy.jpg',
            path: './data/music/DungAiNhacVeAnhAy.mp3'
        },
        {
            id: 3,
            name: 'Đừng như thói quen',
            author: 'JayKii Sara Lưu',
            image: './data/img/DungNhuThoiQuen.jpg',
            path: './data/music/DungNhuThoiQuen.mp3'
        },
        {
            id: 4,
            name: 'Em hát ai nghe',
            author: 'Orange',
            image: './data/img/EmHatAiNghe.jpg',
            path: './data/music/EmHatAiNghe.mp3'
        },
        {
            id: 5,
            name: 'Giá như cô ấy chưa xuất hiện',
            author: 'Miu Lê',
            image: './data/img/GiaNhuCoAyChuaXuatHien.jpg',
            path: './data/music/GiaNhuCoAyChuaXuatHien.mp3'
        },
        {
            id: 7,
            name: 'Một bước yêu vạn dặm đau',
            author: 'Mr Siro',
            image: './data/img/MotBuocYeuVanDamDau.jpg',
            path: './data/music/MotBuocYeuVanDamDau.mp3'
        },
        {
            id: 8,
            name: 'Không phải em đúng không',
            author: 'Dương Hoàng Yến',
            image: './data/img/KhongPhaiEmDungKhong.jpg',
            path: './data/music/KhongPhaiEmDungKhong.mp3'
        },
        {
            id: 9,
            name: 'Phía sau một cô gái',
            author: 'Sobin Hoàng Sơn',
            image: './data/img/PhiaSauMotCoGai.jpg',
            path: './data/music/PhiaSauMotCoGai.mp3'
        },
        {
            id: 10,
            name: 'Rời bỏ',
            author: 'Hoà Minzy',
            image: './data/img/RoiBo.jpg',
            path: './data/music/RoiBo.mp3'
        },
        {
            id: 11,
            name: 'Tháng tư là lời nói dối của em',
            author: 'Hà Anh Tuấn',
            image: './data/img/ThangTuLaLoiNoiDoiCuaEm.jpg',
            path: './data/music/ThangTuLaLoiNoiDoiCuaEm.mp3'
        },
        {
            id: 12,
            name: 'Thanh xuân',
            author: 'Da LAB',
            image: './data/img/ThanhXuan.jpg',
            path: './data/music/ThanhXuan.mp3'
        },
    ],

    currentSongIndex: 0,
    isPlay: false,
    isRandom: false,
    isRepeat: false,
    songsPlayed: [],
};

songsAPI.songsPlayed.push(songsAPI.currentSongIndex);

const cdThumb = $('.cd-thumb');
const nameMusicPlaying = $('.name-music-playing');
const audio = $('#audio');
var playlist = $('#playlist');
const songItem = $$('.song-item');
const playBtn = $('.btn-toggle-play');
const progress = $('.progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');

const currentTime = $('.current-time');
const totalTime = $('.total-time');

// console.log(playBtn);

const effectWhenSongPlay = `
    <div class="sound-wave">
        <div class="equalizer-container">
            <ol class="equalizer-column">
                <li class="colour-bar"></li>
            </ol>
            <ol class="equalizer-column">
                <li class="colour-bar"></li>
            </ol>
            <ol class="equalizer-column">
                <li class="colour-bar"></li>
            </ol>
            <ol class="equalizer-column">
                <li class="colour-bar"></li>
            </ol>
            <ol class="equalizer-column">
                <li class="colour-bar"></li>
            </ol>
        </div>
    </div>
`;

start();

function start() {
    renderSongs();
    playSongsDefault();
    handleEvents();
    selectSong();
    addClassHoverPlay();
};

function renderSongs() {
    let songsHTML = songsAPI.songs.map(element => {
        return `
            <div class="song-item">
                <div class="hover-play">
                    <i class="fa-solid fa-play"></i>
                </div>
                ${effectWhenSongPlay}
                <div class="item-thumb">
                    <div class="thumb" style="background-image: url(${element.image});"></div>
                </div>
                <div class="item-body">
                    <h3 class="song-name">${element.name}</h3>
                    <p class="song-author">${element.author}</p>
                </div>
                <div class="item-options">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </div>
            </div>
        `;
    });

    $('#playlist').innerHTML = songsHTML.join('');
};


function handleEvents() {

    const cdThumbAnimate = cdThumb.animate(
        [{
            transform: "rotate(360deg)"
        }], 
        {
            duration: 10000,
            iterations: Infinity,
        }
    );
    cdThumbAnimate.pause();

    // Handle when scroll song list
    var cd = $('#cd');
    let cdHeight = cd.offsetHeight;
    var isMouseScroll = false;
    playlist.onscroll = () => {
        window.addEventListener('wheel',function(e) {
            isMouseScroll = true;
        });
        if(isMouseScroll) {
            const scrollTop = Math.floor(playlist.scrollTop);
            let newHeight = (cdHeight - scrollTop);
            cd.style.height = newHeight>=0 ? newHeight + 'px':0;
            cd.style.marginTop = newHeight>=0 ? 15 + 'px' : 0;
            cd.style.opacity = newHeight/cdHeight;
        }
    };


    // Handle click on play or pause
    playBtn.onclick = () => {
        if(songsAPI.isPlay) {
            audio.pause();
        } else {
            audio.play();
        }
    }
    audio.onplay = () => {
        songsAPI.isPlay = true;
        playBtn.classList.toggle('playing', songsAPI.isPlay);
        playBtn.classList.toggle('pausing', !songsAPI.isPlay);
        cdThumbAnimate.play();
    };
    audio.onpause = () => {
        songsAPI.isPlay = false;
        playBtn.classList.toggle('playing', songsAPI.isPlay);
        playBtn.classList.toggle('pausing', !songsAPI.isPlay);
        cdThumbAnimate.pause();
    };

    // Handle progress bar follow song
    audio.ontimeupdate = () => {
        let progressPercent = audio.currentTime / audio.duration *1000;
        if(progressPercent)
            progress.value = progressPercent;

        if(!audio.duration) {
            $('.current-time').innerHTML = '00:00';
            $('.total-time').innerHTML = '00:00';
        } else {
            $('.current-time').innerHTML = `${Math.floor(audio.currentTime / 60)<10?'0' + Math.floor(audio.currentTime / 60):Math.floor(audio.currentTime / 60)}:${Math.floor(audio.currentTime % 60)<10?'0' + Math.floor(audio.currentTime % 60):Math.floor(audio.currentTime % 60)}`;
            $('.total-time').innerHTML = `${Math.floor(audio.duration / 60)<10?'0' + Math.floor(audio.duration / 60):Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60)<10?'0' + Math.floor(audio.duration % 60):Math.floor(audio.duration % 60)}`;
        }

    };

    // Handle change of progress bar 
    progress.onchange = () => {
        let progressChange = audio.duration / 1000 * progress.value;
        audio.currentTime = progressChange;
    };

    // Handle when finish song
    audio.onended = () => {
        if(songsAPI.isRepeat) {
            audio.play();
        } else {
            nextBtn.click();
        }
        playSongsDefault();
        audio.play();
    };

    // Handle click on next song
    nextBtn.onclick = () => {
        if(songsAPI.isRandom) {
            randomSong();
        } else {
            nextSong();
        }
        selectSong();
        playSongsDefault();
        audio.play();
        scrollSongIntoView();
        isMouseScroll = false;
    };
    
    // Handle click on previous song
    prevBtn.onclick = () => {
        if(songsAPI.isRandom) {
            randomSong();
        } else {
            prevSong();
        }
        selectSong();
        playSongsDefault();
        audio.play();
        scrollSongIntoView();
        isMouseScroll = false;
    };

    // Handle click on random song
    randomBtn.onclick = () => {
        songsAPI.isRandom = !songsAPI.isRandom;
        randomBtn.classList.toggle('active-control', songsAPI.isRandom);
    };

    //  Handle click on repeat song
    repeatBtn.onclick = () => {
        songsAPI.isRepeat = !songsAPI.isRepeat;
        repeatBtn.classList.toggle('active-control', songsAPI.isRepeat);
    };
}

function playSongsDefault() {
    cdThumb.style.backgroundImage = `url(${songsAPI.songs[songsAPI.currentSongIndex].image})`;
    nameMusicPlaying.textContent = `${songsAPI.songs[songsAPI.currentSongIndex].name}`;
    audio.src = songsAPI.songs[songsAPI.currentSongIndex].path;
};


function nextSong() {
    songsAPI.currentSongIndex++;
    if(songsAPI.currentSongIndex >= songsAPI.songs.length) {
        songsAPI.currentSongIndex = 0;
    }
    playSongsDefault();
};

function prevSong() {
    songsAPI.currentSongIndex--;
    if(songsAPI.currentSongIndex < 0) {
        songsAPI.currentSongIndex = songsAPI.songs.length - 1;
    }
    playSongsDefault();
    audio.play();
};

function randomSong() {
    let newSongIndex, acept = true, i = 0;
    do {
        newSongIndex = Math.floor(Math.random() * songsAPI.songs.length);
        if(songsAPI.songsPlayed.length < songsAPI.songs.length) {
            i = 0;
            while(i<songsAPI.songsPlayed.length) {
                acept = false;
                if(newSongIndex === songsAPI.songsPlayed[i]) {
                    acept = true;
                    i = songsAPI.songsPlayed.length + 1;
                }
                i++;
            }
            if(newSongIndex === songsAPI.currentSongIndex) {
                acept = true;
            }
        } else {
            songsAPI.songsPlayed = [];
            songsAPI.songsPlayed[0] = songsAPI.currentSongIndex;
        }
    } while (acept);

    songsAPI.currentSongIndex = newSongIndex;
    songsAPI.songsPlayed.push(songsAPI.currentSongIndex);
    console.log(songsAPI.songsPlayed)
};

function selectSong() {
    const songsList = $$('.song-item');
    songsList[songsAPI.currentSongIndex].classList.add('active-song');

    songsList.forEach((element, index) => {
        if(index !== songsAPI.currentSongIndex) {
            element.classList.remove('active-song');
        }
        element.onclick = () => {
            $('.song-item.active-song').classList.remove('active-song');
            songsList[index].querySelector('.hover-play').style = 'display: none';
            songsList[index].classList.add('active-song');
            songsAPI.currentSongIndex = index;
            playSongsDefault();
            audio.play();
        };
    });

};

function scrollSongIntoView() {
    $('.song-item.active-song').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
};

function addClassHoverPlay() {
    const songsList = $$('.song-item');
    // songsList[index].querySelector('.hover-play').style = 'display: none';
    // songsList[songsAPI.currentSongIndex].querySelector('.hover-play').style = 'display: block';
    songsList.forEach((element, index) => {
        element.onmousemove = () => {
            if(index !== songsAPI.currentSongIndex)
                songsList[index].querySelector('.hover-play').style = 'display: flex';
        };
        element.onmouseout = () => {
            if(index !== songsAPI.currentSongIndex)
                songsList[index].querySelector('.hover-play').style = 'display: none';
        };
    });
};