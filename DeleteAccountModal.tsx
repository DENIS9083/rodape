import { X, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@getmocha/users-service/react';
import { useNavigate } from 'react-router';

interface DeleteAccountModalProps {
  onClose: () => void;
}

export default function DeleteAccountModal({ onClose }: DeleteAccountModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (confirmText.toLowerCase() !== 'excluir') {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch('/api/user-account', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/');
        window.location.reload();
      } else {
        alert('Erro ao excluir conta. Tente novamente.');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Erro ao excluir conta. Tente novamente.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl border border-red-500/50 w-full max-w-md overflow-hidden shadow-2xl shadow-red-500/20">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="font-display font-bold text-2xl text-white">Excluir Conta</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
            disabled={isDeleting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm font-medium mb-2">⚠️ Atenção: Esta ação é irreversível</p>
            <p className="text-gray-400 text-sm">
              Ao excluir sua conta, todos os seus dados, incluindo reservas e preferências, serão permanentemente removidos.
            </p>
          </div>

          {user && (
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">Conta a ser excluída:</p>
              <p className="text-white font-medium">{user.email}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Digite <span className="text-white font-bold">EXCLUIR</span> para confirmar:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="EXCLUIR"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              disabled={isDeleting}
            />
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t border-gray-800">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
            disabled={isDeleting}
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            disabled={confirmText.toLowerCase() !== 'excluir' || isDeleting}
            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            {isDeleting ? 'Excluindo...' : 'Excluir Conta'}
          </button>
        </div>
      </div>
    </div>
  );
}
