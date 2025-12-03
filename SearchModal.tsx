import { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router';
import type { Movie } from '@/shared/types';

interface SearchModalProps {
  onClose: () => void;
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('/api/movies');
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredMovies([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.description?.toLowerCase().includes(searchTerm) ||
        movie.genre?.toLowerCase().includes(searchTerm) ||
        movie.director?.toLowerCase().includes(searchTerm) ||
        movie.cast?.toLowerCase().includes(searchTerm)
    );
    setFilteredMovies(filtered);
  }, [query, movies]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative min-h-screen flex items-start justify-center p-4 pt-20">
        <div className="relative bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl">
          {/* Search Input */}
          <div className="flex items-center gap-3 p-6 border-b border-gray-800">
            <Search className="w-6 h-6 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar filmes, gêneros, diretores..."
              className="flex-1 bg-transparent text-white text-lg outline-none placeholder:text-gray-500"
            />
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
              </div>
            ) : query.trim() === '' ? (
              <div className="p-8 text-center text-gray-400">
                Digite para buscar filmes...
              </div>
            ) : filteredMovies.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                Nenhum filme encontrado para "{query}"
              </div>
            ) : (
              <div className="p-4 space-y-2">
                {filteredMovies.map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors group"
                  >
                    <img
                      src={movie.poster_url || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=100'}
                      alt={movie.title}
                      className="w-16 h-24 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white group-hover:text-red-400 transition-colors truncate">
                        {movie.title}
                      </h3>
                      {movie.genre && (
                        <p className="text-sm text-gray-400 truncate">
                          {movie.genre}
                        </p>
                      )}
                      {movie.release_date && (
                        <p className="text-xs text-gray-500">
                          {new Date(movie.release_date).getFullYear()}
                        </p>
                      )}
                    </div>
                    {movie.is_now_showing === 1 && (
                      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                        EM CARTAZ
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
