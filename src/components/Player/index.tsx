import styles from './styles.module.scss';
import Image from 'next/image'
import playing from '../../../public/playing.svg';
import shuffle from '../../../public/shuffle.svg';
import playPrevious from '../../../public/play-previous.svg';
import playImg from '../../../public/play.svg';
import playNext from '../../../public/play-next.svg';
import repeat from '../../../public/repeat.svg';
import { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


export function Player() {
    const { episodeList, currentEpisodeIndex } = useContext(PlayerContext)

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
            ): (
                <div className={styles.emptyPlayer}>
                <strong>Selecione um podcast para ouvir</strong>
            </div>
            )}

            <footer className={!episode ?  styles.empty: ''}>
                <div className={styles.progress}>
                    <span>00.00</span>
                    <div className={styles.slider}>
                        {episode ? (
                            <Slider trackStyle={{backgroundColor: '#04d361'}} 
                            railStyle={{backgroundColor: '#9f75ff'}}
                            handleStyle={{borderColor: '#04d361', borderWidth: 4}}/>
                        ) : (
                            <div className={styles.emptySlider} />
                        )}
                    </div>
                    <span>00.00</span>
                </div>

                <div className={styles.buttons}>
                    <button type="button" disabled={!episode}>
                        <Image src={shuffle} alt="Embaralhar" />
                    </button>
                    <button type="button">
                        <Image src={playPrevious} alt="Tocar anterior" />
                    </button>
                    <button type="button" className={styles.playButton}>
                        <Image src={playImg} alt="Tocar" />
                    </button>
                    <button type="button">
                        <Image src={playNext} alt="Tocar proxima" />
                    </button>
                    <button type="button">
                        <Image src={repeat} alt="Repetir" />
                    </button>

                </div>
            </footer>
        </div>
    );
}