import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/ui/tubelight-navbar';
import { Home as HomeIcon, Music2, User, Library as LibraryIcon, Settings as SettingsIcon } from 'lucide-react';
import HeroWithOrbEffect from './components/hero-with-orb-effect';
import { LyricsList } from './components/blocks/lyrics-list';
import { ArtistList } from './components/blocks/artist-list';
import ArtistDetail from './components/blocks/artist-detail'; 
import { Library } from './components/blocks/library';
import { Settings } from './components/blocks/settings';
import LyricsDetail from './components/blocks/lyrics-detail'; 
import './App.css';

function App() {
  const navItems = [
    { name: 'Home', url: '/', icon: HomeIcon },
    { name: 'Songs', url: '/search', icon: Music2 },
    { name: 'Artists', url: '/artist', icon:  User},
    { name: 'Library', url: '/library', icon: LibraryIcon },
    { name: 'Settings', url: '/settings', icon: SettingsIcon }
  ];

  return (
    <>
      <NavBar items={navItems} />
      <Routes>
        <Route path="/" element={<HeroWithOrbEffect />} />
        <Route path="/search" element={<LyricsList />} />
        <Route path="/artist" element={<ArtistList />} />
        <Route path="/artist/:id" element={<ArtistDetail />} /> 
        <Route path="/library" element={<Library />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/lyrics/:id" element={<LyricsDetail />} /> 
      </Routes>
    </>
  );
}

export default App;