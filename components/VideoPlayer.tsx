// components/VideoPlayer.tsx
'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { ReactPlayerProps } from '@/lib/features/types';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as React.ComponentType<ReactPlayerProps>;

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

    return (
        <ReactPlayer
            url={url}
            width={width}
            height={height}
            playing={playing}
            muted={muted}
            loop={loop}
            controls={controls}
            playsInline={playsInline}
            config={config}
            className={className}
        />
    );
};

export default VideoPlayer;