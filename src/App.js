import React,{useState,useRef} from "react"
import Player from "./components/Player";
import Song from "./components/Song";
import data from "./data"
import "./styles/app.scss"
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
      //Ref
      const audioRef = useRef(null)
  //State
  const [songs,setSongs] = useState(data())
  const [currentSong,setCurrentSong] = useState(songs[0])
  const [isPlaying,setIsPlaying] = useState(false)
  const [libraryStatus,setLibraryStatus] = useState(false)
     //State
     const [songInfo,setSongInfo] = useState({
      currentTime:0,
      duration:0,
      animationPercentage:0
  })
  const timeUpdateHandler =(e)=>{
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current)
    const roundedDuration = Math.round(duration)
    const animation = Math.round(roundedCurrent / roundedDuration * 100)
    setSongInfo({...songInfo,currentTime :current,duration,animationPercentage:animation})
}
  return (
    <div>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
        <Song currentSong={currentSong} isPlaying={isPlaying}/>
        <Player 
        audioRef={audioRef}
        currentSong={currentSong} 
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        />
        <Library libraryStatus={libraryStatus} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} />
        <audio onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>

    </div>
  );
}

export default App;
