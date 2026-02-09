
interface SiteConfig {
    author: string;
    authorWebsite: string;
    music: {
        url: string;
        label: string;
    };
    names: {
        recipient: string;
        sender: string;
    };
    date: {
        targetDate: string; // Format: YYYY-MM-DD
        targetTime: string; // Format: HH:MM
    };
    redirects: {
        email: string;
        instagram: string;
    };
}

export const siteConfig: SiteConfig = {
    author: "Vaibhav Sharma",
    authorWebsite: "https://www.vaibhavsharma.de",

    music: {
        // Default: "Hopeful Love" from Pixabay
        url: "/music/lkoliks-hopeful-love-romantic-music-331770.mp3",
        label: "Background Music"
    },

    names: {
        recipient: "My Valentine",
        sender: "Secret Admirer"
    },

    date: {
        targetDate: "2026-02-14",
        targetTime: "19:00"
    },

    redirects: {
        email: "replace_with_your_email@gmail.com",
        instagram: "https://instagram.com/your_username"
    }
};
