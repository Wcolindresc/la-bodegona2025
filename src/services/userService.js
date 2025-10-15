import { supabase } from '../lib/supabase';

export const userService = {
  async getUserProfile(userId) {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.select('*')?.eq('id', userId)?.single()
      
      if (error) {
        return { profile: null, error: error?.message };
      }
      
      return { profile: data }
    } catch (error) {
      return { profile: null, error: 'Failed to load user profile' }
    }
  },

  async updateUserProfile(userId, profileData) {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.update({
          full_name: profileData?.full_name,
          phone: profileData?.phone,
          updated_at: new Date()?.toISOString()
        })?.eq('id', userId)?.select()?.single()
      
      if (error) {
        return { profile: null, error: error?.message };
      }
      
      return { profile: data }
    } catch (error) {
      return { profile: null, error: 'Failed to update profile' }
    }
  },

  async getUserAddresses(userId) {
    try {
      const { data, error } = await supabase?.from('user_addresses')?.select('*')?.eq('user_id', userId)?.order('is_default', { ascending: false })?.order('created_at', { ascending: false })
      
      if (error) {
        return { addresses: [], error: error?.message };
      }
      
      return { addresses: data || [] }
    } catch (error) {
      return { addresses: [], error: 'Failed to load addresses' }
    }
  },

  async addUserAddress(userId, addressData) {
    try {
      // If this is set as default, unset other defaults first
      if (addressData?.is_default) {
        await supabase?.from('user_addresses')?.update({ is_default: false })?.eq('user_id', userId)
      }
      
      const { data, error } = await supabase?.from('user_addresses')?.insert({
          user_id: userId,
          ...addressData
        })?.select()?.single()
      
      if (error) {
        return { address: null, error: error?.message };
      }
      
      return { address: data }
    } catch (error) {
      return { address: null, error: 'Failed to add address' }
    }
  },

  async updateUserAddress(addressId, userId, addressData) {
    try {
      // If this is set as default, unset other defaults first
      if (addressData?.is_default) {
        await supabase?.from('user_addresses')?.update({ is_default: false })?.eq('user_id', userId)
      }
      
      const { data, error } = await supabase?.from('user_addresses')?.update(addressData)?.eq('id', addressId)?.eq('user_id', userId)?.select()?.single()
      
      if (error) {
        return { address: null, error: error?.message };
      }
      
      return { address: data }
    } catch (error) {
      return { address: null, error: 'Failed to update address' }
    }
  },

  async deleteUserAddress(addressId, userId) {
    try {
      const { error } = await supabase?.from('user_addresses')?.delete()?.eq('id', addressId)?.eq('user_id', userId)
      
      if (error) {
        return { error: error?.message };
      }
      
      return { success: true }
    } catch (error) {
      return { error: 'Failed to delete address' }
    }
  },

  async getWishlist(userId) {
    try {
      const { data, error } = await supabase?.from('wishlists')?.select(`
          *,
          product:products(
            id, name, price, status,
            images:product_images!inner(image_url, is_primary),
            category:categories(name),
            brand:brands(name)
          )
        `)?.eq('user_id', userId)?.order('added_at', { ascending: false })
      
      if (error) {
        return { wishlist: [], error: error?.message };
      }
      
      return { wishlist: data || [] }
    } catch (error) {
      return { wishlist: [], error: 'Failed to load wishlist' }
    }
  },

  async addToWishlist(userId, productId) {
    try {
      const { data, error } = await supabase?.from('wishlists')?.insert({
          user_id: userId,
          product_id: productId
        })?.select()?.single()
      
      if (error) {
        if (error?.code === '23505') { // Unique constraint violation
          return { item: null, error: 'Product is already in your wishlist' }
        }
        return { item: null, error: error?.message };
      }
      
      return { item: data }
    } catch (error) {
      return { item: null, error: 'Failed to add to wishlist' }
    }
  },

  async removeFromWishlist(userId, productId) {
    try {
      const { error } = await supabase?.from('wishlists')?.delete()?.eq('user_id', userId)?.eq('product_id', productId)
      
      if (error) {
        return { error: error?.message };
      }
      
      return { success: true }
    } catch (error) {
      return { error: 'Failed to remove from wishlist' }
    }
  },

  async isInWishlist(userId, productId) {
    try {
      const { data, error } = await supabase?.from('wishlists')?.select('id')?.eq('user_id', userId)?.eq('product_id', productId)?.single()
      
      if (error) {
        if (error?.code === 'PGRST116') { // No rows returned
          return { inWishlist: false }
        }
        return { inWishlist: false, error: error?.message };
      }
      
      return { inWishlist: !!data }
    } catch (error) {
      return { inWishlist: false, error: 'Failed to check wishlist status' }
    }
  }
}