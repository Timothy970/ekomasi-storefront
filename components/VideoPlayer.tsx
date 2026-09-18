// components/VideoPlayer.tsx
'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import "plyr-react/plyr.css";
import { extractVideoId } from '@/lib/utils';

// Dynamic import for Plyr to avoid SSR issues
const Plyr = dynamic<any>(() => import('plyr-react').then(mod => mod.Plyr), {
    ssr: false,
    loading: () => <div className="plyr-placeholder" />
});

interface VideoPlayerProps {
    url: string;
    playing?: boolean;
    muted?: boolean;
    loop?: boolean;
    controls?: boolean;
    playsInline?: boolean;
    width?: string | number;
    height?: string | number;
    className?: string;
    config?: any;
}

const VideoPlayer = ({
    url,
    playing = true,
    muted = true,
    loop = true,
    controls = false,
    playsInline = true,
    width = '100%',
    height = '100%',
    className = '',
    config
}: Readonly<VideoPlayerProps>) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return <div style={{ width, height }} className={className} />; // Placeholder to prevent layout shift
    }

    const videoInfo = extractVideoId(url);

    if (!videoInfo) {
        return (
            <div
                className={`video-player-placeholder ${className}`}
                style={{ width, height, backgroundColor: 'var(--muted)' }}
            />
        );
    }

    const { id: videoSrc, provider } = videoInfo;

    const finalProvider = (provider === 'youtube' && videoSrc.includes('/') && !videoSrc.includes('youtube')) ? 'html5' : provider;

    const plyrSource: any = {
        type: 'video',
        sources: [
            {
                src: videoSrc,
                provider: finalProvider,
            },
        ],
    };

    const plyrOptions = {
        muted: muted,
        autoplay: playing,
        loop: { active: loop },
        controls: controls ? ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'] : [],
        settings: ['quality', 'speed'],
        playsinline: playsInline,
        ...config,
        // muted: true, // Force muted to true as per user request
    };


    return (
        <div
            className={`video-player-wrapper ${className}`}
            style={{
                width: width,
                height: height,
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: 'var(--ebony)'
            }}
        >
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{ width: '100%', height: '100%' }}>
                    <Plyr
                        key={videoSrc}
                        source={plyrSource}
                        options={plyrOptions}
                    />
                </div>
            </div>
            <style jsx global>{`
                .video-player-wrapper .plyr {
                    height: 100% !important;
                    width: 100% !important;
                    min-width: 0 !important;
                    max-width: 100% !important;
                }
                .video-player-wrapper .plyr__video-wrapper,
                .video-player-wrapper .plyr__video-embed {
                    height: 100% !important;
                    width: 100% !important;
                    padding-bottom: 0 !important;
                    background: transparent;
                }
                .video-player-wrapper .plyr__poster {
                    background-size: cover;
                }
                .video-player-wrapper .plyr iframe,
                .video-player-wrapper .plyr video {
                    height: 100% !important;
                    width: 100% !important;
                    object-fit: cover;
                    /* For YouTube iframe, we often need to scale it to cover if the aspect ratio differs */
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(1.1); /* Slightly overscale to ensure cover effect for iframes */
                }
                /* Hide YouTube/Vimeo controls and logos if possible through CSS if Plyr options aren't enough */
                .video-player-wrapper .plyr__video-embed iframe {
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
};

export default VideoPlayer;
