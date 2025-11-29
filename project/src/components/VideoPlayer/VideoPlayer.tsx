import { useEffect, useRef } from 'react';

type VideoPlayerProps = {
    src: string;
    poster: string;
    isPlaying: boolean;
};

function VideoPlayer({ src, poster, isPlaying }: VideoPlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.load();
      }
    }
  }, [isPlaying]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      width="280"
      height="175"
      muted
    />
  );
}

export default VideoPlayer;
