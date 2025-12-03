import { X } from 'lucide-react';

interface TermsOfUseModalProps {
  onClose: () => void;
}

export default function TermsOfUseModal({ onClose }: TermsOfUseModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-gray-900 rounded-2xl border border-gray-800 w-full max-w-3xl my-8 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
          <h2 className="font-display font-bold text-2xl text-white">Termos de Uso</h2>
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
              Bem-vindo ao CatalogoFlix. Ao acessar e usar nossos serviços, você concorda em cumprir 
              e estar vinculado aos seguintes termos e condições.
            </p>
          </div>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">1. Aceitação dos Termos</h3>
            <p className="text-sm pl-4">
              Ao criar uma conta e usar o CatalogoFlix, você confirma que leu, compreendeu e concorda 
              em estar vinculado a estes Termos de Uso. Se você não concordar com estes termos, não 
              use nossos serviços.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">2. Descrição do Serviço</h3>
            <div className="space-y-2 pl-4">
              <p className="text-sm">
                O CatalogoFlix é uma plataforma online para reserva de ingressos de cinema. 
                Oferecemos:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Catálogo de filmes em cartaz e em breve</li>
                <li>Sistema de reserva de ingressos</li>
                <li>Seleção de alimentos e bebidas</li>
                <li>Gerenciamento de reservas</li>
                <li>Notificações sobre novos lançamentos e promoções</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">3. Registro e Conta</h3>
            <div className="space-y-2 pl-4">
              <div>
                <h4 className="font-semibold text-white">3.1 Criação de Conta</h4>
                <p className="text-sm">
                  Para usar certos recursos do CatalogoFlix, você deve criar uma conta usando 
                  autenticação Google OAuth.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white">3.2 Responsabilidade da Conta</h4>
                <p className="text-sm">
                  Você é responsável por manter a confidencialidade de sua conta e por todas as 
                  atividades que ocorram sob sua conta.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white">3.3 Informações Precisas</h4>
                <p className="text-sm">
                  Você concorda em fornecer informações precisas, atuais e completas durante o 
                  processo de registro e atualizar tais informações conforme necessário.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">4. Reservas e Pagamentos</h3>
            <div className="space-y-2 pl-4">
              <div>
                <h4 className="font-semibold text-white">4.1 Processo de Reserva</h4>
                <p className="text-sm">
                  Ao fazer uma reserva, você concorda em fornecer informações precisas e pagar 
                  o valor total da reserva, incluindo ingressos e itens alimentares selecionados.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white">4.2 Confirmação</h4>
                <p className="text-sm">
                  Todas as reservas estão sujeitas à disponibilidade. Você receberá uma confirmação 
                  por e-mail após o processamento bem-sucedido da reserva.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white">4.3 Cancelamento</h4>
                <p className="text-sm">
                  Políticas de cancelamento e reembolso são determinadas por cada cinema parceiro. 
                  Entre em contato conosco para questões específicas sobre cancelamento.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">5. Uso Aceitável</h3>
            <div className="space-y-2 pl-4">
              <p className="text-sm">Você concorda em NÃO:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Usar o serviço para qualquer propósito ilegal ou não autorizado</li>
                <li>Tentar obter acesso não autorizado ao sistema ou rede</li>
                <li>Interferir ou interromper o serviço ou servidores</li>
                <li>Fazer reservas falsas ou fraudulentas</li>
                <li>Coletar informações de outros usuários sem consentimento</li>
                <li>Transmitir vírus, malware ou código malicioso</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">6. Propriedade Intelectual</h3>
            <div className="space-y-2 pl-4">
              <p className="text-sm">
                Todo o conteúdo disponível no CatalogoFlix, incluindo mas não limitado a textos, 
                gráficos, logos, imagens e software, é propriedade do CatalogoFlix ou de seus 
                licenciadores e é protegido por leis de direitos autorais e propriedade intelectual.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">7. Isenção de Garantias</h3>
            <div className="space-y-2 pl-4">
              <p className="text-sm">
                O serviço é fornecido "como está" e "conforme disponível". Não garantimos que o 
                serviço será ininterrupto, seguro ou livre de erros. Você usa o serviço por sua 
                própria conta e risco.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">8. Limitação de Responsabilidade</h3>
            <div className="space-y-2 pl-4">
              <p className="text-sm">
                Na máxima extensão permitida por lei, o CatalogoFlix não será responsável por 
                quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, 
                incluindo perda de lucros, dados, uso ou outros prejuízos intangíveis.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">9. Modificações do Serviço</h3>
            <p className="text-sm pl-4">
              Reservamo-nos o direito de modificar ou descontinuar o serviço (ou qualquer parte dele) 
              a qualquer momento, com ou sem aviso prévio, sem responsabilidade para com você ou 
              terceiros.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">10. Rescisão</h3>
            <p className="text-sm pl-4">
              Podemos encerrar ou suspender seu acesso ao serviço imediatamente, sem aviso prévio, 
              por qualquer motivo, incluindo, sem limitação, se você violar estes Termos de Uso.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">11. Lei Aplicável</h3>
            <p className="text-sm pl-4">
              Estes termos serão regidos e interpretados de acordo com as leis do Brasil, sem 
              considerar conflitos de disposições legais.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">12. Alterações nos Termos</h3>
            <p className="text-sm pl-4">
              Reservamo-nos o direito de modificar estes termos a qualquer momento. Notificaremos 
              você sobre alterações significativas por e-mail ou através de aviso em nosso serviço. 
              O uso continuado do serviço após tais alterações constitui sua aceitação dos novos termos.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-white">13. Contato</h3>
            <p className="text-sm pl-4">
              Para questões sobre estes Termos de Uso, entre em contato conosco em: 
              <span className="text-red-400"> legal@catalogoflix.com</span>
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
