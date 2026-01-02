🚀 Quick Start
bash
# 1. Install dependencies
npm install

# 2. Create .env file with Supabase credentials
cp .env.example .env

# 3. Set up Supabase (run database_schema.sql)

# 4. Run the app
npm run dev

# Prepico Blogs

A full-stack blog management system built with Vue.js and Supabase, featuring a powerful admin interface for creating complex blog structures.

## Features

- 🎨 Rich blog editor with support for titles, paragraphs, bullets, and media
- 🏗️ Complex nested and horizontal layouts
- 📸 Media support: images, audio, video (URLs), and files
- 💾 Cloud storage with Supabase
- 📱 Responsive design matching Prepico branding
- ✨ No authentication required (as per requirements)

## Tech Stack

- **Frontend**: Vue.js 3 (Composition API)
- **Backend**: Supabase (PostgreSQL + Storage)
- **Styling**: CSS with Prepico design palette

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account (free tier)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone 
cd prepico-blogs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Supabase Setup

#### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the database to be provisioned

#### Configure Database Schema

Run the following SQL in your Supabase SQL Editor:

```sql
-- Create blogs table
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  thumbnail TEXT,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_blogs_created_at ON blogs(created_at DESC);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations" ON blogs
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

#### Enable Storage

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `blog-media`
3. Make it public:
   - Click on the bucket
   - Go to "Policies"
   - Create new policy
   - Click on Full Custom Policy and select SELECT,INSERT,UPDATE,DELETE

### 4. Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**To find these values:**
1. Go to your Supabase project dashboard
2. Click on "Settings" → "API"
3. Copy the "Project URL" and "anon public" key under redacted section

### 5. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
prepico-blogs/
├── src/
│   ├── components/
│   │   ├── AdminEditor.vue      # Blog creation/editing interface
│   │   ├── BlogCard.vue         # Blog preview card
│   │   ├── BlogRenderer.vue     # Renders blog content
│   │   └── ContentBlock.vue     # Individual content blocks
│   ├── views/
│   │   ├── AdminView.vue        # Admin page
│   │   ├── ListView.vue         # Blog list page
│   │   └── ViewBlog.vue         # Individual blog view
│   ├── composables/
│   │   └── useSupabase.js       # Supabase client setup
│   ├── router/
│   │   └── index.js             # Vue Router configuration
│   ├── App.vue                  # Root component
│   └── main.js                  # Application entry point
├── package.json
├── vite.config.js
└── README.md
```

## Usage Guide

### Creating a Blog

1. Navigate to `/admin`
2. Enter blog title and upload a thumbnail image
3. Add content blocks:
   - **Text**: Paragraphs and headings
   - **Bullet List**: Bulleted items
   - **Image**: Upload images
   - **Video**: Embed video URLs
   - **Audio**: Embed audio URLs
   - **File**: Upload downloadable files
4. Create **rows** for horizontal layouts
5. Nest blocks within rows for complex structures
6. Click "Save Blog" to publish

### Viewing Blogs

1. Navigate to `/` to see all blogs
2. Click on any blog card to view the full content

### Managing Blogs

- The admin page shows all existing blogs
- Click "Edit" on any blog to modify it
- Click "Delete" to remove a blog

## Complex Structure Example

The editor supports nested layouts like:

```
Blog Title
├── Text Block
├── Row (Horizontal Layout)
│   ├── Image Block
│   └── Text Block
├── Bullet List
└── Row
    ├── Video Block
    ├── Text Block
    └── Audio Block
```

## Data Model

### Blogs Table Schema

| Column     | Type      | Description                    |
|------------|-----------|--------------------------------|
| id         | UUID      | Primary key                    |
| title      | TEXT      | Blog title                     |
| thumbnail  | TEXT      | Thumbnail image URL            |
| content    | JSONB     | Blog content structure         |
| created_at | TIMESTAMP | Creation timestamp             |
| updated_at | TIMESTAMP | Last update timestamp          |

### Content Structure (JSONB)

```json
{
  "blocks": [
    {
      "id": "unique-id",
      "type": "text|bulletList|image|video|audio|file|row",
      "content": "content-based-on-type",
      "children": [] // For rows and nested structures
    }
  ]
}
```

## Troubleshooting

### Supabase Connection Issues
- Verify your `.env` file has correct credentials
- Check if Supabase project is active
- Ensure RLS policies are set up correctly

### Media Upload Failures
- Verify the `blog-media` bucket exists
- Check bucket is set to public
- Confirm storage policies allow uploads

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Design Palette (Prepico Branding)

- Primary Color: #6366f1 (Indigo)
- Secondary Color: #8b5cf6 (Purple)
- Background: #ffffff (White)
- Text: #1f2937 (Gray-800)
- Accent: #10b981 (Green)

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Deployment

You can deploy to:
- Vercel: `vercel deploy`
- Netlify: Drag and drop the `dist` folder
- Supabase Hosting: Follow Supabase deployment docs

## Support

For any queries or issues, contact:
- Khasim Basith: sciencenawaaz@gmail.com

## License

This project is created for the Prepico.AI Frontend Developer Internship.

**Note**: This application does not include authentication as per requirements.
