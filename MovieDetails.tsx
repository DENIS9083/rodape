import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Loader2, Clock, Calendar, Star, User, ArrowLeft, Ticket } from 'lucide-react';
import Header from '@/react-app/components/Header';
import BookingModal from '@/react-app/components/BookingModal';
import { useMovie } from '@/react-app/hooks/useMovies';
import type { Showtime } from '@/shared/types';

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const { movie, loading, error } = useMovie(id!);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Header />
        <div className="flex items-center justify-center min-h-[70vh]">
          <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-red-400">
          <p>Erro ao carregar filme</p>
          <Link to="/" className="mt-4 text-gray-400 hover:text-white transition-colors">
            Voltar para home
          </Link>
        </div>
      </div>
    );
  }

  const groupedShowtimes = movie.showtimes.reduce((acc, showtime) => {
    if (!acc[showtime.show_date]) {
      acc[showtime.show_date] = [];
    }
    acc[showtime.show_date].push(showtime);
    return acc;
  }, {} as Record<string, typeof movie.showtimes>);

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      
      {/* Hero Section with Backdrop */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={movie.backdrop_url || movie.poster_url || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600'}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-gray-950/30" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12">
          <Link to="/" className="absolute top-8 left-4 sm:left-8 flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Voltar</span>
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-8 w-full">
            <img
              src={movie.poster_url || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400'}
              alt={movie.title}
              className="w-48 rounded-xl shadow-2xl hidden sm:block"
            />
            
            <div className="flex-1">
              <h1 className="font-display font-black text-4xl sm:text-6xl mb-4 text-white text-shadow">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-4">
                {movie.rating && (
                  <span className="px-3 py-1 bg-gray-800/80 backdrop-blur-sm rounded-full text-sm font-semibold border border-gray-700">
                    {movie.rating}
                  </span>
                )}
                {movie.duration_minutes && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{movie.duration_minutes} min</span>
                  </div>
                )}
                {movie.release_date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                )}
              </div>
              
              {movie.genre && (
                <div className="text-red-400 font-semibold mb-2">
                  {movie.genre}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Synopsis */}
            {movie.description && (
              <div className="mb-12">
                <h2 className="font-display font-bold text-2xl mb-4 text-white">Sinopse</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {movie.description}
                </p>
              </div>
            )}
            
            {/* Cast & Crew */}
            <div className="grid sm:grid-cols-2 gap-8">
              {movie.director && (
                <div>
                  <h3 className="font-display font-bold text-xl mb-3 text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-red-500" />
                    Diretor
                  </h3>
                  <p className="text-gray-300">{movie.director}</p>
                </div>
              )}
              
              {movie.cast && (
                <div>
                  <h3 className="font-display font-bold text-xl mb-3 text-white flex items-center gap-2">
                    <Star className="w-5 h-5 text-red-500" />
                    Elenco
                  </h3>
                  <p className="text-gray-300">{movie.cast}</p>
                </div>
              )}
            </div>
          </div>

          {/* Showtimes */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 shadow-2xl">
              <h2 className="font-display font-bold text-2xl mb-6 text-white flex items-center gap-2">
                <Ticket className="w-6 h-6 text-red-500" />
                Horários
              </h2>
              
              {Object.keys(groupedShowtimes).length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  Nenhum horário disponível
                </p>
              ) : (
                <div className="space-y-6">
                  {Object.entries(groupedShowtimes).map(([date, showtimes]) => (
                    <div key={date}>
                      <div className="text-sm font-semibold text-gray-400 mb-3">
                        {new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', { 
                          weekday: 'long', 
                          day: 'numeric', 
                          month: 'long' 
                        })}
                      </div>
                      <div className="space-y-3">
                        {showtimes.map((showtime) => (
                          <button
                            key={showtime.id}
                            onClick={() => setSelectedShowtime(showtime)}
                            className="w-full group bg-gray-800/50 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 rounded-lg p-4 transition-all duration-300 border border-gray-700 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/25"
                          >
                            <div className="flex items-center justify-between">
                              <div className="text-left">
                                <div className="font-bold text-white text-lg group-hover:text-white">
                                  {showtime.show_time}
                                </div>
                                <div className="text-xs text-gray-400 group-hover:text-red-100">
                                  {showtime.theater_name}
                                </div>
                              </div>
                              <div className="text-right">
                                {showtime.price && (
                                  <div className="font-bold text-white group-hover:text-white">
                                    R$ {showtime.price.toFixed(2)}
                                  </div>
                                )}
                                {showtime.available_seats !== null && (
                                  <div className="text-xs text-gray-400 group-hover:text-red-100">
                                    {showtime.available_seats} lugares
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedShowtime && (
        <BookingModal
          showtime={selectedShowtime}
          movieTitle={movie.title}
          onClose={() => setSelectedShowtime(null)}
        />
      )}
    </div>
  );
}
