import { motion } from 'framer-motion';
import { siteConfig } from '../../config';
import { Calendar, Mail } from 'lucide-react';
import Button from '../ui/Button';

interface CelebrationProps {
    selections: {
        food: string | null;
        drink: string | null;
        sweet: string | null;
        activity: string | null;
        herOutfit: string | null;
        hisOutfit: string | null;
    };
}

const Celebration = ({ selections }: CelebrationProps) => {
    const generateCalendarLink = () => {
        const title = encodeURIComponent("Our Valentine Date 💖");
        const description = `
Can't wait for our perfect night!

🍽️ Dinner: ${selections.food || 'Surprise'}
🍷 Drinks: ${selections.drink || 'Surprise'}
🍰 Dessert: ${selections.sweet || 'Surprise'}
🎬 Activity: ${selections.activity || 'Surprise'}

👗 You: ${selections.herOutfit || 'Beautiful'}
👔 Me: ${selections.hisOutfit || 'Sharp'}

See you there!
    `.trim();

        const details = encodeURIComponent(description);

        // Format date for Google Calendar (YYYYMMDDTHHMMSSZ)
        // Taking the date from config and adding default duration
        const targetDate = siteConfig.date.targetDate.replace(/-/g, '');
        const targetTime = siteConfig.date.targetTime.replace(/:/g, '') + '00';
        const startDate = `${targetDate}T${targetTime}`;
        // Simple 3-hour duration assumption or could be configurable
        const endTimeNumeric = parseInt(targetTime.substring(0, 4)) + 300; // Add 3 hours
        const endDate = `${targetDate}T${endTimeNumeric.toString().padStart(6, '0')}`;

        const dates = `${startDate}/${endDate}`;
        const location = encodeURIComponent("Google Meet");
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    };

    const generateMailtoLink = () => {
        const subject = encodeURIComponent("My Valentine Date Choices 💖");
        const body = encodeURIComponent(`
Hey! Here is the plan for our date:

🍽️ Dinner: ${selections.food || 'Surprise'}
🍷 Drinks: ${selections.drink || 'Surprise'}
🍰 Dessert: ${selections.sweet || 'Surprise'}
🎬 Activity: ${selections.activity || 'Surprise'}

👗 My Outfit: ${selections.herOutfit || 'Surprise'}
👔 Your Outfit: ${selections.hisOutfit || 'Surprise'}

Can't wait! xoxo
    `.trim());
        return `mailto:${siteConfig.redirects.email}?subject=${subject}&body=${body}`;
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-20">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-sm w-full border border-pink-100"
            >
                <div className="text-6xl mb-4">🎉</div>
                <h1 className="text-4xl font-body font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6">
                    YAY! 💖
                </h1>
                <p className="text-lg text-gray-600 mb-8 font-body">
                    You just made me the happiest person.
                </p>

                <div className="flex flex-col gap-4">
                    <a href={generateCalendarLink()} target="_blank" rel="noreferrer" className="w-full">
                        <Button className="w-full bg-gray-900 shadow-gray-400 hover:shadow-gray-500 text-white">
                            <Calendar size={18} /> Schedule our date
                        </Button>
                    </a>

                    <a href={generateMailtoLink()} className="w-full">
                        <Button variant="secondary" className="w-full">
                            <Mail size={18} /> Send me the plan
                        </Button>
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default Celebration;
