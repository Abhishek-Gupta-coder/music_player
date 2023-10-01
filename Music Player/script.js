const play= document.getElementById("play");
const music =document.querySelector('audio');
const img =document.querySelector("img");
let total_duration = document.getElementById("duration");
let current_time = document.getElementById("current_time");
const progress_div=document.getElementById("progress_div");
/*------------------------------------------------------------------------------------ */
        let isPlaying=false;
        const playMusic = () => {
            isPlaying=true;
            music.play();
            play.classList.replace('fa-play','fa-pause');
        };

        const pauseMusic =()=> {
            isPlaying=false;
            music.pause();
            play.classList.replace('fa-pause','fa-play');
        };

        play.addEventListener('click',()=>{
            isPlaying ? pauseMusic(): playMusic();
        });

        let progress=document.getElementById("progress");
        const singer= document.getElementById("singer");
        const title= document.getElementById("title");
        const prev= document.getElementById("prev");
        const next= document.getElementById("next");

        const loadSong=(songs)=>{
            title.textContent=songs.title;
            singer.textContent=songs.singer;
            music.src="Musics/"+songs.name+".mp3";
            img.src="Images/"+songs.name+".jpg";
        };

        songIndex=0;
        loadSong(songs[0]);
        const nextSong= () =>{
            songIndex=(songIndex +1)%songs.length;
            loadSong(songs[songIndex]);
            playMusic();
        };
        const prevSong= () =>{
            songIndex=(songIndex - 1 + songs.length)%songs.length;
            loadSong(songs[songIndex]);
            playMusic();
        };
/*------------------------------------------------------------------------------------ */

        music.addEventListener('timeupdate',(event)=>{
            const {currentTime,duration}=event.srcElement;
            let progress_time = (currentTime/duration)*100;
            progress.style.width=`${progress_time}%`;

            let min_duration=Math.floor(duration/60);
            let sec_duration=Math.floor(duration%60);
            let tot_duration=`${min_duration}:${sec_duration}`;
            if(duration){
                total_duration.textContent=`${tot_duration}`;
            }
            let min_currentTime=Math.floor(currentTime/60);
            let sec_currentTime=Math.floor(currentTime%60);
            if(sec_currentTime<10){
                sec_currentTime=`0${sec_currentTime}`;
            }
            let tot_currentTime=`${min_currentTime}:${sec_currentTime}`;
            current_time.textContent=`${tot_currentTime}`;
        });
        progress_div.addEventListener('click',(event)=>{
            const {duration}=music;
            let move_progress=(event.offsetX/event.srcElement.clientWidth)*duration;

            music.currentTime=move_progress

        });
        music.addEventListener("ended",nextSong);

        next.addEventListener("click",nextSong);
        prev.addEventListener("click",prevSong);