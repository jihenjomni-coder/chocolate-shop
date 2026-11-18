-- ============================================================
-- 1. CHOCOLATES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.chocolates (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  description TEXT DEFAULT '',
  price_aed NUMERIC(10, 2) NOT NULL,
  weight TEXT DEFAULT '150g',
  category TEXT DEFAULT 'Signature',
  badge TEXT,
  image TEXT,
  cocoa_percent TEXT DEFAULT '60% Cocoa',
  notes TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and allow public read access to chocolates
ALTER TABLE public.chocolates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on chocolates" ON public.chocolates;
CREATE POLICY "Allow public read on chocolates"
  ON public.chocolates
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Seed the 8 Artisan Dubai Chocolates (prices in AED)
INSERT INTO public.chocolates (
  id, name, subtitle, description, price_aed, weight, category, badge, image, cocoa_percent, notes
) VALUES
  (
    'dubai-pistachio-kunafa',
    'Royal Dubai Pistachio & Kunafa Bar',
    'Crispy golden kataifi & roasted Iranian pistachio cream',
    'Our viral signature creation: silky Belgian milk chocolate encasing crunchy toasted kataifi pastry folded into rich pistachio tahini praline and finished with edible 24K gold leaf dust.',
    85,
    '200g',
    'Signature',
    'Bestseller',
    'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=900&q=85',
    '42% Milk Cocoa',
    ARRAY['Roasted Pistachio', 'Crispy Kataifi', 'Caramelized Milk']
  ),
  (
    'saffron-24k-gold-truffles',
    '24K Gold & Saffron Ganache Truffles',
    'Box of 9 hand-rolled saffron & cardamom truffles',
    'Velvety dark chocolate ganache infused with royal Khorasan saffron threads and freshly ground green cardamom, hand-dusted with shimmering gold.',
    120,
    '180g (9 pcs)',
    'Truffles',
    '24K Gold Edition',
    'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=900&q=85',
    '68% Dark Cocoa',
    ARRAY['Persian Saffron', 'Green Cardamom', 'Velvet Ganache']
  ),
  (
    'hazelnut-gianduja-rocher',
    'Piedmont Hazelnut Gianduja Rocher',
    'Whole roasted hazelnuts in caramelized praline',
    'Whole IGP Piedmont hazelnuts folded into smooth gianduja chocolate and enrobed in a crisp shell of toasted hazelnut nibs and dark milk couverture.',
    95,
    '190g (8 pcs)',
    'Pralines',
    'Chef''s Pick',
    'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=900&q=85',
    '54% Dark-Milk',
    ARRAY['Toasted Hazelnut', 'Gianduja Cream', 'Feuilletine Crunch']
  ),
  (
    'madagascar-single-origin-dark',
    '78% Sambirano Valley Single-Origin Bar',
    'Intense dark artisan slab with bright berry notes',
    'Stone-ground from rare criollo and trinitario cacao beans harvested in Madagascar''s Sambirano Valley, delivering deep cocoa complexity and a clean citrus-berry finish.',
    65,
    '120g',
    'Artisan Bars',
    NULL,
    'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=900&q=85',
    '78% Single-Origin',
    ARRAY['Red Berries', 'Roasted Cacao', 'Warm Spice']
  ),
  (
    'fleur-de-sel-caramel-bonbons',
    'Fleur de Sel Liquid Caramel Bonbons',
    'Hand-painted golden domes with molten sea-salt caramel',
    'Delicate dark chocolate shells brushed with gold cocoa butter, filled with slow-cooked Amber normandy butter caramel and Guérande sea salt crystals.',
    110,
    '160g (8 pcs)',
    'Truffles',
    'Popular',
    'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=900&q=85',
    '64% Dark Shell',
    ARRAY['Burnt Butter Caramel', 'Fleur de Sel', 'Madagascar Vanilla']
  ),
  (
    'damask-rose-pistachio-white',
    'Damask Rose & Crushed Pistachio Silk Bar',
    'Caramelized white chocolate with organic rose petals',
    'Golden caramelized blonde & white couverture studded with organic Damask rose petals, Bronte pistachio slivers, and a whisper of sea salt.',
    75,
    '140g',
    'Artisan Bars',
    NULL,
    'https://images.unsplash.com/photo-1623660053975-cf75a8be0908?auto=format&fit=crop&w=900&q=85',
    '36% Blonde & White',
    ARRAY['Damask Rose', 'Biscuit Caramel', 'Emerald Pistachio']
  ),
  (
    'arabic-qahwa-medjool-praline',
    'Arabic Qahwa & Medjool Date Pralines',
    'Emirati roasted coffee ganache & caramelized date heart',
    'A tribute to Arabian hospitality: lightly spiced Arabic coffee ganache layered over a jewel of organic Liwa Medjool date paste and walnut praline.',
    135,
    '210g (12 pcs)',
    'Signature',
    'Heritage Collection',
    'https://images.unsplash.com/photo-1542843137-8791a6904d14?auto=format&fit=crop&w=900&q=85',
    '62% Dark Couverture',
    ARRAY['Arabic Coffee', 'Liwa Medjool Date', 'Toasted Walnut']
  ),
  (
    'macadamia-gold-praline-collection',
    'Royal Macadamia & Honeycomb Gold Box',
    'Luxury gift assortment of caramelized nut pralines',
    'Crunchy Australian macadamia praline and golden wildflower honeycomb shards enveloped in velvety milk and dark chocolate, presented in our signature gold-foil gift box.',
    165,
    '260g (16 pcs)',
    'Pralines',
    'Luxury Gift Box',
    'https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2?auto=format&fit=crop&w=900&q=85',
    '48% & 70% Assorted',
    ARRAY['Roasted Macadamia', 'Wildflower Honeycomb', 'Creamy Praline']
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  price_aed = EXCLUDED.price_aed,
  weight = EXCLUDED.weight,
  category = EXCLUDED.category,
  badge = EXCLUDED.badge,
  image = EXCLUDED.image,
  cocoa_percent = EXCLUDED.cocoa_percent,
  notes = EXCLUDED.notes;

-- ============================================================
-- 2. ORDERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  emirate TEXT NOT NULL,
  address TEXT NOT NULL,
  gift_note TEXT DEFAULT '',
  payment_method TEXT NOT NULL DEFAULT 'card',
  items JSONB NOT NULL,
  subtotal_aed NUMERIC(10, 2) NOT NULL,
  delivery_fee_aed NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total_aed NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and allow public order placement
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert on orders" ON public.orders;
CREATE POLICY "Allow public insert on orders"
  ON public.orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public select on orders" ON public.orders;
CREATE POLICY "Allow public select on orders"
  ON public.orders
  FOR SELECT
  TO anon, authenticated
  USING (true);
