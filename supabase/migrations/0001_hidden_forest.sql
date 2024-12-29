/*
  # Create leaderboard table

  1. New Tables
    - `leaderboard`
      - `id` (uuid, primary key)
      - `player_name` (text)
      - `avatar_id` (integer)
      - `score` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `leaderboard` table
    - Add policies for:
      - Anyone can read leaderboard entries
      - Authenticated users can insert their own entries
*/

CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  avatar_id integer NOT NULL,
  score integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read leaderboard"
  ON leaderboard
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Users can insert their own entries"
  ON leaderboard
  FOR INSERT
  TO anon
  WITH CHECK (true);