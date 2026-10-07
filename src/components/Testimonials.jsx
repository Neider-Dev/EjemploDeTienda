import {useState} from 'react';
import useInView from '../hooks/useInView';
import {testimonials as defaultTestimonials} from '../data/testimonials';
import './Testimonials.css';

function StarIcon({filled}) {
	return (
		<svg viewBox="0 0 24 24" width="16" height="16" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
			<path d="m12 2.5 2.9 6.2 6.6.7-4.9 4.6 1.3 6.6-5.9-3.4-5.9 3.4 1.3-6.6-4.9-4.6 6.6-.7Z" />
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

/**
 * Renderiza un título animándolo letra por letra. Cada letra ya tiene
 * su animación CSS con "animation-delay" propio, pero arranca en
 * pausa (animation-play-state: paused, ver Testimonials.css); recién
 * quedan "corriendo" cuando la sección entra en pantalla (clase
 * .is-visible en el <section>), momento en el que se ve el efecto de
 * aparición progresiva.
 */
function AnimatedTitle({segments, step = 0.025}) {
	let globalIndex = 0;

	return (
		<>
			{segments.map((segment, si) => (
				<span key={si} className={segment.accent ? 'testimonials-title-accent' : undefined}>
					{Array.from(segment.text).map((char) => {
						const delay = (globalIndex * step).toFixed(3);
						globalIndex += 1;
						return (
							<span key={globalIndex} className="testimonials-letter" style={{animationDelay: `${delay}s`}}>
								{char === ' ' ? '\u00A0' : char}
							</span>
						);
					})}
				</span>
			))}
		</>
	);
}

export default function Testimonials({
	badge = 'Clients Feedbacks',
	titleSegments = [
		{text: 'What ', accent: true},
		{text: 'Our Customers Say About Us', accent: false},
	],
	paragraph = `At Aterna, we believe that every act of kindness can spark lasting change.
    As a non-profit organization, we are dedicated to improving lives through
    education, healthcare, clean water, and community support.`,
	ctaLabel = 'Learn More',
	ctaHref = '#learn-more',
	backgroundImage = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1400&auto=format&fit=crop',
	items = defaultTestimonials,
}) {
	const [ref, isVisible] = useInView({threshold: 0.25});
	const [index, setIndex] = useState(0);

	if (!items.length) return null;

	const goTo = (newIndex) => {
		const total = items.length;
		setIndex(((newIndex % total) + total) % total);
	};

	return (
		<section ref={ref} className={`testimonials ${isVisible ? 'is-visible' : ''}`}>
			<div className="testimonials-grid">
				{/* ---- Columna de texto ---- */}
				<div className="testimonials-text">
					<span className="testimonials-badge">{badge}</span>

					<h2 className="testimonials-title">
						<AnimatedTitle segments={titleSegments} />
					</h2>

					<p className="testimonials-paragraph">{paragraph}</p>

					<a href={ctaHref} className="btn btn-accent testimonials-cta">
						{ctaLabel}
					</a>
				</div>

				{/* ---- Columna de imagen (solo lado derecho) + slider ---- */}
				<div className="testimonials-media" style={{backgroundImage: `url(${backgroundImage})`}}>
					<div className="testimonials-media-overlay" />

					<div className="testimonials-slider">
						{/* Track horizontal: todas las opiniones en fila. Al cambiar
                de índice el track se desplaza de lado a lado, así se ve
                cómo sale la anterior y entra la siguiente. */}
						<div className="testimonials-viewport">
							<div className="testimonials-track" style={{transform: `translateX(calc(${-index} * (100% + var(--slide-gap))))`}}>
								{items.map((item, i) => (
									<article key={item.id} className="testimonials-card" aria-hidden={i !== index}>
										<div className="testimonials-card-header">
											<img className="testimonials-avatar" src={item.avatar} alt="" />
											<div>
												<p className="testimonials-name">
													<span className="testimonials-name-accent">{item.name.accent}</span> {item.name.rest}
												</p>
												<p className="testimonials-role">{item.role}</p>
											</div>
										</div>
										{console.log(item.rating)}

										<div className="testimonials-stars" aria-label={`${item.rating} de 5 estrellas`}>
											{Array.from({length: 5}).map((_, s) => (
												<StarIcon key={s} filled={s < item.rating} />
											))}
										</div>

										<p className="testimonials-quote">{item.quote}</p>

										<span className="testimonials-quote-mark" aria-hidden="true">
											”
										</span>
									</article>
								))}
							</div>
						</div>

						{/* Botones de navegación: debajo del slider, a la derecha */}
						<div className="testimonials-nav">
							<button type="button" className="testimonials-nav-btn" aria-label="Opinión anterior" onClick={() => goTo(index - 1)}>
								<ArrowIcon direction="prev" />
							</button>
							<button type="button" className="testimonials-nav-btn testimonials-nav-btn--active" aria-label="Siguiente opinión" onClick={() => goTo(index + 1)}>
								<ArrowIcon direction="next" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
