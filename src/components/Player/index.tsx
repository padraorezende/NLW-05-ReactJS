import styles from './styles.module.scss';
import Image from 'next/image'
import playing from '../../../public/playing.svg';
import shuffle from '../../../public/shuffle.svg';
import playPrevious from '../../../public/play-previous.svg';
import play from '../../../public/play.svg';
import playNext from '../../../public/play-next.svg';
import repeat from '../../../public/repeat.svg';

export function Player() {
    return (
        <div className={styles.playerContainer}>
            <header>
                <Image src={playing} alt="Tocando agora" />
                <strong>Tocando agora</strong>
            </header>


            <div className={styles.emptyPlayer}>
                <strong>Selecione um podcast para ouvir</strong>
            </div>

            <footer className={styles.empty}>
                <div className={styles.progress}>
                    <span>00.00</span>
                    <div className={styles.slider}>
                        <div className={styles.emptySlider} />
                    </div>
                    <span>00.00</span>
                </div>

                <div className={styles.buttons}>
                    <button type="button">
                        <Image src={shuffle} alt="Embaralhar" />
                    </button>
                    <button type="button">
                        <Image src={playPrevious} alt="Tocar anterior" />
                    </button>
                    <button type="button" className={styles.playButton}>
                        <Image src={play} alt="Tocar" />
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