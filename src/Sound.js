import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Song1 from "./Audio/Online_Background_Noises_Relaxing_Sounds_Noise_Masking_2.ogg";
import Song2 from "./Audio/Online_Background_Noises_Relaxing_Sounds_Noise_Masking_4.ogg";
import Song3 from "./Audio/Online_Background_Noises_Relaxing_Sounds_Noise_Masking_5.ogg";
import Song4 from "./Audio/Online_Background_Noises_Relaxing_Sounds_Noise_Masking_6.ogg";
import LoadedSoundEffect from './Audio/magic-charge-mana-2-186628.mp3';
import LoadingSoundEffect from './Audio/magic-castle-crystal-synth-loop-hall-40173.mp3';

export function LoadingSound(){
    return(<audio autoPlay><source src={LoadingSoundEffect} type="audio/mp3"/></audio>);
}
export function LoadedSound(){
    return(<audio autoPlay><source src={LoadedSoundEffect} type="audio/mp3"/></audio>);
}

export default function Sound(){
    let [Music, setMusic] = useState(false);
    let audioRef1 = useRef(null);
    let audioRef2 = useRef(null);
    let audioRef3 = useRef(null);
    let audioRef4 = useRef(null);

    let Play = () => {
        setMusic(PrevMusic => !PrevMusic);
    };

    let Volume = (event) => {
        audioRef1.current.volume = event.target.value;
        audioRef2.current.volume = event.target.value;
        audioRef3.current.volume = event.target.value;
        audioRef4.current.volume = event.target.value;
        if(event.target.value <= 0.01){
            setMusic(PrevMusic => !PrevMusic);
        }
    };

    return(
        <>
        <a style={{color: 'rgba(210, 226, 250, 1)'}}>
            <i onClick={Play} className="btn btn-outline-primary" style={{color: 'rgba(210, 226, 250, 1)'}}>
            {
                Music ? 
                    <i className="bi bi-music-note-beamed fs-6">
                        <audio autoPlay ref={audioRef1} loop><source src={Song1} type="audio/mp3"/></audio>
                        <audio autoPlay ref={audioRef2} loop><source src={Song2} type="audio/mp3"/></audio>
                        <audio autoPlay ref={audioRef3} loop><source src={Song3} type="audio/mp3"/></audio>
                        <audio autoPlay ref={audioRef4} loop><source src={Song4} type="audio/mp3"/></audio>
                    </i> 
                :
                    <i className="bi bi-volume-mute-fill fs-6"></i>
            }
            </i>
            {
            Music ? 
                <><a className="btn btn-outline-primary" style={{color: 'rgba(210, 226, 250, 1)', background: 'rgba(0, 0, 10, 0)'}}><input style={{color: 'rgba(210, 226, 250, 1)', width: '50px'}} type="range" min="0" max="1" step="0.01" onChange={Volume} /></a></>
            :
                null
        }
        </a>
        </>
    );
}