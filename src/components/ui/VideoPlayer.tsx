import React, { useState, useRef } from 'react';

interface VideoPlayerProps {
  src: string;
  title: string;
  sensei: string;
  category: 'demonstration' | 'kata';
  thumbnail?: string;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  sensei,
  category,
  thumbnail,
  className = '',
  onPlay,
  onPause
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      setIsLoading(true);
      videoRef.current.play();
      setIsPlaying(true);
      onPlay?.();
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      onPause?.();
    }
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const downloadVideo = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `${title} - ${sensei}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (hasError) {
    return (
      <div className={`bg-gray-200 rounded-lg p-6 text-center ${className}`}>
        <div className="text-4xl mb-4">📹</div>
        <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">Sensei: {sensei}</p>
        <p className="text-red-500">Erreur de chargement de la vidéo</p>
      </div>
    );
  }

  return (
    <div 
      className={`relative bg-black rounded-lg overflow-hidden shadow-lg group ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={thumbnail}
        className="w-full h-full object-cover"
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onError={handleError}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Overlay with video info */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">{title}</h3>
              <p className="text-sm opacity-90">Sensei: {sensei}</p>
              <span className={`inline-block px-2 py-1 rounded text-xs mt-2 ${
                category === 'kata' 
                  ? 'bg-purple-600' 
                  : 'bg-blue-600'
              }`}>
                {category === 'kata' ? 'Kata' : 'Démonstration'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Play/Pause Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        {!isPlaying && (
          <button
            onClick={handlePlay}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transform transition-all duration-300 hover:scale-110 group-hover:shadow-xl"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Controls */}
      {(showControls || isPlaying) && (
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={isPlaying ? handlePause : handlePlay}
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          
          <button
            onClick={downloadVideo}
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            title="Télécharger"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      {/* YouTube-style progress bar (simplified) */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
          <div className="h-full bg-red-600 transition-all duration-1000" style={{width: '0%'}}></div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
