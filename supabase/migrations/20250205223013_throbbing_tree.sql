/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (bigint, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `image_url` (text)
      - `category` (text)
      - `stock` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access
    - Add policy for authenticated users to manage products
*/

CREATE TABLE IF NOT EXISTS products (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  description text NOT NULL,
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  image_url text NOT NULL,
  category text NOT NULL,
  stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to manage products
CREATE POLICY "Allow authenticated users to manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);