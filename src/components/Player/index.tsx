import styles from './styles.module.scss';
import Image from 'next/image'
import playing from '../../../public/playing.svg';
import shuffle from '../../../public/shuffle.svg';
import playPreviousImg from '../../../public/play-previous.svg';
import playImg from '../../../public/play.svg';
import playNextImg from '../../../public/play-next.svg';
import repeat from '../../../public/repeat.svg';
import pause from '../../../public/pause.svg';
import { useEffect, useRef, useState } from 'react';
import { usePlayer } from '../../hooks/PlayerContext';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';


export function Player() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const { episodeList, currentEpisodeIndex, isPlaying, isShuffling, togglePlay, setPlayingState, playNext, playPrevious, hasNext, hasPrevious, isLooping, toggleLooping, toggleShuffle, clearPlayerState} = usePlayer();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!audioRef.current) {
            return;
        }

        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying])

    function setupProgressListener(){
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', ()=>{
            setProgress(Math.floor(audioRef.current.currentTime));
        })
    }

    function handleSeek (amount: number){
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }

    function handleEpisodeEnded() {
        if(hasNext){
            playNext();
        }else{
            clearPlayerState();
        }
    }

    const episode = episodeList[currentEpisodeIndex]

    return (
        <div className={styles.playerContainer}>
            <header>
                <Image src={playing} alt="Tocando agora" />
                <strong>Tocando agora</strong>
            </header>


            {episode ? (
                <div className={styles.currentEpisode}>
                    <Image width={592} height={592} src={episode.thumbnail} objectFit='cover' />
                    <strong>{episode.title}</strong>
                    <strong>{episode.members}</strong>
                </div>
            ) : (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>
            )}

            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>{convertDurationToTimeString(progress)}</span>
                    <div className={styles.slider}>
                        {episode ? (
                            <Slider max={episode.duration} value={progress} onChange={handleSeek} trackStyle={{ backgroundColor: '#04d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }} />
                        ) : (
                            <div className={styles.emptySlider} />
                        )}
                    </div>
                    <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
                </div>

                {episode && (
                    <audio src={episode.url} ref={audioRef} autoPlay onEnded={handleEpisodeEnded} loop={isLooping} onPlay={() => setPlayingState(true)} onPause={() => setPlayingState(false)} onLoadedMetadata={setupProgressListener} />

                )}

                <div className={styles.buttons}>
                    <button type="button" disabled={!episode || episodeList.length === 1} onClick={toggleShuffle} className={isShuffling ? styles.isActive : ''}>
                        <Image src={shuffle} alt="Embaralhar" />
                    </button>
                    <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
                        <Image src={playPreviousImg} alt="Tocar anterior" />
                    </button>
                    <button type="button" className={styles.playButton} disabled={!episode} onClick={togglePlay}>
                        {isPlaying ? <Image src={pause} alt="Tocar" /> : <Image src={playImg} alt="Tocar" />}
                    </button>
                    <button type="button" onClick={playNext} disabled={!episode || !hasNext}>
                        <Image src={playNextImg} alt="Tocar proxima" />
                    </button>
                    <button type="button" disabled={!episode} onClick={toggleLooping} className={isLooping ? styles.isActive : ''}>
                        <Image src={repeat} alt="Repetir" />
                    </button>

                </div>
            </footer>
        </div>
    );
}