import { X } from 'lucide-react';

interface PrivacyPolicyModalProps {
  onClose: () => void;
}

export default function PrivacyPolicyModal({ onClose }: PrivacyPolicyModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-gray-900 rounded-2xl border border-gray-800 w-full max-w-3xl my-8 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
          <h2 className="font-display font-bold text-2xl text-white">Política de Privacidade</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-gray-300 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Última atualização: Dezembro de 2025</p>
            <p>
              O CatalogoFlix está comprometido em proteger sua privacidade. Esta Política de Privacidade 
              explica como coletamos, usamos, divulgamos e protegemos suas informações pessoais.
            </p>
          </div>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">1. Informações que Coletamos</h3>
            <div className="space-y-2 pl-4">
              <div>
                <h4 className="font-semibold text-white">1.1 Informações de Conta</h4>
                <p className="text-sm">
                  Quando você cria uma conta conosco através do Google OAuth, coletamos seu nome, 
                  endereço de e-mail e foto de perfil fornecidos pelo Google.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white">1.2 Informações de Reserva</h4>
                <p className="text-sm">
                  Ao fazer uma reserva, coletamos informações como nome do cliente, e-mail, número 
                  de telefone (opcional), número de ingressos e preferências alimentares.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white">1.3 Preferências do Usuário</h4>
                <p className="text-sm">
                  Armazenamos suas preferências de idioma e configurações de notificações para 
                  personalizar sua experiência.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white">1.4 Dados de Uso</h4>
                <p className="text-sm">
                  Coletamos informações sobre como você interage com nosso serviço, incluindo páginas 
                  visitadas, filmes visualizados e reservas realizadas.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">2. Como Usamos Suas Informações</h3>
            <div className="space-y-2 pl-4">
              <p className="text-sm">Utilizamos suas informações para:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Processar e gerenciar suas reservas de ingressos</li>
                <li>Fornecer atendimento ao cliente e suporte</li>
                <li>Enviar confirmações de reserva e atualizações importantes</li>
                <li>Personalizar sua experiência no CatalogoFlix</li>
                <li>Enviar notificações sobre novos filmes e promoções (com seu consentimento)</li>
                <li>Melhorar nossos serviços e desenvolver novos recursos</li>
                <li>Prevenir fraudes e garantir a segurança da plataforma</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">3. Compartilhamento de Informações</h3>
            <div className="space-y-2 pl-4">
              <p className="text-sm">
                Não vendemos suas informações pessoais. Podemos compartilhar suas informações com:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Provedores de serviços que nos ajudam a operar nossa plataforma</li>
                <li>Autoridades legais quando exigido por lei</li>
                <li>Parceiros de cinema para processar suas reservas</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">4. Segurança de Dados</h3>
            <p className="text-sm pl-4">
              Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger 
              suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. 
              Utilizamos criptografia SSL/TLS para transmissão de dados e armazenamento seguro em nuvem 
              com Cloudflare D1.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">5. Seus Direitos</h3>
            <div className="space-y-2 pl-4">
              <p className="text-sm">Você tem o direito de:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Acessar suas informações pessoais</li>
                <li>Corrigir informações imprecisas</li>
                <li>Solicitar a exclusão de suas informações</li>
                <li>Optar por não receber comunicações de marketing</li>
                <li>Exportar seus dados em formato legível</li>
                <li>Revogar consentimentos previamente dados</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">6. Cookies e Tecnologias Similares</h3>
            <p className="text-sm pl-4">
              Utilizamos cookies essenciais para manter sua sessão ativa e garantir o funcionamento 
              adequado do site. Você pode gerenciar suas preferências de cookies nas configurações 
              do seu navegador.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">7. Retenção de Dados</h3>
            <p className="text-sm pl-4">
              Mantemos suas informações pessoais pelo tempo necessário para cumprir os propósitos 
              descritos nesta política, a menos que um período de retenção mais longo seja exigido 
              ou permitido por lei.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">8. Alterações nesta Política</h3>
            <p className="text-sm pl-4">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre 
              alterações significativas por e-mail ou através de um aviso proeminente em nosso serviço.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">9. Contato</h3>
            <p className="text-sm pl-4">
              Se você tiver dúvidas sobre esta Política de Privacidade ou sobre nossas práticas de 
              privacidade, entre em contato conosco em: <span className="text-red-400">privacidade@catalogoflix.com</span>
            </p>
          </section>
        </div>

        <div className="flex justify-end p-6 border-t border-gray-800">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:shadow-lg hover:shadow-red-500/50 text-white font-semibold rounded-lg transition-all"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
