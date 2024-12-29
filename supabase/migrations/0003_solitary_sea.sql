/*
  # Add response time tracking to leaderboard

  1. Changes
    - Add average_response_time column to leaderboard table
    - Set default value to 0 for backward compatibility
    - Add NOT NULL constraint to ensure data integrity

  2. Security
    - No changes to existing RLS policies needed
*/

ALTER TABLE leaderboard 
ADD COLUMN IF NOT EXISTS average_response_time double precision NOT NULL DEFAULT 0;