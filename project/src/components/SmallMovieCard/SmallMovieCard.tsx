import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../../types/film';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

type SmallMovieCardProps = {
  film: Film;
};

function SmallMovieCard({ film }: SmallMovieCardProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsPlaying(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsPlaying(false);
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="small-film-card__image">
        <VideoPlayer
          src={film.videoLink}
          poster={film.previewImage}
          isPlaying={isPlaying}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default SmallMovieCard;
