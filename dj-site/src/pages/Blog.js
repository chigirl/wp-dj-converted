import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Blog Page — Post listing grid
 *
 * Content source: WordPress page "Blog" (page_id=791) + wp_posts (type=post)
 *
 * The WordPress site had one published blog post ("Hello world!").
 * Additional sample posts are included so the page layout is visible.
 *
 * CUSTOMIZATION / API NOTES:
 *   To load posts dynamically from an API, replace the static `posts`
 *   array with a fetch() call to ENDPOINTS.posts (src/config/api.js).
 *
 *   WordPress REST API equivalent (if keeping WP as headless CMS):
 *     GET https://your-wp-site.com/wp-json/wp/v2/posts?_embed
 *   The WP_API_URL constant in src/config/api.js points to this root.
 *
 *   Expected API response shape:
 *   [
 *     {
 *       id: 1,
 *       title: 'Post Title',
 *       slug: 'post-slug',
 *       excerpt: 'Short description...',
 *       date: 'November 16, 2019',
 *       image: '/assets/images/img-1.jpg',
 *       author: 'Jacob Black',
 *     },
 *     ...
 *   ]
 */

// ---------------------------------------------------------------------------
// Static data — extracted from jacob.sql wp_posts (type=post)
// The WordPress install had 1 published post. Additional posts added for
// demonstration purposes. Replace with API data when your back-end is ready.
// ---------------------------------------------------------------------------
const posts = [
  {
    id: 1,
    title: 'Hello World!',
    slug: 'hello-world',
    excerpt: 'Welcome to Jacob Black. This is the first post. Edit or delete it, then start writing!',
    date: 'November 16, 2019',
    image: '/assets/images/img-1.jpg',
    author: 'Jacob Black',
  },
  {
    id: 2,
    title: 'DarkStreets — New Release',
    slug: 'darkstreets-new-release',
    excerpt: 'Cameron Cooper drops his latest single "DarkStreets" — a pulsing blend of deep bass and melodic synths.',
    date: 'August 18, 2023',
    image: '/assets/images/slider-1.jpg',
    author: 'Jacob Black',
  },
  {
    id: 3,
    title: 'Live at Fabric Club, London',
    slug: 'live-at-fabric-club-london',
    excerpt: 'Priscilla Williamson delivered an unforgettable night at Fabric Club. Relive the experience through our gallery.',
    date: 'December 22, 2023',
    image: '/assets/images/slider-2.jpg',
    author: 'Jacob Black',
  },
];

function Blog() {
  return (
    <div className="page-wrapper">
      {/* Page Hero */}
      <div className="page-hero" style={{ background: '#0a0a0a' }}>
        <div className="page-hero-content">
          <h1>Blog</h1>
        </div>
      </div>

      {/* Post Grid */}
      <section className="section">
        <div className="container">
          <div className="blog-grid">
            {posts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-card-image">
                  <img src={post.image} alt={post.title} loading="lazy" />
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-date">{post.date}</div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  {/*
                   * CUSTOMIZATION: Link to individual post pages when you have
                   * a BlogPost detail component. Add a route for /blog/:slug in App.js.
                   */}
                  <Link to={`/blog/${post.slug}`} className="read-more-btn">
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blog;
