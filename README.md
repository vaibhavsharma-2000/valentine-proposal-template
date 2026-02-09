# Valentine's Proposal Site 💖

A beautiful, interactive, and mobile-first Valentine's Day proposal website. This site takes your special someone on a journey through your memories, lets them customize their perfect date, and ends with a romantic proposal.

**Created by [Vaibhav Sharma](https://www.vaibhavsharma.de)**

## ✨ Features

- **Interactive Journey**: A timeline of your relationship.
- **Date Planning Game**: Let them choose their favorite food, drinks, and activities. via interactive cards.
- **Dynamic Proposal**: A "Will you be my Valentine?" moment with confetti.
- **Calendar & Email Integration**: Automatically generates a Google Calendar event and a pre-filled email with their choices.
- **Background Music**: Plays romantic music to set the mood.
- **Responsive Design**: Works perfectly on mobile and desktop.

## 🚀 Getting Started

### 1. Prerequisite
- Node.js installed on your computer.

### 2. Installation
```bash
npm install
```

### 3. Run Locally
```bash
npm run dev
```

## 🛠️ Customization

### 1. Configuration (`src/config.ts`)
Open `src/config.ts` to customize the core settings:
- **Names**: Change sender (`Secret Admirer`) and recipient (`My Valentine`) names.
- **Email**: Update `redirects.email` to **YOUR email address** so you receive their date choices.
- **Date**: Set the `targetDate` for your Valentine's date (defaults to Feb 14, 2026).
- **Music**: The default track is located at `public/music/`.
    - To change it:
        1. Add your `.mp3` file to `public/music/`.
        2. Update `music.url` in `src/config.ts` (e.g., `url: "/music/your-song.mp3"`).

### 2. Adding Images
Replace the placeholder images in `src/assets` or update the paths in the components.
- **Photos**: Add your personal photos to `src/assets/photos/`.
- **Food/Drink Icons**: Food/Drink images are currently using Unsplash URLs in `src/constants/options.ts`. You can replace these with local images if desired.

### 3. Deployment
You can deploy this for free on [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
1.  Push your code to a GitHub repository.
2.  Connect your repository to Vercel/Netlify.
3.  It will automatically detect `vite` and deploy.

## 📖 Usage Scenarios

### Long Distance 🌍
This site is **perfect** for long-distance couples. The "Date Planner" allows them to choose what they *would* like to do when you meet, or plan a virtual date (e.g., "Order Pizza" + "Watch Movie on Discord").

### Local / In-Person 🏠
Use it as a pre-date teaser! Send them the link in the morning, let them "build" the date, and then surprise them by making it happen that evening.

## 📄 License & Credits

Feel free to use and modify this template for your own Valentine!

If you fork or share this project, **please keep the credit to [Vaibhav Sharma](https://www.vaibhavsharma.de)** in the footer or README.

Happy Valentine's Day! 💘
