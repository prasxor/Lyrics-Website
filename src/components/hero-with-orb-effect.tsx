import React, { useEffect, useState, useRef } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import lyricsData from '../components/Data/Lyrics.json'; 

interface Song {
  id: number;
  title: string;
  artist: string;
  coverImage?: string;
}

export default function HeroWithOrbEffect() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Song[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length >= 2) {
      const filteredSongs = lyricsData
        .filter(song =>
          song.title.toLowerCase().includes(query.toLowerCase()) ||
          song.artist.toLowerCase().includes(query.toLowerCase())
        )
        .map((song) => ({
          id: Number(song.songId), 
          title: song.title,
          artist: song.artist,
          coverImage: song.coverImage,
        }));
      setSuggestions(filteredSongs);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSuggestionClick = (id: number): void => {
    navigate(`/lyrics/${id}`); 
  };



  return (
    <div style={{paddingTop : 0}}  className="p-0 relative min-h-screen h-screen bg-black mainHeroSection">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -inset-[100px] opacity-50"
          style={{
            background: 'radial-gradient(circle at center, #4f46e5 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="pt-0 relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-6xl ">
          Find Your Favorite Song Lyrics
        </h1>
        <p className="max-w-[600px] mt-4 text-gray-400">
          Search through millions of song lyrics. Get instant access to lyrics, meanings, and more.
        </p>

        <div className="relative w-full max-w-2xl mt-16" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-4 top-2.5 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search for songs..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              className="w-full h-10 pl-12 pr-4 text-white bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute w-full mt-2 overflow-hidden bg-black/90 rounded-lg backdrop-blur-lg border border-white/20">
              {suggestions.map((song) => (
                <div
                  key={song.id}
                  onClick={() => handleSuggestionClick(song.id)} // Handle suggestion click
                  className="flex items-center gap-4 p-4 transition-colors hover:bg-white/10 cursor-pointer"
                >
                  <img
                    src={song.coverImage || 'https://placehold.co/100x100'}
                    alt={song.title}
                    className="w-12 h-12 rounded"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-white">{song.title}</span>
                    <span className="text-sm text-gray-400">{song.artist}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}