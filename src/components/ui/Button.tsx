import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    children: ReactNode;
}

const Button = ({ className, variant = 'primary', children, ...props }: ButtonProps) => {
    const variants = {
        primary: 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-lg shadow-pink-200 hover:shadow-pink-300',
        secondary: 'bg-white text-pink-500 shadow-md hover:shadow-lg border border-pink-100',
        outline: 'bg-transparent border-2 border-pink-400 text-pink-500 hover:bg-pink-50',
        ghost: 'bg-transparent text-pink-500 hover:bg-pink-50/50',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                'px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2',
                variants[variant],
                className
            )}
            {...props as any}
        >
            {children}
        </motion.button>
    );
};

export default Button;
