import React,{useRef, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay,faBookReader, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";

const Player = ({currentSong,isPlaying,setIsPlaying,audioRef,setSongInfo,songInfo}) => {
 

    const draghandler = (e)=>{
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo,currentTime:e.target.value})
    }

   

    const getTime = (time)=>{
        return(
            Math.floor(time/60) + ":" + ("0" + Math.floor(time %60)).slice(-2)
        )
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

return(
    <div className="player">
        <div className="time-control">
            <p>{getTime(songInfo.currentTime)}</p>
            <input onChange={draghandler} min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type="range" />
            <p>{getTime(songInfo.duration)}</p>
        </div>
        <div className="play-control">
             <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft}/>
             {isPlaying ?
              <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={faPause}/>
             : 
             <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={faPlay}/>
             }
             
             <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight}/>
        </div>
    </div>
)
}

export default Player;