CREATE USER ona_user WITH PASSWORD 'OnaTower_6243_Local';

SELECT datname
FROM pg_database
WHERE datname = 'ona_towers';