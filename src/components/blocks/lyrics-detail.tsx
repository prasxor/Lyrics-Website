import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, User, Music, Heart } from "lucide-react";
import { useLikes } from "../../context/LikesContext";
import lyricsData from "../Data/Lyrics.json"; 
import "./lyrics-detail.css";

interface LyricsData {
  songId: string;
  title: string;
  artist: string;
  coverImage: string;
  lyrics: string;
  album: string;
  language: string;
  spotifyLink?: string;
}

export default function LyricsDetail() {
  const { id } = useParams<{ id: string }>();
  const { isSongLiked, toggleSongLike } = useLikes();
  const [lyricsDataState, setLyricsDataState] = useState<LyricsData | null>(null);

  useEffect(() => {
    if (id) {
      const song = lyricsData.find((song) => song.songId === id);
      if (song) setLyricsDataState(song);
    }
  }, [id]);

  const handleLike = () => {
    if (lyricsDataState) {
      toggleSongLike(lyricsDataState.songId);
    }
  };

  if (!lyricsDataState) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-red-400">Song not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8 sub-container">
        {/* Left Section - Song Cover & Details */}
        <div className="flex flex-col items-center gap-4 md:w-100 left-container song-detail-container">
          {/* Cover Image */}
          <div className="relative w-40 sm:w-48 md:w-56 rounded-lg overflow-hidden border border-border cover-image">
            <img
              src={lyricsDataState.coverImage || "https://placehold.co/400x400/1a1a1a/white?text=No+Image"}
              alt={lyricsDataState.title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/400x400/1a1a1a/white?text=No+Image";
              }}
            />
            <button
              onClick={handleLike}
              className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
            >
              <Heart
                className={`w-6 h-6 ${isSongLiked(lyricsDataState.songId) ? "fill-red-500 text-red-500" : "text-white"}`}
              />
            </button>
          </div>

          {/* Song Details */}
          <div className="flex flex-col gap-4 text-left main-details">
            <div className="flex items-start gap-4 text-foreground/60 w-full">
              <Music className="h-7 w-7 text-primary" />
              <span className="text-sm md:text-base font-bold text-primary">{lyricsDataState.title}</span>
            </div>

            <div className="flex items-start gap-4 text-foreground/60 w-full">
              <User className="h-7 w-7 text-primary" />
              <span className="text-sm md:text-base font-bold text-primary">{lyricsDataState.artist}</span>
            </div>

            <div className="flex items-start gap-4 text-foreground/60 w-full">
              <Calendar className="h-7 w-7 text-primary" />
              <span className="text-sm md:text-base font-bold text-primary">{lyricsDataState.album}</span>
            </div>
          </div>

          {/* Spotify Embed */}
          {lyricsDataState.spotifyLink && (
            <div className="w-100 sm:w-100 md:w-100 spotify-embed">
              <iframe
                style={{ borderRadius: "12px", height: "100%" }}
                src={lyricsDataState.spotifyLink}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          )}
        </div>

        {/* Right Section - Lyrics */}
        <div className="md:w-100 right-container">
          <h2 className="text-4xl font-bold mb-4 text-primary">Lyrics</h2>
          <div className="lyrics-data bg-transparent p-4 rounded-lg overflow-auto max-h-[600px] text-foreground">
            <pre className="whitespace-pre-wrap lyricsDataContent">{lyricsDataState.lyrics}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
