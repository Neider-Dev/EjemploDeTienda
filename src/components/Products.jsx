import {useState} from 'react';
import {productCategories} from '../data/products';
import './Products.css';

/**
 * Products: sección con menú de pestañas. Al hacer click en una
 * pestaña, "activeId" cambia y se vuelve a renderizar el bloque de
 * contenido (texto + imagen) correspondiente a esa categoría — con
 * un pequeño fade/slide para que el cambio no sea abrupto.
 */
export default function Products({badge = 'Suggested Items', titleAccent = 'Our', titleRest = 'Awesome Products', categories = productCategories}) {
	const [activeId, setActiveId] = useState(categories[0]?.id);
	const active = categories.find((c) => c.id === activeId) ?? categories[0];

	return (
		<section className="products">
			<div className="products-inner">
				<div className="products-heading">
					<span className="products-badge">{badge}</span>
					<h2 className="products-title">
						<span className="products-title-accent">{titleAccent}</span> {titleRest}
					</h2>
				</div>

				{/* ---- Menú de pestañas ---- */}
				<div className="products-tabs" role="tablist" aria-label="Categorías de productos">
					{categories.map((cat) => (
						<button key={cat.id} type="button" role="tab" aria-selected={cat.id === activeId} className={`products-tab ${cat.id === activeId ? 'is-active' : ''}`} onClick={() => setActiveId(cat.id)}>
							{cat.tabLabel}
						</button>
					))}
				</div>

				{/* ---- Contenido de la pestaña activa ---- */}
				{/* La "key" cambia con activeId: fuerza a React a remontar este
            bloque cada vez que se elige otra pestaña, lo que retrigerea
            la animación de aparición definida en Products.css. */}
				<div className="products-content" key={active.id}>
					<div className="products-text">
						<h3 className="products-subtitle">
							<span className="products-title-accent">{active.titleAccent}</span> {active.titleRest}
						</h3>

						{active.paragraphs.map((paragraph, i) => (
							<p key={i} className="products-paragraph">
								{paragraph}
							</p>
						))}

						<a href={active.ctaHref} className="btn btn-accent products-cta">
							{active.ctaLabel}
						</a>
					</div>

					<div className="products-image">
						<img src={active.image} alt={`${active.titleAccent} ${active.titleRest}`} />
					</div>
				</div>
			</div>
		</section>
	);
}
