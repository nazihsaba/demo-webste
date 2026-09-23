-- Run once in the Supabase SQL Editor.
-- Adds the columns the new templates use. Safe to run twice.

-- Written by the second Apify run (the photo run).
alter table businesses add column if not exists editorial_summary    text;   -- the owner's own description
alter table businesses add column if not exists highlights           jsonb;  -- ["Great coffee", "Outdoor seating"]
alter table businesses add column if not exists review_tags          jsonb;  -- [{ "title": "frozen yogurt", "count": 22 }]
alter table businesses add column if not exists reviews_distribution jsonb;  -- { "fiveStar": 69, "fourStar": 15, ... }

-- Optional. Moves businesses that aren't food onto the new "general"
-- design. Without it, a hair salon keeps the restaurant look.
update businesses
set template = 'general'
where template = 'restaurant'
  and coalesce(category, '') !~* '(restaurant|grill|pizza|sushi|burger|steak|seafood|diner|bistro|kitchen|mezze|shawarma|food)';

-- Check: this should list 32 columns.
-- select column_name from information_schema.columns
-- where table_name = 'businesses' order by ordinal_position;
