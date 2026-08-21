# Bhopali Mitra Blog Admin CMS Implementation Plan

This plan outlines the implementation of a full-featured Admin CMS for the Bhopali Mitra blog, allowing management of articles, categories, and tags while maintaining strict isolation from existing product functionality.

## 1. Authentication & Security
- **Admin Protection**: Implement a simple pathless route `src/routes/_admin.tsx` to protect all `/admin/*` routes.
- **Minimal Auth**: Since no existing auth is detected, I'll implement a basic session-based protection or a simple password gate for the admin area, following the user's request for "minimum server-side protection".
- **API Security**: All write operations (POST, PUT, DELETE) will be restricted to authenticated admin sessions.

## 2. API Extensions (`/api/blog/*`)
- **Posts**:
  - `GET /api/blog/admin/posts`: Returns all posts (including drafts/scheduled) with full metadata.
  - `POST /api/blog/posts`: Create a new post.
  - `PUT /api/blog/posts/:id`: Update an existing post by ID.
  - `DELETE /api/blog/posts/:id`: Delete (or soft-delete) a post.
- **Categories/Tags**:
  - `POST/PUT/DELETE` endpoints for both categories and tags.
- **Search**: Extend search to include draft status for admin view.

## 3. UI Components (Admin)
- **Layout**: `AdminSidebar` for navigation, `AdminHeader` for status and quick actions.
- **Article Editor**: A premium writing interface with:
  - Rich text support (using a lightweight library or clean markdown interface).
  - Slug auto-generation with normalization.
  - Metadata fields (Excerpt, Category, Tags, SEO).
  - Save as Draft vs. Publish controls.
- **Management Tables**: Responsive tables for listing posts, categories, and tags with filters and search.

## 4. Routes
- `/admin/blog`: Dashboard with statistics.
- `/admin/blog/posts`: Main post management list.
- `/admin/blog/posts/new`: Article creation.
- `/admin/blog/posts/edit/:id`: Article editing.
- `/admin/blog/categories`: Category management.
- `/admin/blog/tags`: Tag management.

## 5. Service Layer Updates (`src/lib/blog.ts`)
- Add methods: `createPost`, `updatePost`, `deletePost`, `getAdminPosts`, `getPostById`.
- Ensure all methods handle the new API endpoints and authentication headers.

## Technical Details
- **Database**: All operations will use the existing D1 `DB` binding.
- **Editor**: I'll use `react-quill` or a similar lightweight editor that supports the requested rich text features.
- **Safety**: Existing `/blog` public pages will remain untouched visually but will correctly show newly published content. Product pages are completely isolated.

## Implementation Steps
1. **API & Service**: Implement the CRUD handlers in `src/routes/api/blog/*` and update `src/lib/blog.ts`.
2. **Layout & Dashboard**: Create `src/routes/admin/blog/route.tsx` and the dashboard view.
3. **Post Management**: Create the listing page and filtering logic.
4. **Editor**: Build the article creation/editing form with slug generation and rich text support.
5. **Taxonomies**: Implement category and tag management pages.
6. **Final Integration**: Connect all workflows and verify the draft/publish cycle.
