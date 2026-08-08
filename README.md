# Moment Maker Studio

# Bhopali Mitra — Premium Interactive Digital Product Showcase Platform

Build a production-quality, modern, premium and highly responsive web platform called:

# **Bhopali Mitra**

### Tagline:

**Don’t Just Send a Wish. Create a Moment.**

Supporting tagline:

**Beautiful interactive digital experiences for birthdays, anniversaries, proposals, love, memories and special moments.**

---

# IMPORTANT PRODUCT CONCEPT

Bhopali Mitra is **NOT a digital product builder**.

Bhopali Mitra does NOT generate, edit, customize or host the actual interactive digital products.

The actual digital products are already created and ready.

Every product already has:

* Product thumbnail/image

* Product name

* Product description

* Category

* Live Preview URL

* Download URL

* Grab Code

* Social/Instagram tag

Bhopali Mitra is only responsible for:

**Discover → Show → Preview → Share → Grab/Download**

The actual Preview URL and Download URL are provided when adding a product.

Do NOT build a product editor, website builder, customization engine or product generator.

---

# CORE USER JOURNEY

The main user journey must be extremely simple:

```text

Instagram

   ↓

Bhopali Mitra

   ↓

Discover Product

   ↓

Product Details

   ↓

LIVE PREVIEW

   ↓

Preview opens using the READY Preview URL

   ↓

GRAB PROJECT

   ↓

Premium animated Grab Code modal

   ↓

Download Project

   ↓

User is redirected to the READY Download URL

```

This is the primary UX of the entire platform.

---

# TARGET PRODUCTS

The platform will mainly showcase interactive digital experiences such as:

### Birthday

* Interactive Birthday Surprise

* Birthday Wish Experience

* Birthday Memory Website

* Birthday Countdown

* Birthday Gift Experience

### Anniversary

* Interactive Anniversary Surprise

* Anniversary Memories

* Couple Journey

* Anniversary Countdown

* Digital Anniversary Gift

### Proposal

* Interactive Proposal

* Will You Marry Me?

* Romantic Proposal Experience

* Proposal Countdown

### Love

* Interactive Love Letter

* Romantic Surprise

* Love Story

* Couple Memories

* Valentine Surprise

### Memories

* Photo Memories

* Couple Gallery

* Friendship Memories

* Family Memories

* Travel Memories

### Other Special Moments

* Friendship Surprise

* Graduation Surprise

* Engagement

* Wedding

* Baby Announcement

* Achievement Celebration

Initially all products are FREE.

Design the architecture so paid products can be introduced in the future.

---

# BRAND EXPERIENCE

Bhopali Mitra should feel like a premium modern digital experience discovery platform.

It should NOT look like:

* Generic ecommerce

* Traditional blog

* Basic template marketplace

* Old Bootstrap website

* Cheap download website

It should feel:

* Premium

* Emotional

* Modern

* Youthful

* Creative

* Social-media friendly

* Instagram-first

* Fast

* Elegant

---

# DESIGN STYLE

Use a premium modern visual language inspired by:

* Apple

* Linear

* Vercel

* Framer

* Modern SaaS platforms

Use:

* Modern typography

* Large expressive headings

* Beautiful cards

* Smooth gradients

* Glass effects where appropriate

* Soft shadows

* Rounded corners

* Premium spacing

* Clean layouts

* Subtle glow

* Modern icons

Recommended fonts:

* Inter

* Manrope

* Plus Jakarta Sans

* Space Grotesk

Use a strong display font for hero headings and clean typography for body text.

---

# COLOR SYSTEM

Primary visual identity:

Dark premium background.

Use sophisticated gradients such as:

* Purple → Pink

* Blue → Violet

* Pink → Orange

Do not make the website overly colorful.

Use gradients strategically.

The overall feel should be:

**Premium + Emotional + Digital + Modern**

---

# HIGH-END ANIMATIONS

Animations are an important part of the website.

However, animations must be sophisticated.

Do NOT use random bouncing or excessive effects.

Use:

* Smooth page transitions

* Scroll reveal

* Staggered product cards

* Image hover zoom

* Card lift

* Gradient movement

* Subtle floating elements

* Smooth modal transitions

* Button micro-interactions

* Animated loaders

* Smooth category transitions

* Toast animations

* Copy-code animation

Use performant CSS transforms and opacity wherever possible.

Respect:

`prefers-reduced-motion`

---

# HOMEPAGE

Create a visually impressive homepage.

## HERO

Headline:

**Don’t Just Send a Wish. Create a Moment.**

Supporting text:

**Discover beautiful interactive digital surprises for birthdays, anniversaries, proposals, love, memories and every special moment.**

Primary CTA:

**Explore Surprises**

Secondary CTA:

**Trending Now**

Hero visual should show multiple digital experience cards floating around a central phone/device mockup.

Possible floating labels:

* 🎂 BIRTHDAY

* ❤️ LOVE

* 💍 PROPOSAL

* 💐 ANNIVERSARY

* ✨ FREE

* 🔥 TRENDING

Use subtle animation.

---

# INSTAGRAM-FIRST SECTION

Because most traffic will come from Instagram, create a dedicated section:

## **Saw it on Instagram?**

Text:

**Find it. Preview it. Grab it.**

Show a visual flow:

```text

Instagram

↓

GRAB PROJECT

↓

Bhopali Mitra

↓

Live Preview

↓

Grab

↓

Download

```

Show an Instagram-style example card.

Use:

**#GRABPROJECT**

as the visual social identity.

---

# FEATURED PRODUCT

Create a large premium section:

## **Featured Surprise**

This section should showcase one featured product.

Example:

**Interactive Birthday Surprise**

Description:

**Turn a simple birthday wish into an unforgettable digital experience.**

Show:

* Product thumbnail

* Category

* FREE badge

* Trending badge

* Features

* Live Preview button

* Grab Project button

The featured product should look visually different from normal cards.

---

# TRENDING CATEGORIES

Create:

## **Explore by Occasion**

Categories:

🎂 Birthday

💍 Anniversary

❤️ Love

💌 Proposal

📸 Memories

🎉 Celebration

👫 Friendship

💐 Special Moments

Each category should have an attractive visual card.

On mobile, make the category list horizontally scrollable.

---

# PRODUCT GRID

Create a premium responsive product grid.

Every product card should contain:

* Thumbnail

* Product name

* Short description

* Category

* FREE badge

* NEW badge where applicable

* TRENDING badge where applicable

* Social tag

* Live Preview button

* Grab Project button

Example:

### Interactive Birthday Surprise

**Category:** Birthday

**FREE**

**#GRABPROJECT**

Buttons:

**Live Preview**

**Grab Project**

---

# PRODUCT DATA

Products must be treated as DATA.

Do not hard-code individual product layouts.

Create a reusable product object such as:

```text id

slug

name

short_description

description

category

thumbnail_url

preview_url

download_url

grab_code

social_tag

features

occasion

is_free

is_featured

is_trending

is_new

status

created_at

updated_at

```

Use mock JSON data initially.

The application should be designed so this mock data can later be replaced by a REST API without rebuilding the UI.

---

# IMPORTANT URL ARCHITECTURE

Each product must have its own Bhopali Mitra URL.

Example:

`/project/interactive-birthday-surprise`

Another:

`/project/romantic-proposal`

Another:

`/project/anniversary-memory`

The product's internal `preview_url` is separate.

Example:

```text

Bhopali Mitra Product URL:

bhopalimitra.com/project/interactive-birthday-surprise

Actual Preview URL:

preview.example.com/birthday-surprise

Actual Download URL:

download.example.com/birthday-surprise.zip

```

Bhopali Mitra must NOT generate these URLs.

They are provided in product data.

---

# PRODUCT DETAIL PAGE

Create a premium product detail page.

Show:

* Large product thumbnail

* Product title

* Category

* FREE badge

* Trending/New badge

* Description

* Features

* Perfect For

* Live Preview button

* Grab Project button

* Share button

Example:

## Interactive Birthday Surprise

**Make their birthday unforgettable with an interactive digital surprise.**

Features:

* 🎂 Birthday reveal

* 📸 Photo memories

* 🎵 Music support

* ✨ Beautiful animations

* 💌 Personal message

* 🎉 Celebration ending

---

# LIVE PREVIEW

This is one of the most important features.

When user clicks:

**LIVE PREVIEW**

open the product's existing `preview_url`.

Example:

```text

product.preview_url

```

Do NOT create the preview.

Do NOT duplicate the preview inside Bhopali Mitra.

The preview already exists.

Provide a beautiful preview experience.

Possible implementation:

* Open preview in a new tab

  OR

* Open a full-screen preview modal

  OR

* Use an iframe if the external preview URL allows embedding

Prefer a full-screen experience.

Add:

**Back to Bhopali Mitra**

and:

**Share Preview**

where appropriate.

---

# SHARE PREVIEW

Every product should have:

**Share**

button.

When clicked open a beautiful share modal.

Options:

* WhatsApp

* Copy Link

* Facebook

* X

* Instagram / Copy

* Native Share API on mobile

The shared URL should be the Bhopali Mitra product URL.

Example:

`https://bhopalimitra.com/project/interactive-birthday-surprise`

---

# WHATSAPP SHARE

WhatsApp sharing is extremely important.

Generate the WhatsApp message dynamically from product data.

Example:

```text

🎁 I found something special on Bhopali Mitra!

🎂 Interactive Birthday Surprise

✨ Preview it here:

[PRODUCT URL]

💚 Grab this project for FREE

#GRABPROJECT

#BhopaliMitra

```

Do NOT hard-code the product name or URL.

Generate them dynamically.

The WhatsApp message template should be centrally configurable for future changes.

---

# GRAB PROJECT

The main CTA must be:

**GRAB PROJECT**

This should be highly visible.

When the user clicks it:

DO NOT immediately redirect to the download URL.

Instead show a premium animated modal.

---

# GRAB MODAL EXPERIENCE

Sequence:

### Step 1

Modal opens with smooth animation.

Display:

**Preparing your project...**

Show a beautiful premium loader.

### Step 2

Animated progress.

Display:

**Getting everything ready...**

### Step 3

Success state.

Display:

**Your project is ready!**

Then show:

### GRAB CODE

Example:

`BM-BIRTHDAY-7X92`

Make the code visually attractive.

Include:

**Copy Code**

button.

Then:

**Download Project**

button.

---

# DOWNLOAD BEHAVIOR

The Download Project button should use:

```text

product.download_url

```

This URL already exists.

Bhopali Mitra does NOT generate the ZIP.

Bhopali Mitra does NOT host the downloadable project.

Bhopali Mitra simply redirects the user to the existing download URL.

Example:

```text

window.open(product.download_url)

```

or an appropriate secure redirect.

Keep this abstraction ready for future payment verification.

---

# GRAB CODE

The Grab Code is associated with each product.

Example:

```text

BM-BIRTHDAY-001

BM-ANNIVERSARY-002

BM-PROPOSAL-003

```

Display it inside the Grab modal.

The code must come from product data.

Do not generate a new code every time the user clicks.

---

# CONFIGURABLE GRAB LABEL

The text:

**GRAB PROJECT**

must NOT be scattered throughout the application.

Create a central configuration:

```text

GRAB_LABEL = "GRAB PROJECT"

```

Later this can become:

```text

GET PROJECT

```

or:

```text

CLAIM PROJECT

```

or:

```text

DOWNLOAD NOW

```

The entire frontend should automatically use the configured value.

---

# SEARCH

Add a modern search experience.

Placeholder:

**Search birthday surprises, love experiences, proposals...**

Search across:

* Product name

* Category

* Occasion

* Description

* Tags

Show animated search results.

---

# FILTERING

Users should be able to filter:

* Birthday

* Anniversary

* Proposal

* Love

* Memories

* Friendship

* Celebration

* Trending

* New

* Free

Make filters beautiful on desktop.

On mobile use a bottom-sheet filter UI.

---

# TRENDING PRODUCTS

Create:

## 🔥 Trending Now

Products marked:

```text

is_trending = true

```

should appear here.

Add:

**TRENDING**

badge.

---

# FEATURED PRODUCT

Create:

## ✨ Featured Experience

Products marked:

```text

is_featured = true

```

should be eligible for this section.

This must be data-driven.

---

# NEW PRODUCTS

Create:

## ✨ Freshly Added

Products marked:

```text

is_new = true

```

appear here.

---

# ADSENSE READY

The website should be Google AdSense-ready.

Do NOT add fake advertisements.

Instead create reusable:

```text

AdSlot

```

components.

Possible locations:

* Homepage between sections

* Product listing

* Product detail

* Category pages

Keep the design prepared for future Google AdSense integration without destroying the user experience.

---

# SEO

Every Bhopali Mitra product page must be SEO-friendly.

Generate dynamically:

* Title

* Meta description

* Canonical URL

* Open Graph title

* Open Graph description

* Open Graph image

* Twitter/X metadata

Use semantic HTML.

Create SEO-friendly URLs:

```text

/project/product-slug

/category/category-slug

```

Add proper:

* H1

* H2

* H3

* Alt text

* Sitemap-ready structure

* Robots-ready structure

---

# SOCIAL PREVIEW

When a Bhopali Mitra product URL is shared on WhatsApp/social media, it should have an attractive Open Graph preview.

Use:

* Product thumbnail

* Product name

* Short description

* Bhopali Mitra branding

Metadata must be generated from product data.

---

# MANDATORY PAGES

Create:

1. Home

2. Projects

3. Categories

4. Project Details

5. About Us

6. Contact Us

7. Privacy Policy

8. Terms & Conditions

9. Disclaimer

10. Refund Policy

11. Cookie Policy

Even though products are currently free, keep legal pages ready for future monetization.

---

# HEADER

Desktop:

**Bhopali Mitra**

Navigation:

* Home

* Projects

* Categories

* Trending

* About

Right:

* Search

* Explore Projects

Header should have smooth scroll behavior.

On mobile:

* Logo

* Search

* Hamburger

Use a premium animated mobile navigation drawer.

---

# FOOTER

Include:

**Bhopali Mitra**

“Beautiful digital experiences for life's special moments.”

Links:

* Home

* Projects

* Categories

* Trending

* About

* Contact

Legal:

* Privacy Policy

* Terms

* Disclaimer

* Refund Policy

* Cookie Policy

Social:

* Instagram

* WhatsApp

Copyright:

**© 2026 Bhopali Mitra. All rights reserved.**

---

# HOMEPAGE STRUCTURE

Build the homepage in this order:

1. Premium Header

2. Hero

3. Instagram Discovery

4. Featured Experience

5. Explore by Occasion

6. Trending Products

7. Freshly Added

8. Ad Slot

9. How It Works

10. Why Bhopali Mitra

11. Final CTA

12. Footer

---

# HOW IT WORKS

Create an animated 3-step section:

### 01 — DISCOVER

Find a digital surprise you love.

### 02 — PREVIEW

Experience the actual product before grabbing it.

### 03 — GRAB

Grab the project and download it.

Visual flow:

```text

Discover → Preview → Grab

```

---

# WHY BHOPALI MITRA

Create four premium cards:

### 🎁 Ready Experiences

Beautiful digital surprises already prepared.

### 👀 Live Preview

See the actual experience before grabbing.

### ⚡ Instant Access

Simple grab and download flow.

### 📱 Made for Social

Perfect for Instagram and WhatsApp discovery.

---

# PRODUCT CARD INTERACTION

On hover:

* Thumbnail zooms slightly

* Card lifts

* Gradient glow appears

* Buttons animate

* Metadata becomes more prominent

Do NOT overdo effects.

---

# MOBILE EXPERIENCE

Instagram traffic means mobile is the highest priority.

Optimize for:

* 320px

* 375px

* 390px

* 414px

* Tablet

* Desktop

Mobile product cards must be excellent.

Buttons should be easy to tap.

The:

**LIVE PREVIEW**

and

**GRAB PROJECT**

actions should remain highly visible.

---

# PERFORMANCE

Even with premium animations, the site must remain fast.

Use:

* Lazy loading

* Optimized images

* Code splitting

* Efficient rendering

* CSS transforms

* Minimal unnecessary JavaScript

Do not use heavy animation libraries unless actually required.

---

# ACCESSIBILITY

Support:

* Keyboard navigation

* Focus states

* Accessible buttons

* Accessible modal

* Escape key to close modal

* ARIA labels

* Good contrast

* Reduced motion

---

# ERROR STATES

Create polished states for:

### Preview unavailable

“Looks like this surprise is taking a little break.”

Button:

**Back to Projects**

### Download unavailable

“Download is temporarily unavailable.”

### Product unavailable

“This experience is no longer available.”

Do not show raw technical errors.

---

# LOADING STATES

Use skeleton loaders for:

* Product cards

* Product details

* Search results

* Categories

Use a dedicated premium animation for:

**GRAB PROJECT**

---

# FUTURE API READY

IMPORTANT:

The first version may use local/mock JSON.

But structure the application as if products will come from an API.

Example future endpoint:

```text

GET /api/products

GET /api/products/{slug}

GET /api/categories

```

Do not hard-code product information inside UI components.

Create a clean data/service layer.

Later the mock data should be replaceable by API calls with minimal changes.

---

# FUTURE ADMIN SUPPORT

Do not build a full admin panel now.

But structure the data so a future CI3/PHP admin panel can manage:

* Product

* Category

* Thumbnail

* Description

* Preview URL

* Download URL

* Grab Code

* Social Tag

* Featured

* Trending

* New

* Status

* Sort order

---

# FUTURE PAYMENT SUPPORT

Currently:

**ALL PRODUCTS ARE FREE.**

Do NOT implement payment gateway now.

However, architecture should allow future:

```text

FREE

PAID

```

product types.

Future flow:

```text

Preview

↓

Grab

↓

Payment

↓

Payment Verification

↓

Download

```

The current Download button should directly use the existing `download_url`.

---

# FUTURE ANALYTICS

Keep architecture ready for future tracking:

* Product views

* Preview clicks

* Grab clicks

* Download clicks

* WhatsApp shares

* Copy link clicks

* Most trending products

Do not necessarily implement analytics now.

---

# SAMPLE PRODUCT DATA

Create at least 12 realistic sample products.

Examples:

1. Interactive Birthday Surprise

2. Birthday Memory Experience

3. Romantic Anniversary Surprise

4. Our Love Story

5. Interactive Marriage Proposal

6. Will You Marry Me?

7. Digital Love Letter

8. Valentine Surprise

9. Couple Memory Journey

10. Best Friend Surprise

11. Friendship Memory Experience

12. Graduation Celebration

Each sample product must contain:

```text

id

slug

name

short_description

description

category

occasion

thumbnail_url

preview_url

download_url

grab_code

social_tag

features

is_free

is_featured

is_trending

is_new

status

```

Use realistic placeholder URLs for the demo.

Clearly separate demo/mock URLs from production configuration.

---

# COMPONENT ARCHITECTURE

Create reusable components:

* Header

* Footer

* Hero

* ProductCard

* ProductGrid

* FeaturedProduct

* CategoryCard

* CategorySection

* Search

* FilterBar

* ShareModal

* GrabModal

* DownloadButton

* PreviewButton

* AdSlot

* Badge

* Toast

* LoadingSkeleton

* EmptyState

* ErrorState

Do not create one giant component.

Keep the project maintainable.

---

# CENTRAL CONFIGURATION

Create a central configuration file for:

```text

BRAND_NAME

SITE_URL

GRAB_LABEL

DEFAULT_META_TITLE

DEFAULT_META_DESCRIPTION

WHATSAPP_MESSAGE_TEMPLATE

SOCIAL_HASHTAGS

```

Example:

```text

BRAND_NAME = "Bhopali Mitra"

GRAB_LABEL = "GRAB PROJECT"

```

This makes future changes easy.

---

# FINAL BRAND MESSAGE

The final website should communicate:

## “Don’t Just Send a Wish. Create a Moment.”

Bhopali Mitra is a place where people discover beautiful interactive digital experiences for the people they love.

The core experience is:

**Instagram → Discover → Preview → Grab → Download**

The website should be visually impressive enough that an Instagram visitor immediately wants to explore more products.

---

# MOST IMPORTANT TECHNICAL RULE

Again:

**Bhopali Mitra DOES NOT CREATE THE DIGITAL PRODUCTS.**

Every digital product already exists externally.

Bhopali Mitra only stores/displays:

```text

Product Information

+

Preview URL

+

Download URL

+

Grab Code

```

When the user clicks:

**LIVE PREVIEW**

→ Open the product's existing `preview_url`.

When the user completes:

**GRAB PROJECT**

→ Show the premium Grab animation.

When the user clicks:

**DOWNLOAD PROJECT**

→ Open/redirect to the product's existing `download_url`.

Do not build any product-generation system.

Do not build a website builder.

Do not build a customization editor.

Do not generate ZIP files.

Do not generate preview pages.

Focus entirely on creating the **best possible product discovery, preview, sharing and grabbing experience** for Bhopali Mitra.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0ee0f6fa-d7fd-4711-99b7-ca4b4155cd64).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
