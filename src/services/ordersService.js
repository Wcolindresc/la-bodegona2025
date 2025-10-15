import { supabase } from '../lib/supabase';

/**
 * Crea una orden con items.
 * Requiere usuario autenticado (policies lo validan) y items = [{product_id, qty, unit_price}]
 */
export async function createOrder({ items, shipping_address, notes }) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Debe iniciar sesión');

  const { data, error } = await supabase.from('orders').insert({
    user_id: user.id,
    shipping_address,
    notes
  }).select('id').single();
  if (error) throw error;

  const orderId = data.id;
  const itemsPayload = items.map(it => ({
    order_id: orderId,
    product_id: it.product_id,
    qty: it.qty,
    unit_price: it.unit_price
  }));
  const { error: itemsErr } = await supabase.from('order_items').insert(itemsPayload);
  if (itemsErr) throw itemsErr;

  return { order_id: orderId };
}
