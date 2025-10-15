import { supabase } from '../lib/supabase';

export const authService = {
  async signIn(email, password) {
    try {
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        return { error: error?.message };
      }
      
      return { data }
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('AuthRetryableFetchError')) {
        return { error: 'Cannot connect to authentication service. Please check your connection or try again later.' }
      }
      return { error: 'Authentication failed. Please try again.' }
    }
  },

  async signUp(email, password, userData = {}) {
    try {
      const { data, error } = await supabase?.auth?.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData?.full_name || '',
            role: userData?.role || 'customer'
          }
        }
      })
      
      if (error) {
        return { error: error?.message };
      }
      
      return { data }
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('AuthRetryableFetchError')) {
        return { error: 'Cannot connect to authentication service. Please check your connection or try again later.' }
      }
      return { error: 'Registration failed. Please try again.' }
    }
  },

  async signOut() {
    try {
      const { error } = await supabase?.auth?.signOut()
      if (error) {
        return { error: error?.message };
      }
      return { success: true }
    } catch (error) {
      return { error: 'Error signing out. Please try again.' }
    }
  },

  async getCurrentUser() {
    try {
      const { data: { user } } = await supabase?.auth?.getUser()
      return { user }
    } catch (error) {
      return { user: null, error: error?.message };
    }
  },

  async getSession() {
    try {
      const { data: { session }, error } = await supabase?.auth?.getSession()
      if (error) {
        return { session: null, error: error?.message };
      }
      return { session }
    } catch (error) {
      return { session: null, error: error?.message };
    }
  },

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
  }
}