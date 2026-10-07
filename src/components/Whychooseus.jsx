import useInView from '../hooks/useInView';
import './WhyChooseUs.css';

const DEFAULT_IDEAS = ['Eco-Friendly Solutions', 'Attention to Detail', 'Local Plant Expertise', 'Sustainable Practices', 'Personalized Service'];

function SendIcon() {
	return (
		<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d="M21 3 3 10.5l7.5 3L14 21l7-18Z" />
			<path d="M10.5 13.5 21 3" />
		</svg>
	);
}

/**
 * WhyChooseUs: imagen a la izquierda, texto a la derecha.
 * - Entrada por scroll: igual que About.jsx, ambas columnas convergen
 *   al centro la primera vez que la sección aparece en pantalla
 *   (ver useInView).
 * - Hover en la imagen: zoom leve + un efecto de onda circular que
 *   nace en el centro, crece y se desvanece mientras el cursor sigue
 *   encima (ver .why-ripple en WhyChooseUs.css).
 */
export default function WhyChooseUs({
	badge = 'Why Choose Us!',
	titleStart = 'Purpose Build Credibility and',
	titleAccent = 'Connection!',
	paragraph = `We are Designing Nature Defining Space. we blend creativity,
    craftsmanship, and a love for nature to create inspiring outdoor spaces.
    Whether it's a private garden, modern landscape, or sustainable green
    area, our designs are rooted in beauty and built to last.`,
	ideasLabel = 'Ideas:',
	ideas = DEFAULT_IDEAS,
	image = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1000&auto=format&fit=crop',
	imageAlt = 'Dos personas trabajando en un vivero de plantas',
	ctaLabel = 'Learn More',
	ctaHref = '#learn-more',
}) {
	const [ref, isVisible] = useInView({threshold: 0.25});

	return (
		<section ref={ref} className={`why ${isVisible ? 'is-visible' : ''}`}>
			<div className="why-inner">
				<div className="why-media">
					<div className="why-image">
						<img src={image} alt={imageAlt} />
						<span className="why-ripple" aria-hidden="true" />
					</div>
				</div>

				<div className="why-content">
					<span className="why-badge">{badge}</span>

					<h2 className="why-title">
						{titleStart} <span className="why-title-accent">{titleAccent}</span>
					</h2>

					<p className="why-paragraph">{paragraph}</p>

					<p className="why-ideas-label">{ideasLabel}</p>

					<ul className="why-checklist">
						{ideas.map((idea) => (
							<li key={idea}>
								<span className="why-check" aria-hidden="true">
									✓
								</span>
								{idea}
							</li>
						))}
					</ul>

					<a href={ctaHref} className="btn btn-accent why-cta">
						{ctaLabel}
						<SendIcon />
					</a>
				</div>
			</div>
		</section>
	);
}
