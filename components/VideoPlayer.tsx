// components/VideoPlayer.tsx
'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import "plyr-react/plyr.css";

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
}: VideoPlayerProps) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return <div style={{ width, height }} className={className} />; // Placeholder to prevent layout shift
    }

    const getProvider = (url: string) => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
        if (url.includes('vimeo.com')) return 'vimeo';
        return 'html5';
    };

    const getVideoId = (url: string, provider: string) => {
        if (provider === 'youtube') {
            const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            const match = url.match(regExp);
            return (match && match[7].length === 11) ? match[7] : url;
        }
        if (provider === 'vimeo') {
            const regExp = /^.*(vimeo\.com\/)((channels\/[^\/]+\/)|(groups\/[^\/]+\/content\/)|(album\/[^\/]+\/video\/))?([0-9]+)/;
            const match = url.match(regExp);
            return match ? match[6] : url;
        }
        return url;
    };

    const provider = getProvider(url);
    const videoSrc = getVideoId(url, provider);

    const plyrSource: any = {
        type: 'video',
        sources: [
            {
                src: videoSrc,
                provider: provider,
            },
        ],
    };

    const plyrOptions = {
        autoplay: playing,
        muted: muted,
        loop: { active: loop },
        controls: controls ? ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'] : [],
        settings: ['quality', 'speed'],
        playsinline: playsInline,
        ...config
    };

    return (
        <div className={`video-player-container ${className}`} style={{ width, height, overflow: 'hidden' }}>
            <div className="plyr__wrapper" style={{ height: '100%', width: '100%' }}>
                <Plyr
                    source={plyrSource}
                    options={plyrOptions}
                />
            </div>
            <style jsx global>{`
                .video-player-container .plyr {
                    height: 100% !important;
                    width: 100% !important;
                }
                .video-player-container .plyr__video-wrapper {
                    height: 100% !important;
                }
                .video-player-container .plyr video {
                    height: 100% !important;
                    object-fit: cover;
                }
            `}</style>
        </div>
    );
};

export default VideoPlayer;
