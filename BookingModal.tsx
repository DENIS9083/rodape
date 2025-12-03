import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { X, Plus, Minus, ShoppingCart, Popcorn } from 'lucide-react';
import type { Showtime, FoodItem, BookingFoodItem } from '@/shared/types';
import { useFoodItems } from '@/react-app/hooks/useFoodItems';
import { useBooking } from '@/react-app/hooks/useBooking';

interface BookingModalProps {
  showtime: Showtime;
  movieTitle: string;
  onClose: () => void;
}

export default function BookingModal({ showtime, movieTitle, onClose }: BookingModalProps) {
  const navigate = useNavigate();
  const { foodItems, loading: foodLoading } = useFoodItems();
  const { createBooking, loading: bookingLoading, error: bookingError } = useBooking();
  
  const [numTickets, setNumTickets] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedFoodItems, setSelectedFoodItems] = useState<Map<number, number>>(new Map());

  const groupedFoodItems = useMemo(() => {
    return foodItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, FoodItem[]>);
  }, [foodItems]);

  const updateFoodQuantity = (itemId: number, change: number) => {
    setSelectedFoodItems((prev) => {
      const newMap = new Map(prev);
      const currentQty = newMap.get(itemId) || 0;
      const newQty = Math.max(0, currentQty + change);
      
      if (newQty === 0) {
        newMap.delete(itemId);
      } else {
        newMap.set(itemId, newQty);
      }
      
      return newMap;
    });
  };

  const totalPrice = useMemo(() => {
    let total = (showtime.price || 0) * numTickets;
    
    selectedFoodItems.forEach((quantity, itemId) => {
      const item = foodItems.find(f => f.id === itemId);
      if (item) {
        total += item.price * quantity;
      }
    });
    
    return total;
  }, [numTickets, selectedFoodItems, foodItems, showtime.price]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const foodItemsArray: BookingFoodItem[] = Array.from(selectedFoodItems.entries()).map(
      ([food_item_id, quantity]) => ({ food_item_id, quantity })
    );
    
    const booking = await createBooking({
      showtime_id: showtime.id,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone || undefined,
      num_tickets: numTickets,
      food_items: foodItemsArray.length > 0 ? foodItemsArray : undefined,
    });
    
    if (booking) {
      navigate(`/payment/${booking.id}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full border border-gray-800 shadow-2xl my-8">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="font-display font-bold text-2xl text-white">
              Finalizar Reserva
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {movieTitle} - {showtime.show_time}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tickets Section */}
          <div>
            <h3 className="font-display font-bold text-lg text-white mb-4">
              Ingressos
            </h3>
            <div className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">Quantidade de Ingressos</p>
                <p className="text-gray-400 text-sm">
                  R$ {(showtime.price || 0).toFixed(2)} por ingresso
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setNumTickets(Math.max(1, numTickets - 1))}
                  className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Minus className="w-5 h-5 text-white" />
                </button>
                <span className="text-white font-bold text-xl w-12 text-center">
                  {numTickets}
                </span>
                <button
                  type="button"
                  onClick={() => setNumTickets(numTickets + 1)}
                  className="w-10 h-10 bg-red-600 hover:bg-red-500 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Food Section */}
          <div>
            <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
              <Popcorn className="w-5 h-5 text-red-500" />
              Alimentos e Bebidas
            </h3>
            {foodLoading ? (
              <p className="text-gray-400">Carregando...</p>
            ) : (
              <div className="space-y-4">
                {Object.entries(groupedFoodItems).map(([category, items]) => (
                  <div key={category}>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">
                      {category}
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {items.map((item) => {
                        const quantity = selectedFoodItems.get(item.id) || 0;
                        return (
                          <div
                            key={item.id}
                            className="bg-gray-800/50 rounded-lg p-3 flex items-center gap-3"
                          >
                            {item.image_url && (
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-semibold text-sm truncate">
                                {item.name}
                              </p>
                              <p className="text-gray-400 text-xs truncate">
                                {item.description}
                              </p>
                              <p className="text-red-400 font-bold text-sm">
                                R$ {item.price.toFixed(2)}
                              </p>
                            </div>
                            {quantity > 0 ? (
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => updateFoodQuantity(item.id, -1)}
                                  className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center transition-colors"
                                >
                                  <Minus className="w-4 h-4 text-white" />
                                </button>
                                <span className="text-white font-bold w-6 text-center">
                                  {quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateFoodQuantity(item.id, 1)}
                                  className="w-8 h-8 bg-red-600 hover:bg-red-500 rounded flex items-center justify-center transition-colors"
                                >
                                  <Plus className="w-4 h-4 text-white" />
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => updateFoodQuantity(item.id, 1)}
                                className="px-3 py-1 bg-gray-700 hover:bg-red-600 text-white text-xs font-semibold rounded transition-colors"
                              >
                                Adicionar
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Customer Info */}
          <div>
            <h3 className="font-display font-bold text-lg text-white mb-4">
              Informações do Cliente
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nome completo"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
              <input
                type="tel"
                placeholder="Telefone (opcional)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          {bookingError && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
              <p className="text-red-400 text-sm">{bookingError}</p>
            </div>
          )}

          {/* Total and Submit */}
          <div className="sticky bottom-0 bg-gray-900 border-t border-gray-800 pt-6 -mx-6 -mb-6 px-6 pb-6 rounded-b-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">Total</span>
              <span className="text-white font-bold text-2xl">
                R$ {totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              type="submit"
              disabled={bookingLoading}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {bookingLoading ? 'Processando...' : 'Confirmar Reserva'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
