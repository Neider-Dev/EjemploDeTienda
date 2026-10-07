import useInView from '../hooks/useInView';
import './About.css';

const DEFAULT_CHECKLIST = ['A Modern Take on Timeless Gardens', 'Design Outdoors with Vision', 'Sustainable Designs for Beautiful Outdoors'];

/**
 * About: sección de dos columnas (imagen + texto).
 * La animación de entrada (imagen desde la izquierda, texto desde la
 * derecha, ambas convergiendo al centro) se dispara una sola vez, la
 * primera vez que la sección aparece en el viewport (ver useInView).
 */
export default function About({
	badge = 'About Aterna',
	titleAccent = 'Modern',
	titleRest = '& Clean Aesthetic!',
	paragraph = `At Aterna, we blend creativity, craftsmanship, and a love for nature to
    create inspiring outdoor spaces. Whether it's a private garden, modern
    landscape, or sustainable green area, our designs are rooted in beauty and
    built to last. We believe every outdoor space has the potential to become
    a living masterpiece.`,
	checklist = DEFAULT_CHECKLIST,
	mainImage = 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=900&auto=format&fit=crop',
	videoImage = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=600&auto=format&fit=crop',
	videoLabel = 'Watch Video',
	onWatchVideo,
}) {
	const [ref, isVisible] = useInView({threshold: 0.25});

	return (
		<section ref={ref} className={`about ${isVisible ? 'is-visible' : ''}`}>
			<div className="about-inner">
				{/* ---- Columna de imágenes ---- */}
				<div className="about-media">
					<span className="about-deco about-deco-top" aria-hidden="true" />
					<span className="about-deco about-deco-bottom" aria-hidden="true" />

					<div className="about-main-image">
						<img src={mainImage} alt="Familia disfrutando de su jardín" />
					</div>

					<button type="button" className="about-video-card" onClick={onWatchVideo} aria-label={videoLabel}>
						<img src={videoImage} alt="" />
						<span className="about-video-overlay">
							<span className="about-play-btn" aria-hidden="true">
								▶
							</span>
							<span className="about-video-label">{videoLabel}</span>
						</span>
					</button>
				</div>

				{/* ---- Columna de texto ---- */}
				<div className="about-content">
					<span className="about-badge">{badge}</span>

					<h2 className="about-title">
						<span className="about-title-accent">{titleAccent}</span> {titleRest}
					</h2>

					<p className="about-paragraph">{paragraph}</p>

					<ul className="about-checklist">
						{checklist.map((item) => (
							<li key={item}>
								<span className="about-check" aria-hidden="true">
									✓
								</span>
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
