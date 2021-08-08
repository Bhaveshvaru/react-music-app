import React from "react";
import LibrarySong from "./LibrarySong"

const Library = ({setSongs,isPlaying,audioRef,songs,setCurrentSong,libraryStatus})=>{

    return(
        <div className={`library ${libraryStatus ? 'active-library': ''}`}>
            <h1>Library</h1>
            <div className="library-songs">
                  {songs.map((song) => (
                    <LibrarySong
                     songs={songs}
                     setCurrentSong={setCurrentSong}
                     song={song}   
                     key={song.id} 
                     id={song.id}
                     audioRef={audioRef}
                     isPlaying={isPlaying}
                     setSongs={setSongs}
                    />
                  ))}
            </div>
        </div>
    )
}

export default Library;