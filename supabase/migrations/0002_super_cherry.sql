/*
  # Add average response time to leaderboard

  1. Changes
    - Add `average_response_time` column to `leaderboard` table
    - Set default value to 0 to handle existing records
    - Make column NOT NULL to ensure data consistency

  2. Security
    - No changes to RLS policies needed
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'leaderboard' AND column_name = 'average_response_time'
  ) THEN
    ALTER TABLE leaderboard 
    ADD COLUMN average_response_time double precision NOT NULL DEFAULT 0;
  END IF;
END $$;