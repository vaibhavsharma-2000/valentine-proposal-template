import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface SelectionCardProps {
    id: string;
    label: string;
    image: string;
    selected: boolean;
    onClick: () => void;
    variant?: 'standard' | 'drink';
}

const SelectionCard = ({ label, image, selected, onClick, variant = 'standard' }: SelectionCardProps) => {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
        relative flex-shrink-0 w-64 h-80 rounded-3xl overflow-hidden shadow-lg transition-all duration-500
        ${selected ? 'ring-4 ring-pink-400 shadow-pink-300 scale-105' : 'ring-1 ring-white/50 hover:shadow-xl'}
        bg-white group snap-center
      `}
        >

            {/* Background Image */}
            <img
                src={image}
                alt={label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 
        ${selected ? 'opacity-80' : 'opacity-60 group-hover:opacity-70'}
      `} />

            {/* Liquid Fill Animation for Drinks */}
            {variant === 'drink' && (
                <motion.div
                    initial={{ height: '0%' }}
                    animate={{ height: selected ? '100%' : '0%' }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                    className="absolute bottom-0 left-0 w-full bg-pink-500/40 mix-blend-overlay z-10"
                />
            )}

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 text-left z-20">
                <span className="text-white font-body font-bold text-xl block mb-1 drop-shadow-md">
                    {label}
                </span>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-pink-200 text-sm font-medium flex items-center gap-1"
                    >
                        <Check size={14} /> Selected
                    </motion.div>
                )}
            </div>

            {/* Selected Indicator Icon */}
            {selected && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 bg-pink-500 text-white p-2 rounded-full shadow-lg z-30"
                >
                    <Check size={20} strokeWidth={3} />
                </motion.div>
            )}

        </motion.button>
    );
};

export default SelectionCard;
