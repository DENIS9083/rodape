import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Loader2, CreditCard, Smartphone, Building2, CheckCircle2, Clock, Calendar, MapPin, ShoppingBag } from 'lucide-react';
import Header from '@/react-app/components/Header';

interface BookingDetails {
  id: number;
  showtime_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  num_tickets: number;
  total_price: number;
  status: string;
  created_at: string;
  movie_title?: string;
  show_date?: string;
  show_time?: string;
  theater_name?: string;
  food_items?: Array<{
    name: string;
    quantity: number;
    unit_price: number;
  }>;
}

export default function Payment() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [processing, setProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const response = await fetch(`/api/bookings/${bookingId}`);
        if (!response.ok) throw new Error('Reserva não encontrada');
        const data = await response.json();
        setBooking(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar reserva');
      } finally {
        setLoading(false);
      }
    }

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  const handlePayment = async () => {
    if (!selectedMethod) return;
    
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProcessing(false);
    setPaymentComplete(true);
  };

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

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-red-400">
          <p>{error || 'Reserva não encontrada'}</p>
          <Link to="/" className="mt-4 text-gray-400 hover:text-white transition-colors">
            Voltar para home
          </Link>
        </div>
      </div>
    );
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Header />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 shadow-2xl text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="font-display font-bold text-3xl text-white mb-3">
              Pagamento Confirmado!
            </h1>
            <p className="text-gray-400 mb-2">
              Sua reserva foi confirmada com sucesso
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Enviamos os detalhes para {booking.customer_email}
            </p>
            
            <div className="bg-gray-800/50 rounded-xl p-6 mb-8 text-left">
              <h3 className="font-display font-bold text-lg text-white mb-4">
                Detalhes da Reserva
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">ID da Reserva:</span>
                  <span className="text-white font-mono">#{booking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ingressos:</span>
                  <span className="text-white">{booking.num_tickets}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Pago:</span>
                  <span className="text-white font-bold">R$ {booking.total_price.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link
              to="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all"
            >
              Voltar para Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const paymentMethods = [
    {
      id: 'credit',
      name: 'Cartão de Crédito',
      icon: CreditCard,
      description: 'Visa, Mastercard, Elo',
    },
    {
      id: 'debit',
      name: 'Cartão de Débito',
      icon: CreditCard,
      description: 'Débito online',
    },
    {
      id: 'pix',
      name: 'PIX',
      icon: Smartphone,
      description: 'Pagamento instantâneo',
    },
    {
      id: 'boleto',
      name: 'Boleto Bancário',
      icon: Building2,
      description: 'Vence em 3 dias',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-8">
          Finalizar Pagamento
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 shadow-2xl">
              <h2 className="font-display font-bold text-xl text-white mb-6">
                Método de Pagamento
              </h2>
              
              <div className="space-y-3 mb-8">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all ${
                        selectedMethod === method.id
                          ? 'border-red-500 bg-red-500/10'
                          : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          selectedMethod === method.id
                            ? 'bg-red-500/20'
                            : 'bg-gray-700'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            selectedMethod === method.id
                              ? 'text-red-400'
                              : 'text-gray-400'
                          }`} />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-white">
                            {method.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            {method.description}
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedMethod === method.id
                            ? 'border-red-500'
                            : 'border-gray-600'
                        }`}>
                          {selectedMethod === method.id && (
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handlePayment}
                disabled={!selectedMethod || processing}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Processando...' : `Pagar R$ ${booking.total_price.toFixed(2)}`}
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 shadow-2xl sticky top-24">
              <h2 className="font-display font-bold text-xl text-white mb-6">
                Resumo da Reserva
              </h2>
              
              <div className="space-y-4 mb-6">
                {booking.movie_title && (
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Filme</div>
                    <div className="text-white font-semibold">{booking.movie_title}</div>
                  </div>
                )}
                
                {booking.theater_name && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-400">Cinema</div>
                      <div className="text-white">{booking.theater_name}</div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-400">Data</div>
                    <div className="text-white">
                      {booking.show_date && new Date(booking.show_date + 'T00:00:00').toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-400">Horário</div>
                    <div className="text-white">{booking.show_time}</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-4 mb-4">
                <div className="flex justify-between text-white mb-2">
                  <span>{booking.num_tickets}x Ingressos</span>
                  <span>R$ {((booking.total_price || 0) - (booking.food_items?.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0) || 0)).toFixed(2)}</span>
                </div>
                
                {booking.food_items && booking.food_items.length > 0 && (
                  <div className="space-y-2 mb-2">
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <ShoppingBag className="w-3 h-3" />
                      <span>Alimentos</span>
                    </div>
                    {booking.food_items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm text-gray-300 pl-4">
                        <span>{item.quantity}x {item.name}</span>
                        <span>R$ {(item.unit_price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-gray-800 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total</span>
                  <span className="text-white font-bold text-2xl">
                    R$ {booking.total_price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
