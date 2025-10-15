import { supabase } from '../lib/supabase';

export const productService = {
  async getProducts(filters = {}) {
    try {
      let query = supabase?.from('products')?.select(`
          *,
          category:categories(id, name),
          brand:brands(id, name),
          images:product_images(id, image_url, alt_text, is_primary),
          reviews:product_reviews(id, rating, title, comment, user_id, created_at)
        `)?.eq('status', 'active')
      
      // Apply filters
      if (filters?.category_id) {
        query = query?.eq('category_id', filters?.category_id)
      }
      
      if (filters?.brand_id) {
        query = query?.eq('brand_id', filters?.brand_id)
      }
      
      if (filters?.min_price) {
        query = query?.gte('price', filters?.min_price)
      }
      
      if (filters?.max_price) {
        query = query?.lte('price', filters?.max_price)
      }
      
      if (filters?.search) {
        query = query?.or(`name.ilike.%${filters?.search}%,description.ilike.%${filters?.search}%`)
      }
      
      if (filters?.featured) {
        query = query?.eq('featured', true)
      }
      
      // Apply sorting
      if (filters?.sort) {
        switch (filters?.sort) {
          case 'price_asc':
            query = query?.order('price', { ascending: true })
            break
          case 'price_desc':
            query = query?.order('price', { ascending: false })
            break
          case 'name_asc':
            query = query?.order('name', { ascending: true })
            break
          case 'newest':
            query = query?.order('created_at', { ascending: false })
            break
          default:
            query = query?.order('created_at', { ascending: false })
        }
      } else {
        query = query?.order('created_at', { ascending: false })
      }
      
      const { data, error } = await query
      
      if (error) {
        return { products: [], error: error?.message };
      }
      
      return { products: data || [] }
    } catch (error) {
      if (error?.message?.includes('Failed to fetch')) {
        return { products: [], error: 'Cannot connect to database. Please check your connection.' }
      }
      return { products: [], error: 'Failed to load products' }
    }
  },

  async getProductById(productId) {
    try {
      const { data, error } = await supabase?.from('products')?.select(`
          *,
          category:categories(id, name, description),
          brand:brands(id, name, description),
          images:product_images(id, image_url, alt_text, is_primary, sort_order),
          reviews:product_reviews(
            id, rating, title, comment, created_at, is_verified,
            user:user_profiles(id, full_name)
          )
        `)?.eq('id', productId)?.eq('status', 'active')?.single()
      
      if (error) {
        return { product: null, error: error?.message };
      }
      
      return { product: data }
    } catch (error) {
      return { product: null, error: 'Failed to load product details' }
    }
  },

  async getCategories() {
    try {
      const { data, error } = await supabase?.from('categories')?.select('*')?.eq('is_active', true)?.order('name')
      
      if (error) {
        return { categories: [], error: error?.message };
      }
      
      return { categories: data || [] }
    } catch (error) {
      return { categories: [], error: 'Failed to load categories' }
    }
  },

  async getBrands() {
    try {
      const { data, error } = await supabase?.from('brands')?.select('*')?.eq('is_active', true)?.order('name')
      
      if (error) {
        return { brands: [], error: error?.message };
      }
      
      return { brands: data || [] }
    } catch (error) {
      return { brands: [], error: 'Failed to load brands' }
    }
  },

  async getFeaturedProducts(limit = 8) {
    try {
      const { data, error } = await supabase?.from('products')?.select(`
          *,
          category:categories(id, name),
          brand:brands(id, name),
          images:product_images(id, image_url, alt_text, is_primary)
        `)?.eq('status', 'active')?.eq('featured', true)?.order('created_at', { ascending: false })?.limit(limit)
      
      if (error) {
        return { products: [], error: error?.message };
      }
      
      return { products: data || [] }
    } catch (error) {
      return { products: [], error: 'Failed to load featured products' }
    }
  },

  async getRelatedProducts(productId, categoryId, limit = 4) {
    try {
      const { data, error } = await supabase?.from('products')?.select(`
          *,
          category:categories(id, name),
          brand:brands(id, name),
          images:product_images(id, image_url, alt_text, is_primary)
        `)?.eq('status', 'active')?.eq('category_id', categoryId)?.neq('id', productId)?.order('created_at', { ascending: false })?.limit(limit)
      
      if (error) {
        return { products: [], error: error?.message };
      }
      
      return { products: data || [] }
    } catch (error) {
      return { products: [], error: 'Failed to load related products' }
    }
  },

  async addProductReview(productId, reviewData) {
    try {
      const { data, error } = await supabase?.from('product_reviews')?.insert({
          product_id: productId,
          user_id: reviewData?.user_id,
          rating: reviewData?.rating,
          title: reviewData?.title,
          comment: reviewData?.comment
        })?.select()?.single()
      
      if (error) {
        return { review: null, error: error?.message };
      }
      
      return { review: data }
    } catch (error) {
      return { review: null, error: 'Failed to add review' }
    }
  }
}