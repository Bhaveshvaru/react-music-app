import React from "react";

const LibrarySong = ({setSongs,isPlaying,audioRef,song,setCurrentSong,songs ,id})=>{
   const  clickSongHandler =()=>{
       const selectedSong = songs.filter((state)=> state.id === id)
        setCurrentSong(selectedSong[0]);
        //active state
        const newSong = songs.map((song)=>{
            if(song.id === id){
                return{
                    ...song,
                    active:true
                }
            }else{
                return{
                    ...song,
                    active:false
                }
            }
        })
        setSongs(newSong)
        if(isPlaying){
        const playPromise = audioRef.current.play();
        if(isPlaying !== undefined){
            playPromise.then(()=>{
                audioRef.current.play()
            })
        }

        }
        audioRef.current.play()
    }
return(
    <div onClick={clickSongHandler} 
     className={`library-song ${song.active ? 'selected': ""}`} >
        <img src={song.cover} alt="image" />
        <div className="song-description">
        <h2>{song.name}</h2>
        <h3>{song.artist}</h3>
        </div>
    
    </div>
)
}

export default LibrarySong;