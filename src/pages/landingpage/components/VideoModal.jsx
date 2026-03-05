import React, { useRef, useState, useEffect } from 'react';
import { PlayCircle, PauseCircle, Volume2, VolumeX, Maximize2, Minimize2, X } from 'lucide-react';
import IntroVideo from '../../../assets/intro-video.mp4';
import ReLinkLogo from '../../../assets/RelinkLOGO.jpeg';

const VideoModal = ({ isOpen, onClose }) => {
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
    }
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleVideoSeek = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = (x / rect.width) * 100;
      const time = (percent / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setVideoProgress(percent);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeIn 0.3s ease'
    }} onClick={onClose}>
      <div style={{
        width: '90%',
        maxWidth: '1000px',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        animation: 'scaleIn 0.3s ease'
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ position: 'relative', paddingTop: '56.25%' }}>
          <video
            ref={videoRef}
            src={IntroVideo}
            poster={ReLinkLogo}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
            onTimeUpdate={handleVideoTimeUpdate}
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
          />
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{
          padding: '1rem',
          backgroundColor: '#fafafa',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <button onClick={toggleVideoPlay} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#10b981' }}>
            {isVideoPlaying ? <PauseCircle size={32} /> : <PlayCircle size={32} />}
          </button>

          <div style={{ flex: 1, height: '4px', backgroundColor: '#e5e5e5', borderRadius: '2px', cursor: 'pointer' }} onClick={handleVideoSeek}>
            <div style={{ width: `${videoProgress}%`, height: '100%', backgroundColor: '#10b981', borderRadius: '2px' }} />
          </div>

          <button onClick={() => setIsMuted(!isMuted)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#10b981' }}>
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>

          <button onClick={toggleFullscreen} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#10b981' }}>
            {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;