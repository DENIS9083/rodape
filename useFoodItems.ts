import { useState, useEffect } from 'react';
import type { FoodItem } from '@/shared/types';

export function useFoodItems() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFoodItems() {
      try {
        const response = await fetch('/api/food-items');
        if (!response.ok) throw new Error('Failed to fetch food items');
        const data = await response.json();
        setFoodItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchFoodItems();
  }, []);

  return { foodItems, loading, error };
}
