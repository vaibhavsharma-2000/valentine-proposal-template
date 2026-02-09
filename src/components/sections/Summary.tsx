import { motion } from 'framer-motion';
import Button from '../ui/Button';

interface SummaryProps {
    selections: {
        food: string | null;
        drink: string | null;
        sweet: string | null;
        activity: string | null;
        herOutfit: string | null;
        hisOutfit: string | null;
    };
    onComplete: () => void;
}

const Summary = ({ selections, onComplete }: SummaryProps) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-sm w-full border border-pink-100"
            >
                <h2 className="text-2xl font-body font-bold text-center mb-6 text-gray-800">
                    This sounds like a really good night...
                </h2>

                <div className="space-y-4 mb-8">
                    <div className="flex justify-between border-b border-pink-100 pb-2">
                        <span className="text-gray-500 font-body">Dinner</span>
                        <span className="font-medium text-pink-600 font-body">{selections.food || '...'}</span>
                    </div>
                    <div className="flex justify-between border-b border-pink-100 pb-2">
                        <span className="text-gray-500 font-body">Drinks</span>
                        <span className="font-medium text-pink-600 font-body">{selections.drink || '...'}</span>
                    </div>
                    <div className="flex justify-between border-b border-pink-100 pb-2">
                        <span className="text-gray-500 font-body">Dessert</span>
                        <span className="font-medium text-pink-600 font-body">{selections.sweet || '...'}</span>
                    </div>
                    <div className="flex justify-between border-b border-pink-100 pb-2">
                        <span className="text-gray-500 font-body">Activity</span>
                        <span className="font-medium text-pink-600 font-body">{selections.activity || '...'}</span>
                    </div>
                    <div className="flex justify-between border-b border-pink-100 pb-2">
                        <span className="text-gray-500 font-body">Her Outfit</span>
                        <span className="font-medium text-pink-600 font-body">{selections.herOutfit || '...'}</span>
                    </div>
                    <div className="flex justify-between border-b border-pink-100 pb-2">
                        <span className="text-gray-500 font-body">His Outfit</span>
                        <span className="font-medium text-pink-600 font-body">{selections.hisOutfit || '...'}</span>
                    </div>
                </div>

                <Button onClick={onComplete} className="w-full">
                    One more thing...
                </Button>
            </motion.div>
        </div>
    );
};

export default Summary;
