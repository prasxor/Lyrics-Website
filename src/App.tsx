

import { Routes, Route } from 'react-router-dom';
import { Hero } from './components/blocks/hero-with-orb-effect';
import { SearchResults } from './components/blocks/search-results';
import { Settings } from './components/blocks/settings';
import { Library } from './components/blocks/library';
import { LyricsList } from './components/blocks/lyrics-list';
import LyricsDetail from './components/blocks/lyrics-detail';
import { AddSongForm } from './components/blocks/add-song-form';
import { NavBar } from './components/ui/tubelight-navbar';
import { Home as HomeIcon, Music2, Search, User, Library as LibraryIcon, Settings as SettingsIcon } from 'lucide-react';
import React from 'react';
import './App.css';
import { ArtistList } from './components/blocks/artist-list';
import ArtistDetail from './components/blocks/artist-detail'; // Import ArtistDetail component

function App() {
  const navItems = [
    { name: 'Home', url: '/', icon: HomeIcon },
    { name: 'Songs', url: '/search', icon: User },
    { name: 'Artists', url: '/artist', icon: Music2 },
    { name: 'Library', url: '/library', icon: LibraryIcon },
    { name: 'Settings', url: '/settings', icon: SettingsIcon },
    { name: 'Profile', url: '/profile', icon: User }
  ];

  return (
    <>
      <NavBar items={navItems} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={
            <Hero 
              mainHeading="Find Your Favorite Song Lyrics"
              tagline="Search millions of song lyrics from your favorite artists"
            />
          } />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/library" element={<Library />} />
          <Route path="/lyrics" element={<LyricsList />} />
          <Route path="/lyrics/:title" element={<LyricsDetail />} />
          <Route path="/add-song" element={<AddSongForm />} />
          <Route path="/artist" element={<ArtistList />} />
          <Route path="/artist/:artistId" element={<ArtistDetail />} /> {/* Define artist-detail route */}
        </Routes>
      </div>
    </>
  );
}

export default App;