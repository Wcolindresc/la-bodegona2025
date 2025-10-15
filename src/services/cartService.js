import { supabase } from '../lib/supabase';

export const cartService = {
  async getCartItems(userId) {
    try {
      const { data, error } = await supabase?.from('cart_items')?.select(`
          *,
          product:products(
            id, name, price, stock_quantity, status,
            images:product_images!inner(image_url, is_primary)
          )
        `)?.eq('user_id', userId)?.order('added_at', { ascending: false })
      
      if (error) {
        return { items: [], error: error?.message };
      }
      
      return { items: data || [] }
    } catch (error) {
      return { items: [], error: 'Failed to load cart items' }
    }
  },

  async addToCart(userId, productId, quantity = 1) {
    try {
      // First check if item already exists
      const { data: existingItem } = await supabase?.from('cart_items')?.select('*')?.eq('user_id', userId)?.eq('product_id', productId)?.single()
      
      if (existingItem) {
        // Update existing item
        const { data, error } = await supabase?.from('cart_items')?.update({ quantity: existingItem?.quantity + quantity })?.eq('id', existingItem?.id)?.select()?.single()
        
        if (error) {
          return { item: null, error: error?.message };
        }
        
        return { item: data, updated: true }
      } else {
        // Add new item
        const { data, error } = await supabase?.from('cart_items')?.insert({
            user_id: userId,
            product_id: productId,
            quantity: quantity
          })?.select()?.single()
        
        if (error) {
          return { item: null, error: error?.message };
        }
        
        return { item: data, updated: false }
      }
    } catch (error) {
      return { item: null, error: 'Failed to add item to cart' }
    }
  },

  async updateCartItem(cartItemId, quantity) {
    try {
      if (quantity <= 0) {
        return this.removeFromCart(cartItemId)
      }
      
      const { data, error } = await supabase?.from('cart_items')?.update({ quantity })?.eq('id', cartItemId)?.select()?.single()
      
      if (error) {
        return { item: null, error: error?.message };
      }
      
      return { item: data }
    } catch (error) {
      return { item: null, error: 'Failed to update cart item' }
    }
  },

  async removeFromCart(cartItemId) {
    try {
      const { error } = await supabase?.from('cart_items')?.delete()?.eq('id', cartItemId)
      
      if (error) {
        return { error: error?.message };
      }
      
      return { success: true }
    } catch (error) {
      return { error: 'Failed to remove item from cart' }
    }
  },

  async clearCart(userId) {
    try {
      const { error } = await supabase?.from('cart_items')?.delete()?.eq('user_id', userId)
      
      if (error) {
        return { error: error?.message };
      }
      
      return { success: true }
    } catch (error) {
      return { error: 'Failed to clear cart' }
    }
  },

  async getCartSummary(userId) {
    try {
      const { data, error } = await supabase?.from('cart_items')?.select(`
          *,
          product:products(id, name, price, stock_quantity, status)
        `)?.eq('user_id', userId)
      
      if (error) {
        return { summary: null, error: error?.message };
      }
      
      const items = data || []
      const subtotal = items?.reduce((sum, item) => {
        if (item?.product?.price) {
          return sum + (item?.product?.price * item?.quantity);
        }
        return sum
      }, 0)
      
      const itemCount = items?.reduce((sum, item) => sum + item?.quantity, 0)
      
      // Calculate tax (12% in Guatemala)
      const taxRate = 0.12
      const taxAmount = subtotal * taxRate
      
      // Basic shipping calculation
      const shippingAmount = subtotal > 500 ? 0 : 50 // Free shipping over GTQ 500
      
      const total = subtotal + taxAmount + shippingAmount
      
      return {
        summary: {
          items,
          itemCount,
          subtotal,
          taxAmount,
          shippingAmount,
          total
        }
      }
    } catch (error) {
      return { summary: null, error: 'Failed to calculate cart summary' }
    }
  }
}