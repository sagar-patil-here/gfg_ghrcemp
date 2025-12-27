import React from 'react';
import Hero from './Hero';
import ClubInfo from './ClubInfo';
import SocialHandles from './SocialHandles';
import { Helmet } from 'react-helmet-async';

interface HomeProps {
  onNavigate?: (view: string, filter?: 'Upcoming' | 'Past') => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <>
      <Helmet>
        <title>Home | GFG GHRCEMP Student Chapter</title>
        <meta name="description" content="Welcome to the GFG Student Chapter at GHRCEMP. Explore our mission, upcoming events, and join a thriving community of student developers." />
      </Helmet>
      <Hero onNavigate={onNavigate} />
      <ClubInfo />
      <SocialHandles />
    </>
  );
};

export default Home;
