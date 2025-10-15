-- Location: supabase/migrations/20251012040905_labodegona_ecommerce_complete.sql
-- Schema Analysis: Fresh project - no existing schema
-- Integration Type: Complete e-commerce system with authentication
-- Dependencies: None (fresh implementation)

-- 1. ENUMS AND TYPES
CREATE TYPE public.user_role AS ENUM ('customer', 'admin', 'manager');
CREATE TYPE public.order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE public.payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE public.product_status AS ENUM ('active', 'inactive', 'out_of_stock');
CREATE TYPE public.shipping_status AS ENUM ('pending', 'processing', 'shipped', 'delivered');

-- 2. CORE USER TABLE (Intermediary for auth.users)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    role public.user_role DEFAULT 'customer'::public.user_role,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. PRODUCT SYSTEM TABLES
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    logo_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    compare_at_price DECIMAL(10,2) CHECK (compare_at_price >= price),
    cost DECIMAL(10,2) CHECK (cost >= 0),
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    low_stock_threshold INTEGER DEFAULT 10,
    sku TEXT UNIQUE,
    barcode TEXT,
    weight DECIMAL(8,2),
    status public.product_status DEFAULT 'active'::public.product_status,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    brand_id UUID REFERENCES public.brands(id) ON DELETE SET NULL,
    featured BOOLEAN DEFAULT false,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.product_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT,
    is_verified BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. USER ADDRESSES
CREATE TABLE public.user_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    label TEXT NOT NULL, -- 'home', 'work', 'billing', etc.
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    company TEXT,
    address_line_1 TEXT NOT NULL,
    address_line_2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Guatemala',
    phone TEXT,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. SHOPPING CART
CREATE TABLE public.cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    added_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- 6. ORDERS SYSTEM
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL UNIQUE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    status public.order_status DEFAULT 'pending'::public.order_status,
    payment_status public.payment_status DEFAULT 'pending'::public.payment_status,
    shipping_status public.shipping_status DEFAULT 'pending'::public.shipping_status,
    
    -- Pricing
    subtotal DECIMAL(10,2) NOT NULL CHECK (subtotal >= 0),
    tax_amount DECIMAL(10,2) DEFAULT 0 CHECK (tax_amount >= 0),
    shipping_amount DECIMAL(10,2) DEFAULT 0 CHECK (shipping_amount >= 0),
    discount_amount DECIMAL(10,2) DEFAULT 0 CHECK (discount_amount >= 0),
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
    
    -- Currency
    currency TEXT DEFAULT 'GTQ',
    
    -- Shipping Information
    shipping_first_name TEXT,
    shipping_last_name TEXT,
    shipping_company TEXT,
    shipping_address_line_1 TEXT,
    shipping_address_line_2 TEXT,
    shipping_city TEXT,
    shipping_state TEXT,
    shipping_postal_code TEXT,
    shipping_country TEXT DEFAULT 'Guatemala',
    shipping_phone TEXT,
    
    -- Billing Information
    billing_first_name TEXT,
    billing_last_name TEXT,
    billing_company TEXT,
    billing_address_line_1 TEXT,
    billing_address_line_2 TEXT,
    billing_city TEXT,
    billing_state TEXT,
    billing_postal_code TEXT,
    billing_country TEXT DEFAULT 'Guatemala',
    billing_phone TEXT,
    
    -- Dates
    ordered_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    shipped_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
    total_price DECIMAL(10,2) NOT NULL CHECK (total_price >= 0),
    product_name TEXT NOT NULL, -- Snapshot at time of order
    product_sku TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 7. WISHLIST
CREATE TABLE public.wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- 8. PAYMENT TRANSACTIONS
CREATE TABLE public.payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    transaction_id TEXT UNIQUE,
    payment_method TEXT, -- 'stripe', 'paypal', 'cash', etc.
    amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
    currency TEXT DEFAULT 'GTQ',
    status public.payment_status DEFAULT 'pending'::public.payment_status,
    gateway_response JSONB,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 9. ESSENTIAL INDEXES
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_brand ON public.products(brand_id);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_products_featured ON public.products(featured);
CREATE INDEX idx_products_price ON public.products(price);
CREATE INDEX idx_product_images_product ON public.product_images(product_id);
CREATE INDEX idx_product_reviews_product ON public.product_reviews(product_id);
CREATE INDEX idx_product_reviews_user ON public.product_reviews(user_id);
CREATE INDEX idx_cart_items_user ON public.cart_items(user_id);
CREATE INDEX idx_orders_user ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_number ON public.orders(order_number);
CREATE INDEX idx_order_items_order ON public.order_items(order_id);
CREATE INDEX idx_wishlists_user ON public.wishlists(user_id);
CREATE INDEX idx_user_addresses_user ON public.user_addresses(user_id);

-- 10. FUNCTIONS FOR ORDER NUMBER GENERATION
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $func$
DECLARE
    new_number TEXT;
    counter INTEGER;
BEGIN
    -- Generate order number like ORD-20241012-001
    SELECT COALESCE(MAX(
        CAST(
            SPLIT_PART(order_number, '-', 3) AS INTEGER
        )
    ), 0) + 1 INTO counter
    FROM public.orders 
    WHERE order_number LIKE 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-%';
    
    new_number := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(counter::TEXT, 3, '0');
    
    RETURN new_number;
END;
$func$;

-- 11. FUNCTIONS FOR USER PROFILE MANAGEMENT
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $func$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, role)
    VALUES (
        NEW.id, 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'role', 'customer')::public.user_role
    );
    RETURN NEW;
END;
$func$;

-- 12. RLS ENABLE
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

-- 13. RLS POLICIES - Using Pattern System

-- Pattern 1: Core user table (user_profiles) - Simple only, no functions
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 6A: Role-based access using auth metadata (for admin access)
CREATE OR REPLACE FUNCTION public.is_admin_from_auth()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $func$
SELECT EXISTS (
    SELECT 1 FROM auth.users au
    WHERE au.id = auth.uid() 
    AND (au.raw_user_meta_data->>'role' = 'admin' 
         OR au.raw_user_meta_data->>'role' = 'manager'
         OR au.raw_app_meta_data->>'role' = 'admin'
         OR au.raw_app_meta_data->>'role' = 'manager')
)
$func$;

-- Pattern 4: Public read, private write for categories and brands
CREATE POLICY "public_can_read_categories"
ON public.categories
FOR SELECT
TO public
USING (is_active = true);

CREATE POLICY "admin_manage_categories"
ON public.categories
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

CREATE POLICY "public_can_read_brands"
ON public.brands
FOR SELECT
TO public
USING (is_active = true);

CREATE POLICY "admin_manage_brands"
ON public.brands
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

-- Pattern 4: Public read for products and related data
CREATE POLICY "public_can_read_products"
ON public.products
FOR SELECT
TO public
USING (status = 'active'::public.product_status);

CREATE POLICY "admin_manage_products"
ON public.products
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

CREATE POLICY "public_can_read_product_images"
ON public.product_images
FOR SELECT
TO public
USING (true);

CREATE POLICY "admin_manage_product_images"
ON public.product_images
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

CREATE POLICY "public_can_read_product_reviews"
ON public.product_reviews
FOR SELECT
TO public
USING (is_approved = true);

-- Pattern 2: Simple user ownership
CREATE POLICY "users_manage_own_product_reviews"
ON public.product_reviews
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_user_addresses"
ON public.user_addresses
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_cart_items"
ON public.cart_items
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_orders"
ON public.orders
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "admin_view_all_orders"
ON public.orders
FOR SELECT
TO authenticated
USING (public.is_admin_from_auth());

CREATE POLICY "admin_update_orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

-- Pattern 7: Complex relationship for order_items (access through orders)
CREATE OR REPLACE FUNCTION public.can_access_order_item(item_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $func$
SELECT EXISTS (
    SELECT 1 FROM public.orders o
    JOIN public.order_items oi ON o.id = oi.order_id
    WHERE oi.id = item_id 
    AND (o.user_id = auth.uid() OR 
         EXISTS (SELECT 1 FROM auth.users au WHERE au.id = auth.uid() 
                 AND (au.raw_user_meta_data->>'role' IN ('admin', 'manager') 
                      OR au.raw_app_meta_data->>'role' IN ('admin', 'manager'))))
)
$func$;

CREATE POLICY "users_access_own_order_items"
ON public.order_items
FOR SELECT
TO authenticated
USING (public.can_access_order_item(id));

CREATE POLICY "users_manage_own_wishlists"
ON public.wishlists
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_view_own_payment_transactions"
ON public.payment_transactions
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.orders o 
        WHERE o.id = order_id AND o.user_id = auth.uid()
    )
);

CREATE POLICY "admin_manage_payment_transactions"
ON public.payment_transactions
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

-- 14. TRIGGERS
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 15. COMPLETE MOCK DATA
DO $$
DECLARE
    -- Auth users
    admin_uuid UUID := gen_random_uuid();
    manager_uuid UUID := gen_random_uuid();
    customer_uuid UUID := gen_random_uuid();
    customer2_uuid UUID := gen_random_uuid();
    
    -- Categories and brands
    electronics_cat UUID := gen_random_uuid();
    clothing_cat UUID := gen_random_uuid();
    home_cat UUID := gen_random_uuid();
    samsung_brand UUID := gen_random_uuid();
    nike_brand UUID := gen_random_uuid();
    
    -- Products
    laptop_id UUID := gen_random_uuid();
    shoes_id UUID := gen_random_uuid();
    lamp_id UUID := gen_random_uuid();
    
    -- Orders
    order1_id UUID := gen_random_uuid();
    order2_id UUID := gen_random_uuid();
BEGIN
    -- Create auth users with complete field structure
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@labodegona.com', crypt('Admin123!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Administrador La Bodegona", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (manager_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'gerente@labodegona.com', crypt('Gerente123!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Gerente La Bodegona", "role": "manager"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (customer_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'cliente@labodegona.com', crypt('Cliente123!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "María García", "role": "customer"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (customer2_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'juan@labodegona.com', crypt('Juan123!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Juan López", "role": "customer"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Categories
    INSERT INTO public.categories (id, name, description, is_active) VALUES
        (electronics_cat, 'Electrónicos', 'Dispositivos y gadgets electrónicos', true),
        (clothing_cat, 'Ropa y Calzado', 'Prendas de vestir y accesorios', true),
        (home_cat, 'Hogar y Jardín', 'Artículos para el hogar y decoración', true);

    -- Brands
    INSERT INTO public.brands (id, name, description, is_active) VALUES
        (samsung_brand, 'Samsung', 'Tecnología y electrónicos Samsung', true),
        (nike_brand, 'Nike', 'Ropa deportiva y calzado Nike', true);

    -- Products
    INSERT INTO public.products (id, name, description, price, compare_at_price, stock_quantity, sku, category_id, brand_id, featured, tags, status) VALUES
        (laptop_id, 'Laptop Samsung Galaxy Book', 'Laptop potente para trabajo y entretenimiento', 8500.00, 9000.00, 15, 'SAMS-LAPTOP-001', electronics_cat, samsung_brand, true, '{"tecnología", "trabajo", "entretenimiento"}', 'active'),
        (shoes_id, 'Tenis Nike Air Max', 'Tenis deportivos Nike Air Max para correr', 850.00, 950.00, 25, 'NIKE-AIRMAX-001', clothing_cat, nike_brand, true, '{"deportes", "correr", "nike"}', 'active'),
        (lamp_id, 'Lámpara LED Moderna', 'Lámpara LED moderna para escritorio', 275.00, 325.00, 30, 'LAMP-LED-001', home_cat, null, false, '{"hogar", "iluminación", "LED"}', 'active');

    -- Product Images
    INSERT INTO public.product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
        (laptop_id, '/assets/images/no_image.png', 'Laptop Samsung Galaxy Book', 1, true),
        (shoes_id, '/assets/images/no_image.png', 'Tenis Nike Air Max', 1, true),
        (lamp_id, '/assets/images/no_image.png', 'Lámpara LED Moderna', 1, true);

    -- User addresses
    INSERT INTO public.user_addresses (user_id, label, first_name, last_name, address_line_1, city, state, postal_code, country, phone, is_default) VALUES
        (customer_uuid, 'Casa', 'María', 'García', 'Avenida Las Américas 15-20', 'Guatemala', 'Guatemala', '01001', 'Guatemala', '+502 5555-1234', true),
        (customer2_uuid, 'Casa', 'Juan', 'López', 'Calzada San Juan 25-10', 'Guatemala', 'Guatemala', '01002', 'Guatemala', '+502 5555-5678', true);

    -- Cart items
    INSERT INTO public.cart_items (user_id, product_id, quantity) VALUES
        (customer_uuid, laptop_id, 1),
        (customer_uuid, shoes_id, 2),
        (customer2_uuid, lamp_id, 1);

    -- Wishlists
    INSERT INTO public.wishlists (user_id, product_id) VALUES
        (customer_uuid, lamp_id),
        (customer2_uuid, laptop_id);

    -- Orders
    INSERT INTO public.orders (
        id, order_number, user_id, status, payment_status, shipping_status,
        subtotal, tax_amount, shipping_amount, discount_amount, total_amount,
        shipping_first_name, shipping_last_name, shipping_address_line_1, shipping_city, shipping_state, shipping_postal_code, shipping_country, shipping_phone,
        billing_first_name, billing_last_name, billing_address_line_1, billing_city, billing_state, billing_postal_code, billing_country, billing_phone
    ) VALUES
        (order1_id, 'ORD-20241012-001', customer_uuid, 'confirmed', 'paid', 'processing',
         10200.00, 1224.00, 100.00, 0, 11524.00,
         'María', 'García', 'Avenida Las Américas 15-20', 'Guatemala', 'Guatemala', '01001', 'Guatemala', '+502 5555-1234',
         'María', 'García', 'Avenida Las Américas 15-20', 'Guatemala', 'Guatemala', '01001', 'Guatemala', '+502 5555-1234'),
        (order2_id, 'ORD-20241012-002', customer2_uuid, 'pending', 'pending', 'pending',
         275.00, 33.00, 50.00, 0, 358.00,
         'Juan', 'López', 'Calzada San Juan 25-10', 'Guatemala', 'Guatemala', '01002', 'Guatemala', '+502 5555-5678',
         'Juan', 'López', 'Calzada San Juan 25-10', 'Guatemala', 'Guatemala', '01002', 'Guatemala', '+502 5555-5678');

    -- Order items
    INSERT INTO public.order_items (order_id, product_id, quantity, unit_price, total_price, product_name, product_sku) VALUES
        (order1_id, laptop_id, 1, 8500.00, 8500.00, 'Laptop Samsung Galaxy Book', 'SAMS-LAPTOP-001'),
        (order1_id, shoes_id, 2, 850.00, 1700.00, 'Tenis Nike Air Max', 'NIKE-AIRMAX-001'),
        (order2_id, lamp_id, 1, 275.00, 275.00, 'Lámpara LED Moderna', 'LAMP-LED-001');

    -- Product reviews
    INSERT INTO public.product_reviews (product_id, user_id, rating, title, comment, is_verified, is_approved) VALUES
        (laptop_id, customer_uuid, 5, 'Excelente laptop', 'Muy buena calidad y rendimiento, la recomiendo totalmente', true, true),
        (shoes_id, customer2_uuid, 4, 'Buenos tenis', 'Cómodos para correr, buena calidad de Nike', true, true);

    -- Payment transactions
    INSERT INTO public.payment_transactions (order_id, transaction_id, payment_method, amount, currency, status, processed_at) VALUES
        (order1_id, 'TXN-20241012-001', 'stripe', 11524.00, 'GTQ', 'paid', now());

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;