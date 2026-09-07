import React from 'react';
import { Hero } from '../components/Hero';
import { HeroReveal } from '../components/HeroReveal';
import { HomeNextSteps } from '../components/home/HomeNextSteps';
import { navigate } from '../routing';

export const HomePage: React.FC = () => {
  const reveal = () => document.getElementById('hero-reveal')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      <Hero onExploreClick={reveal} />
      <HeroReveal
        onLiveClick={() => navigate('/residences')}
        onLifeClick={() => navigate('/lifestyle')}
        onWorkClick={() => navigate('/commercial')}
      />
      <HomeNextSteps />
    </>
  );
};
