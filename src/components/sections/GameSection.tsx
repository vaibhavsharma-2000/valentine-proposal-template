import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight } from 'lucide-react';
import SelectionCard from '../ui/SelectionCard.tsx';

interface Option {
    id: string;
    label: string;
    image: string;
}

interface GameSectionProps {
    id: string;
    title: string;
    options: Option[];
    selectedValue: string | null;
    onSelect: (id: string) => void;
    onNext?: () => void;
    variant?: 'standard' | 'drink';
}

const GameSection = ({
    id,
    title,
    options,
    selectedValue,
    onSelect,
    onNext,
    variant = 'standard'
}: GameSectionProps) => {
    const [isFating, setIsFating] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [highlightedId, setHighlightedId] = useState<string | null>(null);

    const handleFate = () => {
        setIsFating(true);
        let i = 0;
        const interval = setInterval(() => {
            const randomOption = options[i % options.length];
            setHighlightedId(randomOption.id);

            // Auto scroll to highlighted item
            if (scrollRef.current) {
                const item = scrollRef.current.children[i % options.length] as HTMLElement;
                if (item) {
                    scrollRef.current.scrollTo({
                        left: item.offsetLeft - scrollRef.current.offsetWidth / 2 + item.offsetWidth / 2,
                        behavior: 'smooth'
                    });
                }
            }
            i++;
        }, 150);

        setTimeout(() => {
            clearInterval(interval);
            const random = options[Math.floor(Math.random() * options.length)];
            setHighlightedId(null);
            onSelect(random.id);
            setIsFating(false);

            // Scroll to selected
            setTimeout(() => {
                const index = options.findIndex(o => o.id === random.id);
                if (scrollRef.current && index !== -1) {
                    const item = scrollRef.current.children[index] as HTMLElement;
                    scrollRef.current.scrollTo({
                        left: item.offsetLeft - scrollRef.current.offsetWidth / 2 + item.offsetWidth / 2,
                        behavior: 'smooth'
                    });
                }
            }, 100);

        }, 2000);
    };

    return (
        <section id={id} className="min-h-screen flex flex-col justify-center py-20 px-4 relative">
            <div className="max-w-4xl mx-auto w-full">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-body font-bold text-center text-gray-800 mb-12 drop-shadow-sm"
                >
                    {title}
                </motion.h2>

                {/* Horizontal Scroll Container */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-6 pb-12 pt-4 px-4 snap-x snap-mandatory scrollbar-hide mask-fade-sides"
                >
                    {options.map((opt) => (
                        <div key={opt.id} className="snap-center">
                            <SelectionCard
                                id={opt.id}
                                label={opt.label}
                                image={opt.image}
                                selected={selectedValue === opt.id || highlightedId === opt.id}
                                onClick={() => onSelect(opt.id)}
                                variant={variant}
                            />
                        </div>
                    ))}
                </div>

                {/* Fate Button & Next */}
                <div className="flex flex-col items-center gap-6 mt-8">
                    {!selectedValue && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleFate}
                            disabled={isFating}
                            className="px-8 py-3 bg-white/80 backdrop-blur-md text-pink-600 rounded-full font-bold shadow-lg border border-pink-100 flex items-center gap-2 hover:bg-white transition-colors"
                            title="Let fate decide"
                            type="button"
                        >
                            <Sparkles size={18} className={isFating ? "animate-spin" : ""} />
                            {isFating ? "Consulting the stars..." : "Let fate decide ✨"}
                        </motion.button>
                    )}

                    {selectedValue && onNext && (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={onNext}
                            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-full font-bold shadow-lg shadow-pink-200 flex items-center gap-2"
                            type="button"
                        >
                            Continue <ChevronRight size={18} />
                        </motion.button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default GameSection;
