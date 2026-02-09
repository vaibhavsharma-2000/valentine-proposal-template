import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { journeyPhotos } from '../../constants/options';

interface JourneySectionProps {
    onComplete: () => void;
}

const Journey = ({ onComplete }: JourneySectionProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollPosition = scrollRef.current.scrollLeft;
            const width = scrollRef.current.offsetWidth;
            // Provide a buffer for snapping
            // const index = Math.round(scrollPosition / (width * 0.6));
            // Approximate index calculation since cards are smaller than full width on mobile
            // Better to rely on IntersectionObserver in a real robust app, but simple math works for this constrained layout

            // Let's use a simpler logic: center point
            const center = scrollPosition + width / 2;
            const children = scrollRef.current.children;
            let closestIndex = 0;
            let minDistance = Infinity;

            for (let i = 0; i < children.length; i++) {
                const child = children[i] as HTMLElement;
                const childCenter = child.offsetLeft + child.offsetWidth / 2;
                const distance = Math.abs(center - childCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = i;
                }
            }
            setActiveIndex(closestIndex);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-8 z-10 px-4"
            >
                <h2 className="text-3xl font-body font-bold text-gray-800">Our Journey So Far</h2>
                <p className="text-pink-400 font-handwriting text-xl mt-2">Just a few favorite moments</p>
            </motion.div>

            {/* Carousel */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory w-full max-w-sm md:max-w-2xl px-8 gap-4 scrollbar-hide pb-10 z-10"
            >
                {journeyPhotos.map((photo, index) => (
                    <motion.div
                        key={index}
                        className={`
              flex-shrink-0 w-full snap-center flex flex-col items-center justify-center
              transition-all duration-500
              ${index === activeIndex ? 'scale-100 opacity-100' : 'scale-90 opacity-70'}
            `}
                    >
                        <div className="bg-white p-4 rounded-3xl shadow-xl rotate-1 hover:rotate-0 transition-transform duration-300 transform-gpu">
                            <div className="w-full aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 mb-4">
                                <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" />
                            </div>
                            <p className="font-body text-gray-700 font-medium text-center">{photo.caption}</p>
                            <p className="font-handwriting text-pink-400 text-center text-sm mt-1">{photo.date}</p>
                        </div>
                    </motion.div>
                ))}

                {/* End Card - Trigger for Next Section */}
                <motion.div
                    className="flex-shrink-0 w-full snap-center flex flex-col items-center justify-center"
                >
                    <div className="h-96 flex flex-col items-center justify-center text-center p-8 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/50 shadow-sm mx-4">
                        <h3 className="text-2xl font-body text-gray-800 mb-6">And the best is yet to come...</h3>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onComplete}
                            className="bg-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-pink-200 flex items-center gap-2"
                        >
                            Continue <ChevronRight size={18} />
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Progress Dots */}
            <div className="flex gap-2 mt-4 z-10">
                {journeyPhotos.map((_, i) => (
                    <div
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-pink-500' : 'w-2 bg-pink-200'}`}
                    />
                ))}
                <div
                    className={`h-2 rounded-full transition-all duration-300 ${activeIndex === journeyPhotos.length ? 'w-8 bg-pink-500' : 'w-2 bg-pink-200'}`}
                />
            </div>
        </div>
    );
};

export default Journey;
