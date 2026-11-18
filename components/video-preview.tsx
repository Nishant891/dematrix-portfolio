"use client";

import { useEffect, useRef, useState } from "react";

export function VideoPreview({ videoId, title, thumbnail }: {
  videoId: string;
  title: string;
  thumbnail: string;
}) {
  const [playing, setPlaying] = useState(false);
  const player = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (playing) player.current?.focus();
  }, [playing]);

  return (
    <div className="video-preview">
      <div className="video-frame">
        {playing ? (
          <iframe
            ref={player}
            src={"https://www.youtube-nocookie.com/embed/" + videoId + "?autoplay=1&rel=0"}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            tabIndex={0}
          />
        ) : (
          <button className="video-play" type="button" onClick={() => setPlaying(true)} aria-label={"Play " + title}>
            <img src={thumbnail} alt="" width="480" height="360" loading="lazy" />
            <span className="video-play-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="m9 5 11 7-11 7Z" /></svg>
            </span>
          </button>
        )}
      </div>
      <a className="video-fallback" href={"https://www.youtube.com/watch?v=" + videoId} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
    </div>
  );
}
