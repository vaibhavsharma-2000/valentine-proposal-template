import { motion } from 'framer-motion';
import { Heart, ArrowDown } from 'lucide-react';
import Button from '../ui/Button';

interface EntryProps {
    onStart: () => void;
    started: boolean;
}

const Entry = ({ onStart, started }: EntryProps) => {
    return (
        <div className="h-screen flex flex-col items-center justify-center p-6 text-center relative z-10">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="bg-white/40 backdrop-blur-xl p-10 rounded-[40px] border border-white/60 shadow-2xl max-w-sm w-full"
            >
                <div className="mb-6 inline-block p-4 bg-white rounded-full shadow-lg">
                    <Heart className="text-pink-500 fill-pink-500 animate-pulse" size={32} />
                </div>
                <h1 className="text-3xl font-body font-bold text-gray-800 mb-2">Hey you 💗</h1>
                <p className="text-gray-600 mb-8 font-body">Ready to go on a little journey with me?</p>
                <p className="text-sm text-pink-400 font-handwriting mb-8 rotate-[-2deg]">It's cute, I promise.</p>

                <div className="flex flex-col gap-3">
                    <Button onClick={onStart} className="w-full">
                        Yes, let's go ✨
                    </Button>
                    <button
                        onClick={onStart}
                        className="text-gray-400 text-sm hover:text-pink-500 transition-colors py-2 font-body"
                    >
                        I'm curious...
                    </button>
                </div>
            </motion.div>

            {started && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-10 animate-bounce text-pink-400"
                >
                    <ArrowDown size={32} />
                </motion.div>
            )}
        </div>
    );
};

export default Entry;
