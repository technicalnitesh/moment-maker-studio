-- Seed data for development
-- Authors
INSERT INTO blog_authors (id, name, slug, bio) VALUES 
('auth-1', 'Bhopali Mitra Team', 'bhopali-mitra-team', 'Creating moments that last forever.'),
('auth-2', 'Aman Sharma', 'aman-sharma', 'Specialist in digital surprises and creative gifting.');

-- Categories
INSERT INTO blog_categories (id, name, slug, description) VALUES 
('cat-1', 'Birthday', 'birthday', 'Celebrate birthdays with digital magic.'),
('cat-2', 'Love', 'love', 'Express your feelings in the most creative way.'),
('cat-3', 'Anniversary', 'anniversary', 'Milestones that deserve a digital celebration.');

-- Tags
INSERT INTO blog_tags (id, name, slug) VALUES 
('tag-1', 'Ideas', 'ideas'),
('tag-2', 'Digital Gift', 'digital-gift'),
('tag-3', 'Surprise', 'surprise');

-- Posts
INSERT INTO blog_posts (id, author_id, category_id, title, slug, excerpt, content, status, published_at, reading_time) VALUES 
('post-1', 'auth-1', 'cat-1', '10 Unique Digital Birthday Surprises', 'digital-birthday-surprises', 'Make their birthday special even from miles away.', '<p>Content for birthday surprises...</p>', 'published', '2026-08-20 10:00:00', 5),
('post-2', 'auth-2', 'cat-2', 'The Art of Writing a Digital Love Letter', 'digital-love-letter-art', 'How to express your heart in the digital age.', '<p>Content for love letters...</p>', 'published', '2026-08-21 12:00:00', 7);

-- Post Tags
INSERT INTO blog_post_tags (post_id, tag_id) VALUES 
('post-1', 'tag-1'),
('post-1', 'tag-3'),
('post-2', 'tag-1'),
('post-2', 'tag-2');
