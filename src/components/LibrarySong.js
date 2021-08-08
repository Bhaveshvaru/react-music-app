import React from "react";
import { playAudio } from "../util";


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
        playAudio(isPlaying,audioRef)
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