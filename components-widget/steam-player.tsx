'use client'
import { useState, useRef } from "react";

export default function SteamPlayer({ playId }:{ playId: string }) {
    const [quality, setQuality] = useState('480P');
    const [currentTime, setCurrentTime] = useState(0);

    const videoRef = useRef<HTMLVideoElement>(null);

    const cdn = [
        'media.st.dl.pinyuncloud.com',     // deprecated
        'cdn.steamchina.pinyuncloud.com',  // deprecated
        'cdn.cloudflare.steamstatic.com',  // <--- this one
        'cdn.akamai.steamstatic.com',
    ][2];

    const _480pSources = [
        <source data-label="480P" src={`https://${cdn}/steam/apps/${playId}/movie480_vp9.webm`} type="video/webm" />,
        <source data-label="480P" src={`https://${cdn}/steam/apps/${playId}/movie480.webm`} type="video/webm" />,
        <source data-label="480P" src={`https://${cdn}/steam/apps/${playId}/movie480.mp4`} type="video/mp4" />,
    ];

    const HDsources = [
        <source data-label="HD" src={`https://${cdn}/steam/apps/${playId}/movie_max_vp9.webm`} type="video/webm" />,
        <source data-label="HD" src={`https://${cdn}/steam/apps/${playId}/movie_max.webm`} type="video/webm" />,
        <source data-label="HD" src={`https://${cdn}/steam/apps/${playId}/movie_max.mp4`} type="video/mp4"  />,
    ];

    function handleQualityChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setQuality(e.target.value);
        const isPlaying = !videoRef.current.paused;
        videoRef.current.load();
        videoRef.current.currentTime = currentTime;
        if (isPlaying) videoRef.current.play();
    }

    return (
        <div className='vidcontainer'>
            <select className='qualitypick' autoComplete='off' title="Quality"
                onChange={(e) => handleQualityChange(e)} 
                value={quality}
            >
                <option>480P</option>
                <option>HD</option>
            </select>
            <video 
                ref={videoRef} controls preload={'metadata'} width={'100%'} 
                poster={`https://${cdn}/steam/apps/${playId}/movie.293x165.jpg`} 
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                className="box-shadow rounded"
            >
                {quality === '480P' ? _480pSources : HDsources}
            <p>To view this video please enable JavaScript</p>
            </video>
        </div>
    );
}