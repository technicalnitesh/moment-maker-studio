-- Blog initial migration
CREATE TABLE IF NOT EXISTS blog_authors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    bio TEXT,
    avatar TEXT,
    website TEXT,
    social_links TEXT, -- JSON string
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    parent_id TEXT REFERENCES blog_categories(id),
    seo_title TEXT,
    seo_description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_media (
    id TEXT PRIMARY KEY,
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    width INTEGER,
    height INTEGER,
    storage_provider TEXT NOT NULL,
    storage_key TEXT NOT NULL,
    url TEXT NOT NULL,
    alt_text TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY,
    author_id TEXT NOT NULL REFERENCES blog_authors(id),
    category_id TEXT NOT NULL REFERENCES blog_categories(id),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image_id TEXT REFERENCES blog_media(id),
    status TEXT NOT NULL DEFAULT 'draft', -- draft, published, scheduled, archived
    published_at DATETIME,
    reading_time INTEGER,
    seo_title TEXT,
    seo_description TEXT,
    canonical_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_tags (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_post_tags (
    post_id TEXT NOT NULL REFERENCES blog_posts(id),
    tag_id TEXT NOT NULL REFERENCES blog_tags(id),
    PRIMARY KEY (post_id, tag_id)
);

CREATE TABLE IF NOT EXISTS blog_redirects (
    id TEXT PRIMARY KEY,
    old_path TEXT NOT NULL UNIQUE,
    new_path TEXT NOT NULL,
    status_code INTEGER NOT NULL DEFAULT 301,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_settings (
    id TEXT PRIMARY KEY,
    setting_key TEXT NOT NULL UNIQUE,
    setting_value TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_audit_logs (
    id TEXT PRIMARY KEY,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    metadata TEXT, -- JSON string
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
