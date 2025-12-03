import { Link } from 'react-router';
import { ArrowLeft, User, Bell, Lock, Globe, Palette, Mail } from 'lucide-react';
import Header from '@/react-app/components/Header';
import { useAuth } from '@getmocha/users-service/react';
import { useUserPreferences } from '@/react-app/hooks/useUserPreferences';
import { useState } from 'react';
import LanguageModal from '@/react-app/components/LanguageModal';
import DeleteAccountModal from '@/react-app/components/DeleteAccountModal';
import PrivacyPolicyModal from '@/react-app/components/PrivacyPolicyModal';
import TermsOfUseModal from '@/react-app/components/TermsOfUseModal';

export default function Settings() {
  const { user } = useAuth();
  const { preferences, updatePreferences, isLoading } = useUserPreferences();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const getLanguageName = (code: string) => {
    const languages: Record<string, string> = {
      'pt-BR': 'Português (Brasil)',
      'en-US': 'English (US)',
      'es-ES': 'Español',
      'fr-FR': 'Français',
      'de-DE': 'Deutsch',
      'it-IT': 'Italiano',
    };
    return languages[code] || code;
  };

  const handleToggle = async (key: 'notify_new_releases' | 'notify_promotions' | 'notify_booking_confirmations') => {
    if (!preferences) return;
    
    try {
      await updatePreferences({
        [key]: !preferences[key],
      });
    } catch (error) {
      console.error('Error updating preference:', error);
    }
  };

  const handleLanguageChange = async (language: string) => {
    try {
      await updatePreferences({ language });
    } catch (error) {
      console.error('Error updating language:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        <h1 className="font-display font-bold text-4xl mb-2 text-white">
          Configurações
        </h1>
        <p className="text-gray-400 mb-8">
          Gerencie suas preferências e configurações da conta
        </p>

        {!user && (
          <div className="mb-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-400">
              Faça login para acessar todas as configurações
            </p>
          </div>
        )}

        <div className="space-y-6">
          {/* Account Section */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <User className="w-5 h-5 text-red-500" />
                Conta
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {user && (
                <>
                  <div className="flex items-center gap-4">
                    {user.google_user_data.picture && (
                      <img
                        src={user.google_user_data.picture}
                        alt={user.google_user_data.name || user.email}
                        className="w-16 h-16 rounded-full border-2 border-red-500"
                      />
                    )}
                    <div>
                      <p className="text-white font-semibold">
                        {user.google_user_data.name || 'Usuário'}
                      </p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <p className="text-sm text-gray-500">
                      Conectado via Google OAuth
                    </p>
                  </div>
                </>
              )}
              {!user && (
                <p className="text-gray-400">
                  Faça login para gerenciar sua conta
                </p>
              )}
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-red-500" />
                Notificações
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {user && preferences && !isLoading ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Novos lançamentos</p>
                      <p className="text-sm text-gray-400">
                        Receba alertas sobre novos filmes
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggle('notify_new_releases')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.notify_new_releases ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.notify_new_releases ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Promoções</p>
                      <p className="text-sm text-gray-400">
                        Receba ofertas especiais
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggle('notify_promotions')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.notify_promotions ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.notify_promotions ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Confirmações de reserva</p>
                      <p className="text-sm text-gray-400">
                        Emails com detalhes das suas reservas
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggle('notify_booking_confirmations')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        preferences.notify_booking_confirmations ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          preferences.notify_booking_confirmations ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-gray-400">
                  {isLoading ? 'Carregando...' : 'Faça login para gerenciar notificações'}
                </p>
              )}
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-red-500" />
                Preferências
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-white font-medium">Idioma</p>
                    <p className="text-sm text-gray-400">
                      {user && preferences ? getLanguageName(preferences.language) : 'Português (Brasil)'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLanguageModal(true)}
                  disabled={!user}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  Alterar
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-white font-medium">Email de contato</p>
                    <p className="text-sm text-gray-400">
                      {user?.email || 'Não configurado'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Security Section */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-500" />
                Privacidade e Segurança
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <button 
                onClick={() => setShowPrivacyModal(true)}
                className="w-full text-left p-4 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <p className="text-white font-medium">Política de Privacidade</p>
                <p className="text-sm text-gray-400 mt-1">
                  Veja como protegemos seus dados
                </p>
              </button>
              <button 
                onClick={() => setShowTermsModal(true)}
                className="w-full text-left p-4 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <p className="text-white font-medium">Termos de Uso</p>
                <p className="text-sm text-gray-400 mt-1">
                  Leia nossos termos e condições
                </p>
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={!user}
                className="w-full text-left p-4 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-red-400"
              >
                <p className="font-medium">Excluir Conta</p>
                <p className="text-sm text-gray-400 mt-1">
                  Remover permanentemente sua conta
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showLanguageModal && preferences && (
        <LanguageModal
          currentLanguage={preferences.language}
          onClose={() => setShowLanguageModal(false)}
          onSave={handleLanguageChange}
        />
      )}

      {showDeleteModal && (
        <DeleteAccountModal onClose={() => setShowDeleteModal(false)} />
      )}

      {showPrivacyModal && (
        <PrivacyPolicyModal onClose={() => setShowPrivacyModal(false)} />
      )}

      {showTermsModal && (
        <TermsOfUseModal onClose={() => setShowTermsModal(false)} />
      )}
    </div>
  );
}
