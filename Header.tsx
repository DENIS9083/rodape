import { Film, Search, User, Menu, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router';
import { useAuth } from '@getmocha/users-service/react';
import { useState } from 'react';
import SearchModal from '@/react-app/components/SearchModal';

export default function Header() {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Film className="w-8 h-8 text-red-500 transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-red-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            </div>
            <span className="text-2xl font-display font-black bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
              CatalogoFlix
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors font-medium">
              Em Cartaz
            </Link>
            <Link to="/" className="text-gray-300 hover:text-white transition-colors font-medium">
              Em Breve
            </Link>
            <Link to="/" className="text-gray-300 hover:text-white transition-colors font-medium">
              Promoções
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 text-gray-300 hover:text-white transition-colors"
                >
                  {user.google_user_data.picture ? (
                    <img
                      src={user.google_user_data.picture}
                      alt={user.google_user_data.name || user.email}
                      className="w-8 h-8 rounded-full border-2 border-red-500"
                    />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </button>
                
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-800 rounded-lg shadow-2xl z-50 overflow-hidden">
                      <div className="p-4 border-b border-gray-800">
                        <p className="text-white font-semibold truncate">
                          {user.google_user_data.name || user.email}
                        </p>
                        <p className="text-gray-400 text-sm truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        to="/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="w-full flex items-center gap-2 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Configurações</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sair</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all"
              >
                Entrar
              </Link>
            )}
            
            <button className="md:hidden p-2 text-gray-400 hover:text-white transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {showSearchModal && <SearchModal onClose={() => setShowSearchModal(false)} />}
    </header>
  );
}
