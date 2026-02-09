import { useState, useRef, useEffect } from 'react';
import { Music, Music4 } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteConfig } from '../../config';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio(siteConfig.music.url);
        // Using a royalty-free lofi track as placeholder
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        return () => {
            audioRef.current?.pause();
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-colors duration-300 ${isPlaying ? 'bg-pink-500 text-white' : 'bg-white/50 backdrop-blur-md text-gray-600'}`}
        >
            {isPlaying ? <Music size={20} className="animate-pulse" /> : <Music4 size={20} />}
        </motion.button>
    );
};

export default MusicPlayer;
