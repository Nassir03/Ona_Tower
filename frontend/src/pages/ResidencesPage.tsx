import React from 'react';
import { InteriorsStory } from '../components/InteriorsStory';
import { PenthousesSection } from '../components/PenthousesSection';
import { ResidenceSelector } from '../components/ResidenceSelector';
import { ResidencesIntro } from '../components/ResidencesIntro';
import { navigate } from '../routing';

export const ResidencesPage: React.FC = () => (
  <>
    <ResidencesIntro />
    <ResidenceSelector />
    <PenthousesSection onEnquireClick={() => navigate('/enquire')} />
    <InteriorsStory />
  </>
);
