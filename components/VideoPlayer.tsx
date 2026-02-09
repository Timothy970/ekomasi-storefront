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

    const provider = getProvider(url);
    // For YouTube/Vimeo, Plyr expects the video ID as src, not the full URL
    const videoSrc = provider !== 'html5' ? url.split('/').pop()?.split('?')[0] : url;

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
        <div className={className} style={{ width, height, overflow: 'hidden' }}>
            <Plyr
                source={plyrSource}
                options={plyrOptions}
            />
        </div>
    );
};

export default VideoPlayer;
