import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

/** Hook: determina si el usuario actual es admin consultando public.admins */
export function useIsAdmin() {
  const [state, setState] = useState({ loading: true, isAdmin: false });

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        if (mounted) setState({ loading: false, isAdmin: false });
        return;
      }
      const { data, error } = await supabase
        .from("admins")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();
      if (mounted) setState({ loading: false, isAdmin: !!data && !error });
    })();
    return () => { mounted = false; };
  }, []);

  return state; // { loading, isAdmin }
}
