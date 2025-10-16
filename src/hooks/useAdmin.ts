import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        // Allow explicit email override for the main admin account
        const ADMIN_EMAIL_OVERRIDE = 'erieltondepaulamelo@gmail.com';
        if (user.email && user.email.toLowerCase() === ADMIN_EMAIL_OVERRIDE.toLowerCase()) {
          setIsAdmin(true);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .rpc('has_role', { _user_id: user.id, _role: 'admin' });

        if (error) {
          console.error('Erro ao verificar admin:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(data === true);
        }
      } catch (error) {
        console.error('Erro ao verificar admin:', error);
        setIsAdmin(false);
      }
      setLoading(false);
    };

    checkAdmin();
  }, [user]);

  return { isAdmin, loading };
};
