import { motion } from 'framer-motion';
import { Flower2, Heart, Sparkles, Cloud } from 'lucide-react';
import { useEffect, useState } from 'react';

const FloatingElements = () => {
    const [elements, setElements] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number; Type: any; color: string }[]>([]);

    useEffect(() => {
        // Generate random floating elements
        const newElements = Array.from({ length: 15 }).map((_, i) => {
            const types = [Flower2, Heart, Sparkles, Cloud];
            const colors = ['text-pink-300', 'text-rose-200', 'text-purple-200', 'text-orange-100'];

            return {
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 20 + 10,
                duration: Math.random() * 10 + 10,
                delay: Math.random() * 5,
                Type: types[Math.floor(Math.random() * types.length)],
                color: colors[Math.floor(Math.random() * colors.length)]
            };
        });
        setElements(newElements);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {elements.map((el) => (
                <motion.div
                    key={el.id}
                    className={`absolute ${el.color} opacity-30`}
                    style={{
                        left: `${el.x}%`,
                        top: `${el.y}%`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, Math.random() * 50 - 25, 0],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: el.duration,
                        repeat: Infinity,
                        delay: el.delay,
                        ease: "linear"
                    }}
                >
                    <el.Type size={el.size} />
                </motion.div>
            ))}

            {/* Texture / Noise Overlay for "Retro" feel */}
            <div className="absolute inset-0 opacity-[0.03] bg-repeat pointer-events-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
            />
        </div>
    );
};

export default FloatingElements;
