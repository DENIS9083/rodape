import { Loader2, Popcorn } from 'lucide-react';
import Header from '@/react-app/components/Header';
import MovieCard from '@/react-app/components/MovieCard';
import { useMovies } from '@/react-app/hooks/useMovies';

export default function Home() {
  const { movies, loading, error } = useMovies();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-red-400">
          <p>Erro ao carregar filmes: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600"
            alt="Cinema"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="font-display font-black text-5xl sm:text-7xl mb-6 bg-gradient-to-r from-white via-red-100 to-purple-200 bg-clip-text text-transparent text-shadow">
              Experiência Cinematográfica Incomparável
            </h1>
            <p className="text-xl text-gray-300 mb-8 text-shadow">
              Descubra os melhores filmes em cartaz. Salas premium, IMAX e tecnologia de ponta para sua diversão.
            </p>
            <button className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-lg shadow-2xl shadow-red-500/50 hover:shadow-red-500/80 transition-all duration-300 hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                <Popcorn className="w-5 h-5" />
                Ver Filmes em Cartaz
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur" />
            </button>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display font-bold text-3xl sm:text-4xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Em Cartaz Agora
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-400">
            <p className="font-display font-bold text-2xl mb-2 bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
              CatalogoFlix
            </p>
            <p className="text-sm">© 2025 StudioFlix. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
