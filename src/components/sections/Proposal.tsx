import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProposalProps {
    onYes: () => void;
}

const Proposal = ({ onYes }: ProposalProps) => {
    const [noScale, setNoScale] = useState(1);
    const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

    const handleNoHover = () => {
        // Move slightly more aggressively
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        setNoPosition({ x, y });
        setNoScale(s => Math.max(0.5, s - 0.1)); // Shrink
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 overflow-hidden">

            <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="text-4xl md:text-6xl font-body font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-12 drop-shadow-sm leading-tight relative z-20"
            >
                Would you be my Valentine? 🥺
            </motion.h1>

            <div className="flex flex-col md:flex-row items-center gap-6 relative z-20 h-40 w-full max-w-md justify-center">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onYes}
                    className="px-12 py-5 bg-white text-pink-600 rounded-2xl font-black text-xl shadow-xl hover:shadow-pink-200 transition-all border border-pink-100 z-30"
                >
                    YES 💗
                </motion.button>

                <motion.button
                    animate={{ x: noPosition.x, y: noPosition.y, scale: noScale }}
                    onHoverStart={handleNoHover}
                    onTapStart={handleNoHover}
                    className="px-6 py-3 bg-white/40 backdrop-blur-sm text-pink-400 rounded-xl font-bold border border-white/50 hover:bg-white/60 transition-all z-20"
                >
                    No
                </motion.button>
            </div>
        </div>
    );
};

export default Proposal;
