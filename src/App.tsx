import { useState, useRef } from 'react';
import FloatingElements from './components/branding/FloatingElements';
import MusicPlayer from './components/ui/MusicPlayer';
import Entry from './components/sections/Entry';
import Journey from './components/sections/Journey';
import GameSection from './components/sections/GameSection';
import Summary from './components/sections/Summary';
import Proposal from './components/sections/Proposal';
import Celebration from './components/sections/Celebration';
import confetti from 'canvas-confetti';

// Import Data
import {
  foodOptions,
  drinkOptions,
  sweetOptions,
  activityOptions,
  herOutfitOptions,
  hisOutfitOptions
} from './constants/options';

function App() {
  const [started, setStarted] = useState(false);
  const [selections, setSelections] = useState({
    food: null as string | null,
    drink: null as string | null,
    sweet: null as string | null,
    activity: null as string | null,
    herOutfit: null as string | null,
    hisOutfit: null as string | null,
  });

  const [proposalAccepted, setProposalAccepted] = useState(false);

  // Section Refs
  const entryRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const foodRef = useRef<HTMLDivElement>(null);
  const drinkRef = useRef<HTMLDivElement>(null);
  const sweetRef = useRef<HTMLDivElement>(null);
  const activityRef = useRef<HTMLDivElement>(null);
  const herOutfitRef = useRef<HTMLDivElement>(null);
  const hisOutfitRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const proposalRef = useRef<HTMLDivElement>(null);
  const celebrationRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStart = () => {
    setStarted(true);
    setTimeout(() => scrollTo(journeyRef), 100);
  };

  const handleProposalYes = () => {
    setProposalAccepted(true);
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#F472B6', '#FBCFE8', '#FFD700']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#F472B6', '#FBCFE8', '#FFD700']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    setTimeout(() => scrollTo(celebrationRef), 500);
  };

  return (
    <div className="relative font-body text-gray-800 bg-gradient-to-br from-pink-50 via-white to-orange-50 min-h-screen overflow-x-hidden selection:bg-pink-200 selection:text-pink-900">

      <FloatingElements />
      <MusicPlayer />

      {/* Screen 1: Entry */}
      <div ref={entryRef}>
        <Entry onStart={handleStart} started={started} />
      </div>

      {/* Screen 2: Journey */}
      <div ref={journeyRef}>
        <Journey onComplete={() => scrollTo(foodRef)} />
      </div>

      {/* Game Sections */}
      <div ref={foodRef}>
        <GameSection
          id="food"
          title="What are you in the mood to eat?"
          options={foodOptions}
          selectedValue={selections.food}
          onSelect={(id) => setSelections(s => ({ ...s, food: id }))}
          onNext={() => scrollTo(drinkRef)}
        />
      </div>

      <div ref={drinkRef}>
        <GameSection
          id="drink"
          title="What should we drink?"
          options={drinkOptions}
          selectedValue={selections.drink}
          onSelect={(id) => setSelections(s => ({ ...s, drink: id }))}
          onNext={() => scrollTo(sweetRef)}
          variant="drink" // Liquid fill animation
        />
      </div>

      <div ref={sweetRef}>
        <GameSection
          id="sweet"
          title="Something sweet?"
          options={sweetOptions}
          selectedValue={selections.sweet}
          onSelect={(id) => setSelections(s => ({ ...s, sweet: id }))}
          onNext={() => scrollTo(activityRef)}
        />
      </div>

      <div ref={activityRef}>
        <GameSection
          id="activity"
          title="What should we do together?"
          options={activityOptions}
          selectedValue={selections.activity}
          onSelect={(id) => setSelections(s => ({ ...s, activity: id }))}
          onNext={() => scrollTo(herOutfitRef)}
        />
      </div>

      <div ref={herOutfitRef}>
        <GameSection
          id="herOutfit"
          title="What would you like to wear?"
          options={herOutfitOptions}
          selectedValue={selections.herOutfit}
          onSelect={(id) => setSelections(s => ({ ...s, herOutfit: id }))}
          onNext={() => scrollTo(hisOutfitRef)}
        />
      </div>

      <div ref={hisOutfitRef}>
        <GameSection
          id="hisOutfit"
          title="What should I wear?"
          options={hisOutfitOptions}
          selectedValue={selections.hisOutfit}
          onSelect={(id) => setSelections(s => ({ ...s, hisOutfit: id }))}
          onNext={() => scrollTo(summaryRef)}
        />
      </div>

      {/* Summary */}
      <div ref={summaryRef}>
        <Summary
          selections={selections}
          onComplete={() => scrollTo(proposalRef)}
        />
      </div>

      {/* Proposal */}
      <div ref={proposalRef}>
        <Proposal onYes={handleProposalYes} />
      </div>

      {/* Celebration */}
      {proposalAccepted && (
        <div ref={celebrationRef}>
          <Celebration selections={selections} />
        </div>
      )}
    </div>
  );
}

export default App;
