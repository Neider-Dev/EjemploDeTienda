import {useState} from 'react';
import {blogPosts as defaultPosts} from '../data/blog';
import './Blog.css';

const POSTS_PER_PAGE = 3;

function TagIcon() {
	return (
		<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
			<path d="M3 5a2 2 0 0 1 2-2h5l3 3h8a2 2 0 0 1 2 2v2H3V5Z" opacity="0.55" />
			<path d="M3 9h21v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
		</svg>
	);
}

function CalendarIcon() {
	return (
		<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<rect x="3.5" y="5" width="17" height="16" rx="2" />
			<path d="M8 3v4M16 3v4M3.5 10h17" />
		</svg>
	);
}

function UserIcon() {
	return (
		<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<circle cx="12" cy="8" r="3.5" />
			<path d="M5 20c1.3-3.6 4-5.5 7-5.5s5.7 1.9 7 5.5" />
		</svg>
	);
}

function CommentIcon() {
	return (
		<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d="M4 5h16v10H9l-4 4V5Z" />
		</svg>
	);
}

function LeafIcon() {
	return (
		<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d="M5 19c8-1 13-6 14-14C11 6 6 11 5 19Z" />
		</svg>
	);
}

function ArrowIcon({direction = 'next'}) {
	return (
		<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d={direction === 'next' ? 'm9 5 7 7-7 7' : 'm15 5-7 7 7 7'} />
		</svg>
	);
}

function BlogCard({post}) {
	return (
		<article className="blog-card">
			<div className="blog-card-media">
				<img src={post.image} alt={post.title.accent + ' ' + post.title.rest} loading="lazy" />
				<span className="blog-card-tag">
					<TagIcon /> Blog
				</span>
			</div>

			<div className="blog-card-body">
				<h3 className="blog-card-title">
					<a href={post.href}>
						<span className="blog-card-title-accent">{post.title.accent}</span> {post.title.rest}
					</a>
				</h3>

				<p className="blog-card-excerpt">{post.excerpt}</p>

				<div className="blog-card-meta">
					<span>
						<CalendarIcon /> {post.date}
					</span>
					<span>
						<UserIcon /> {post.author}
					</span>
					<span>
						<CommentIcon /> Hits: {post.hits}
					</span>
				</div>

				<a href={post.href} className="blog-card-link">
					<LeafIcon /> Read More
				</a>
			</div>
		</article>
	);
}

/**
 * Blog: sección con slider de tarjetas, de a POSTS_PER_PAGE por
 * página. Las flechas (arriba a la derecha de la sección) mueven el
 * track una página entera a la vez, con loop infinito; los puntos de
 * abajo marcan en qué página estás y también permiten saltar directo.
 */
export default function Blog({badge = 'Gardening Tips!', titleAccent = 'Blog', titleRest = 'Articles on Gardening Tips Seasonal Care and Design Trends', posts = defaultPosts}) {
	const [page, setPage] = useState(0);

	const pages = [];
	for (let i = 0; i < posts.length; i += POSTS_PER_PAGE) {
		pages.push(posts.slice(i, i + POSTS_PER_PAGE));
	}
	const totalPages = pages.length;

	const goTo = (newPage) => {
		setPage(((newPage % totalPages) + totalPages) % totalPages);
	};

	return (
		<section className="blog">
			<div className="blog-inner">
				<div className="blog-header">
					<span className="blog-badge">{badge}</span>
					<h2 className="blog-title">
						<span className="blog-title-accent">{titleAccent}</span> {titleRest}
					</h2>
				</div>

				{totalPages > 1 && (
					<div className="blog-arrows">
						<button type="button" className="blog-arrow" aria-label="Página anterior" onClick={() => goTo(page - 1)}>
							<ArrowIcon direction="prev" />
						</button>
						<button type="button" className="blog-arrow blog-arrow--active" aria-label="Página siguiente" onClick={() => goTo(page + 1)}>
							<ArrowIcon direction="next" />
						</button>
					</div>
				)}
			</div>

			{/* Franja oscura de lado a lado (fuera de .blog-inner, que tiene
          max-width) — las tarjetas "se posan" sobre ella desplazándose
          hacia arriba con transform, así su parte superior queda
          todavía sobre el fondo claro de arriba. */}
			<div className="blog-band">
				<div className="blog-band-inner">
					<div className="blog-slider">
						<div className="blog-viewport">
							<div className="blog-track" style={{transform: `translateX(-${page * 100}%)`}}>
								{pages.map((group, i) => (
									<div className="blog-page" key={i}>
										{group.map((post) => (
											<BlogCard key={post.id} post={post} />
										))}
									</div>
								))}
							</div>
						</div>

						{totalPages > 1 && (
							<div className="blog-dots">
								{pages.map((_, i) => (
									<button key={i} type="button" className={`blog-dot ${i === page ? 'is-active' : ''}`} aria-label={`Ir a la página ${i + 1}`} onClick={() => goTo(i)} />
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
