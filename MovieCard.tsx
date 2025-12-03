import { Clock, Calendar, Star } from 'lucide-react';
import { Link } from 'react-router';
import type { Movie } from '@/shared/types';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link to={`/movie/${movie.id}`} className="group block">
      <div className="relative overflow-hidden rounded-xl bg-gray-900 shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-red-500/20">
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={movie.poster_url || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400'}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {movie.is_now_showing === 1 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              EM CARTAZ
            </div>
          )}
          
          {movie.rating && (
            <div className="absolute top-3 left-3 bg-gray-950/80 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-semibold border border-gray-700">
              {movie.rating}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-display font-bold text-lg mb-2 text-white group-hover:text-red-400 transition-colors line-clamp-1">
            {movie.title}
          </h3>
          
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
            {movie.duration_minutes && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{movie.duration_minutes}min</span>
              </div>
            )}
            {movie.release_date && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
            )}
          </div>
          
          {movie.genre && (
            <div className="text-xs text-gray-500 line-clamp-1">
              {movie.genre}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
