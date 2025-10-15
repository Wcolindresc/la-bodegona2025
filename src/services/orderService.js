import { supabase } from '../lib/supabase';

export const orderService = {
  async getUserOrders(userId, filters = {}) {
    try {
      let query = supabase?.from('orders')?.select(`
          *,
          order_items(
            *,
            product:products(id, name, sku)
          ),
          payment_transactions(*)
        `)?.eq('user_id', userId)
      
      // Apply filters
      if (filters?.status) {
        query = query?.eq('status', filters?.status)
      }
      
      if (filters?.limit) {
        query = query?.limit(filters?.limit)
      }
      
      query = query?.order('created_at', { ascending: false })
      
      const { data, error } = await query
      
      if (error) {
        return { orders: [], error: error?.message };
      }
      
      return { orders: data || [] }
    } catch (error) {
      return { orders: [], error: 'Failed to load orders' }
    }
  },

  async getOrderById(orderId) {
    try {
      const { data, error } = await supabase?.from('orders')?.select(`
          *,
          order_items(
            *,
            product:products(id, name, sku, images:product_images(image_url, is_primary))
          ),
          payment_transactions(*)
        `)?.eq('id', orderId)?.single()
      
      if (error) {
        return { order: null, error: error?.message };
      }
      
      return { order: data }
    } catch (error) {
      return { order: null, error: 'Failed to load order details' }
    }
  },

  async createOrder(orderData) {
    try {
      // Generate order number
      const { data: orderNumber, error: orderNumberError } = await supabase?.rpc('generate_order_number')
      
      if (orderNumberError) {
        return { order: null, error: 'Failed to generate order number' }
      }
      
      // Create the order
      const { data: order, error: orderError } = await supabase?.from('orders')?.insert({
          order_number: orderNumber,
          user_id: orderData?.user_id,
          status: 'pending',
          payment_status: 'pending',
          shipping_status: 'pending',
          subtotal: orderData?.subtotal,
          tax_amount: orderData?.tax_amount,
          shipping_amount: orderData?.shipping_amount,
          discount_amount: orderData?.discount_amount || 0,
          total_amount: orderData?.total_amount,
          currency: orderData?.currency || 'GTQ',
          
          // Shipping address
          shipping_first_name: orderData?.shipping_address?.first_name,
          shipping_last_name: orderData?.shipping_address?.last_name,
          shipping_company: orderData?.shipping_address?.company,
          shipping_address_line_1: orderData?.shipping_address?.address_line_1,
          shipping_address_line_2: orderData?.shipping_address?.address_line_2,
          shipping_city: orderData?.shipping_address?.city,
          shipping_state: orderData?.shipping_address?.state,
          shipping_postal_code: orderData?.shipping_address?.postal_code,
          shipping_country: orderData?.shipping_address?.country,
          shipping_phone: orderData?.shipping_address?.phone,
          
          // Billing address
          billing_first_name: orderData?.billing_address?.first_name,
          billing_last_name: orderData?.billing_address?.last_name,
          billing_company: orderData?.billing_address?.company,
          billing_address_line_1: orderData?.billing_address?.address_line_1,
          billing_address_line_2: orderData?.billing_address?.address_line_2,
          billing_city: orderData?.billing_address?.city,
          billing_state: orderData?.billing_address?.state,
          billing_postal_code: orderData?.billing_address?.postal_code,
          billing_country: orderData?.billing_address?.country,
          billing_phone: orderData?.billing_address?.phone
        })?.select()?.single()
      
      if (orderError) {
        return { order: null, error: orderError?.message };
      }
      
      // Create order items
      const orderItems = orderData?.items?.map(item => ({
        order_id: order?.id,
        product_id: item?.product_id,
        quantity: item?.quantity,
        unit_price: item?.unit_price,
        total_price: item?.total_price,
        product_name: item?.product_name,
        product_sku: item?.product_sku
      }))
      
      const { error: itemsError } = await supabase?.from('order_items')?.insert(orderItems)
      
      if (itemsError) {
        // Rollback order creation if items fail
        await supabase?.from('orders')?.delete()?.eq('id', order?.id)
        
        return { order: null, error: 'Failed to create order items' }
      }
      
      return { order }
    } catch (error) {
      return { order: null, error: 'Failed to create order' }
    }
  },

  async updateOrderStatus(orderId, status, userId = null) {
    try {
      let query = supabase?.from('orders')?.update({ 
          status,
          updated_at: new Date()?.toISOString()
        })?.eq('id', orderId)
      
      // If userId is provided, ensure the user can only update their own orders
      if (userId) {
        query = query?.eq('user_id', userId)
      }
      
      const { data, error } = await query?.select()?.single()
      
      if (error) {
        return { order: null, error: error?.message };
      }
      
      return { order: data }
    } catch (error) {
      return { order: null, error: 'Failed to update order status' }
    }
  },

  async updatePaymentStatus(orderId, paymentStatus, transactionData = null) {
    try {
      // Update order payment status
      const { data: order, error: orderError } = await supabase?.from('orders')?.update({ 
          payment_status: paymentStatus,
          updated_at: new Date()?.toISOString()
        })?.eq('id', orderId)?.select()?.single()
      
      if (orderError) {
        return { order: null, error: orderError?.message };
      }
      
      // Create payment transaction if provided
      if (transactionData) {
        const { error: transactionError } = await supabase?.from('payment_transactions')?.insert({
            order_id: orderId,
            transaction_id: transactionData?.transaction_id,
            payment_method: transactionData?.payment_method,
            amount: transactionData?.amount,
            currency: transactionData?.currency || 'GTQ',
            status: paymentStatus,
            gateway_response: transactionData?.gateway_response,
            processed_at: paymentStatus === 'paid' ? new Date()?.toISOString() : null
          })
        
        if (transactionError) {
          return { order: null, error: 'Order updated but failed to record transaction' }
        }
      }
      
      return { order }
    } catch (error) {
      return { order: null, error: 'Failed to update payment status' }
    }
  },

  async getOrderStats(userId = null) {
    try {
      let query = supabase?.from('orders')?.select('status, total_amount, created_at')
      
      if (userId) {
        query = query?.eq('user_id', userId)
      }
      
      const { data, error } = await query
      
      if (error) {
        return { stats: null, error: error?.message };
      }
      
      const orders = data || []
      const totalOrders = orders?.length
      const totalSpent = orders?.reduce((sum, order) => sum + parseFloat(order?.total_amount || 0), 0)
      
      const statusCounts = orders?.reduce((acc, order) => {
        acc[order.status] = (acc?.[order?.status] || 0) + 1
        return acc
      }, {})
      
      const recentOrders = orders?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))?.slice(0, 5)
      
      return {
        stats: {
          totalOrders,
          totalSpent,
          statusCounts,
          recentOrders
        }
      }
    } catch (error) {
      return { stats: null, error: 'Failed to calculate order statistics' }
    }
  }
}