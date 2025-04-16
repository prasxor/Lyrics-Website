
import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaSpotify } from "react-icons/fa";
import "./ArtistDetail.css"
import { Heart, User, Instagram, Twitter, Youtube } from "lucide-react";
import artistData from "../Data/Artist.json";
import lyricsData from "../Data/Lyrics.json";
import { useLikes } from "../../context/LikesContext";

const ArtistDetail = () => {
  const { id } = useParams();
  const { isArtistLiked, toggleArtistLike } = useLikes();
  const artist = artistData.find((a) => a.artistId === id);

  if (!artist) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-red-400">Artist not found</div>
      </div>
    );
  }

  const artistSongs = lyricsData.filter((song) => {
    if (!song.artist) return false;
    const songArtists = song.artist
      .toLowerCase()
      .split(",")
      .map((a) => a.trim());
    return songArtists.includes(artist.name.toLowerCase());
  });

  const isLiked = isArtistLiked(artist.artistId);

  // Extracting bio up to the first period
  const bioShort = artist.bio.split(".")[0] + ".";

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8 sub-container">
        {/* Left Section - Artist Profile & Details */}
        <div className="flex flex-col items-center gap-4 md:w-100 left-container">
          <div className="relative w-40 sm:w-48 md:w-56 rounded-lg overflow-hidden border border-border cover-image artistprofile">
            <img
              src={artist.profileImage}
              alt={artist.name}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
            <button
              onClick={() => toggleArtistLike(artist.artistId)}
              className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
            >
              <Heart
                className={`w-6 h-6 ${
                  isLiked ? "fill-red-500 text-red-500" : "text-white"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center gap-3 text-foreground/60 w-full justify-center">
            <User className="h-8 w-8 text-primary" />
            <span className="text-xl md:text-2xl font-bold text-primary">
              {artist.name}
            </span>
          </div>

          <div className="flex flex-col gap-4 text-left main-details text-center">
            <p className="text-foreground/80 text-lg leading-relaxed max-w-2xl">
              {bioShort}
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex gap-4 mt-3">
            {" "}
            {artist.socialLinks?.instagram && (
              <a
                href={artist.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-6 w-6 text-primary hover:text-white transition-colors" />
              </a>
            )}
            {artist.socialLinks?.twitter && (
              <a
                href={artist.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-6 w-6 text-primary hover:text-white transition-colors" />
              </a>
            )}
            {artist.socialLinks?.youtube && (
              <a
                href={artist.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="h-6 w-6 text-primary hover:text-white transition-colors" />
              </a>
            )}
            {artist.socialLinks?.spotify && (
              <a
                href={artist.socialLinks.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <FaSpotify size={24} />
              </a>
            )}
          </div>
        </div>

        {/* Right Section - Artist Songs */}
        <div className="md:w-100 right-container">
          <h2 className="text-4xl font-bold mb-4 text-primary">
            Songs by {artist.name}
          </h2>
          <div className=" lyrics-data bg-transparent p-4 rounded-lg text-white overflow-auto max-h-[600px]">
            {artistSongs.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {artistSongs.map((song) => (
                  <Link
                    key={song.songId}
                    to={`/lyrics/${song.songId}`}
                    className="block hover:scale-[1.01] transition-transform"
                  >
                    <div className="bg-background/50 backdrop-blur-lg rounded-xl overflow-hidden border border-border">
                      <div className="flex items-center gap-6 p-6">
                        <img
                          src={song.coverImage}
                          alt={song.title}
                          className="w-20 h-20 object-cover rounded-lg shadow-lg"
                        />
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold text-foreground">
                            {song.title}
                          </h3>
                          <p className="text-foreground/60">
                            Album: {song.album}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-foreground/60 text-lg text-center">
                No songs found for {artist.name}.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;
