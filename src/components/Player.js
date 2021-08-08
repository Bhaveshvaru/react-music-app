import React,{useRef, useState,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay,faBookReader, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";
import { playAudio } from "../util";

const Player = ({setSongs,setCurrentSong,songs,currentSong,isPlaying,setIsPlaying,audioRef,setSongInfo,songInfo}) => {
 

    const draghandler = (e)=>{
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo,currentTime:e.target.value})
    }

   

    const getTime = (time)=>{
        return(
            Math.floor(time/60) + ":" + ("0" + Math.floor(time %60)).slice(-2)
        )
    }

    //useEffect
    useEffect(()=>{
        const newSong = songs.map((song)=>{
            if(song.id === currentSong.id){
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
    },[currentSong])

    //skip 
    const skipTrackHandler = (direction)=>{
        const currentIndex = songs.findIndex((song)=>song.id === currentSong.id)

        //set skip
        if (direction === 'skip-forward') {
            setCurrentSong(songs[(currentIndex + 1) % songs.length])
        } else

        if(direction === 'skip-back'){
            if((currentIndex - 1)% songs.length === -1){
            setCurrentSong(songs[songs.length - 1])
            playAudio(isPlaying,audioRef)
            return
            }
            setCurrentSong(songs[(currentIndex - 1) % songs.length])

        }
        playAudio(isPlaying,audioRef)
    }

    //Event
    const playSongHandler =()=>{
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
      };

return(
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            value={songInfo.currentTime}
            type="range"
            max={songInfo.duration || 0}
            min={0}
            onChange={draghandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
        <div className="play-control">
             <FontAwesomeIcon onClick={()=>skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft}/>
             {isPlaying ?
              <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={faPause}/>
             : 
             <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={faPlay}/>
             }
             
             <FontAwesomeIcon onClick={()=>skipTrackHandler('skip-forward')} className="skip-forward" size="2x" icon={faAngleRight}/>
        </div>
    </div>
)
}

export default Player;