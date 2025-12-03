import { useState, useEffect } from 'react';
import { useAuth } from '@getmocha/users-service/react';

export interface UserPreferences {
  id: number;
  user_id: string;
  language: string;
  notify_new_releases: boolean;
  notify_promotions: boolean;
  notify_booking_confirmations: boolean;
  created_at: string;
  updated_at: string;
}

export function useUserPreferences() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPreferences = async () => {
    if (!user) {
      setPreferences(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/user-preferences', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch preferences');
      }

      const data = await response.json();
      setPreferences({
        ...data,
        notify_new_releases: Boolean(data.notify_new_releases),
        notify_promotions: Boolean(data.notify_promotions),
        notify_booking_confirmations: Boolean(data.notify_booking_confirmations),
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!user || !preferences) return;

    try {
      const response = await fetch('/api/user-preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          language: updates.language ?? preferences.language,
          notify_new_releases: updates.notify_new_releases ?? preferences.notify_new_releases,
          notify_promotions: updates.notify_promotions ?? preferences.notify_promotions,
          notify_booking_confirmations: updates.notify_booking_confirmations ?? preferences.notify_booking_confirmations,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update preferences');
      }

      const data = await response.json();
      setPreferences({
        ...data,
        notify_new_releases: Boolean(data.notify_new_releases),
        notify_promotions: Boolean(data.notify_promotions),
        notify_booking_confirmations: Boolean(data.notify_booking_confirmations),
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, [user]);

  return {
    preferences,
    isLoading,
    error,
    updatePreferences,
    refetch: fetchPreferences,
  };
}
