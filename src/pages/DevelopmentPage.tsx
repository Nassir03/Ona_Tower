import React from 'react';
import { ArchitectureSection } from '../components/ArchitectureSection';
import { Development } from '../components/Development';
import { OnaIdea } from '../components/OnaIdea';
import { navigate } from '../routing';

export const DevelopmentPage: React.FC = () => (
  <>
    <OnaIdea
      onExploreResidences={() => navigate('/residences')}
      onExploreLifestyle={() => navigate('/lifestyle')}
      onExploreCommercial={() => navigate('/commercial')}
    />
    <Development />
    <ArchitectureSection />
  </>
);
