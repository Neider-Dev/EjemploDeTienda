import {useEffect, useRef, useState} from 'react';
import {galleryCategories, galleryItems} from '../data/gallery';
import './Gallery.css';

const EXIT_DURATION = 450; // debe coincidir con el "transition" de .gallery-item en Gallery.css

function LinkIcon() {
	return (
		<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d="M9.5 14.5 14.5 9.5" />
			<path d="M11 6.5 12.4 5.1a3.5 3.5 0 1 1 4.95 4.95L15.9 11.5" />
			<path d="M13 17.5 11.6 18.9a3.5 3.5 0 1 1-4.95-4.95L8.1 12.5" />
		</svg>
	);
}

function SearchIcon() {
	return (
		<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<circle cx="11" cy="11" r="6.5" />
			<path d="m20 20-4.3-4.3" />
		</svg>
	);
}

/**
 * Gallery: grilla de imágenes filtrable por categoría, con hover
 * (zoom + overlay + botones) y una lupa que abre la imagen en un
 * lightbox centrado sobre el resto del contenido.
 *
 * Animación del filtro (sin librerías externas, solo CSS + estado):
 * - "visibleIds": qué items están montados en el DOM ahora mismo.
 * - "enteringIds": items recién montados que todavía están en su
 *   posición "de entrada" (chicos, en la esquina opuesta, invisibles).
 *   Un frame después se les saca esa clase, y como el elemento ya
 *   tiene `transition` en su estado normal, el cambio se anima solo
 *   (crecen y llegan a su lugar desde la esquina).
 * - "leavingIds": items que ya no matchean el filtro pero se dejan
 *   montados un ratito más con la clase "leave" (se achican y se van
 *   hacia la esquina contraria); recién después de esa animación se
 *   sacan de "visibleIds" (se desmontan del todo).
 */
export default function Gallery({categories = galleryCategories, items = galleryItems, badge}) {
	const [activeCategory, setActiveCategory] = useState('all');
	const [visibleIds, setVisibleIds] = useState(() => items.map((item) => item.id));
	const [enteringIds, setEnteringIds] = useState([]);
	const [leavingIds, setLeavingIds] = useState([]);
	const [lightboxItem, setLightboxItem] = useState(null);
	const timeoutsRef = useRef([]);

	const matches = (item, category) => category === 'all' || item.category === category;

	useEffect(() => {
		const targetIds = items.filter((item) => matches(item, activeCategory)).map((i) => i.id);
		const targetSet = new Set(targetIds);

		const toLeave = visibleIds.filter((id) => !targetSet.has(id));
		const toEnter = targetIds.filter((id) => !visibleIds.includes(id));

		if (toEnter.length) {
			setEnteringIds((prev) => [...prev, ...toEnter]);
			setVisibleIds((prev) => [...prev, ...toEnter]);

			// Doble requestAnimationFrame: nos aseguramos de que el navegador
			// ya pintó el estado "de entrada" antes de sacarle la clase,
			// para que el paso al estado normal SÍ se anime.
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setEnteringIds((prev) => prev.filter((id) => !toEnter.includes(id)));
				});
			});
		}

		if (toLeave.length) {
			setLeavingIds((prev) => [...prev, ...toLeave]);
			const t = setTimeout(() => {
				setVisibleIds((prev) => prev.filter((id) => !toLeave.includes(id)));
				setLeavingIds((prev) => prev.filter((id) => !toLeave.includes(id)));
			}, EXIT_DURATION);
			timeoutsRef.current.push(t);
		}
		// Solo queremos que esto corra cuando cambia la categoría elegida;
		// "visibleIds" se lee a propósito desde el closure, no como dependencia.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeCategory]);

	// Limpieza de timeouts pendientes si el componente se desmonta.
	useEffect(() => {
		return () => timeoutsRef.current.forEach(clearTimeout);
	}, []);

	// Mientras el lightbox está abierto: bloquea el scroll de la página
	// y permite cerrarlo con la tecla Escape.
	useEffect(() => {
		if (!lightboxItem) return undefined;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		const handleKeyDown = (e) => {
			if (e.key === 'Escape') setLightboxItem(null);
		};
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [lightboxItem]);

	const orderedVisibleItems = items.filter((item) => visibleIds.includes(item.id));

	return (
		<section className="gallery">
			<div className="gallery-inner">
				{badge && <span className="gallery-badge">{badge}</span>}

				{/* ---- Filtro de categorías ---- */}
				<div className="gallery-filters" role="tablist" aria-label="Filtrar galería">
					{categories.map((cat) => (
						<button key={cat.id} type="button" role="tab" aria-selected={cat.id === activeCategory} className={`gallery-filter ${cat.id === activeCategory ? 'is-active' : ''}`} onClick={() => setActiveCategory(cat.id)}>
							{cat.label}
						</button>
					))}
				</div>

				{/* ---- Grilla ---- */}
				<div className="gallery-grid">
					{orderedVisibleItems.map((item) => {
						const state = leavingIds.includes(item.id) ? 'gallery-item--leave' : enteringIds.includes(item.id) ? 'gallery-item--enter' : '';

						return (
							<div key={item.id} className={`gallery-item ${state}`}>
								<img src={item.image} alt={item.alt} loading="lazy" />

								<div className="gallery-item-overlay">
									<div className="gallery-item-actions">
										{/* Todavía no existe la sección de blog: por ahora
                        no lleva a ningún lado (href="#"). */}
										<a href={item.blogHref} className="gallery-action-btn" aria-label={`Ir al artículo: ${item.title.accent} ${item.title.rest}`} onClick={(e) => e.preventDefault()}>
											<LinkIcon />
										</a>

										<button type="button" className="gallery-action-btn" aria-label="Ver imagen en grande" onClick={() => setLightboxItem(item)}>
											<SearchIcon />
										</button>
									</div>

									<p className="gallery-item-title">
										<span className="gallery-item-title-accent">{item.title.accent}</span> {item.title.rest}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* ---- Lightbox: la imagen centrada sobre el resto del contenido ---- */}
			{lightboxItem && (
				<div className="gallery-lightbox" onClick={() => setLightboxItem(null)} role="dialog" aria-modal="true" aria-label={`${lightboxItem.title.accent} ${lightboxItem.title.rest}`}>
					<button type="button" className="gallery-lightbox-close" aria-label="Cerrar" onClick={() => setLightboxItem(null)}>
						✕
					</button>

					{/* stopPropagation: clickear la imagen no debe cerrar el lightbox,
              solo clickear el fondo oscuro o el botón de cerrar. */}
					<div className="gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
						<img src={lightboxItem.image} alt={lightboxItem.alt} />
					</div>
				</div>
			)}
		</section>
	);
}
