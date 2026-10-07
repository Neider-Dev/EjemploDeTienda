import {useState} from 'react';
import './Hero.css';

/**
 * Slide individual del hero. Ocupa siempre el 100% del viewport del
 * slider (ver .hero-slide en Hero.css) y muestra su propio contenido.
 */
function HeroSlide({slide, isActive}) {
	const {backgroundImage, imageAlt, eyebrow, titleStart, titleHighlight, titleEnd, paragraph, primaryCta, secondaryCta} = slide;

	return (
		<div className="hero-slide">
			<div className="hero-slide-inner">
				{/*
          El contenido solo se monta cuando el slide está activo.
          Al cambiar de slide, React desmonta el contenido del slide
          anterior y monta uno nuevo (fresco) para el que entra, lo que
          hace que la animación CSS "hero-fade-up" se vuelva a disparar
          cada vez — recuadro, título, párrafo y botones aparecen
          deslizándose hacia arriba con un pequeño stagger entre ellos.
        */}
				{isActive && (
					<div className="hero-content">
						{eyebrow && <p className="hero-eyebrow">{eyebrow}</p>}

						<h1 className="hero-title">
							{titleStart} <span className="hero-title-accent">{titleHighlight}</span> {titleEnd}
						</h1>

						{paragraph && <p className="hero-paragraph">{paragraph}</p>}

						<div className="hero-actions">
							{primaryCta && (
								<a href={primaryCta.href} className="btn btn-accent">
									{primaryCta.label}
								</a>
							)}
							{secondaryCta && (
								<a href={secondaryCta.href} className="btn btn-dark">
									{secondaryCta.label}
								</a>
							)}
						</div>
					</div>
				)}

				{/* Imagen como recuadro al lado del texto, separada de los
            bordes del hero (ver padding/gap en .hero-slide-inner). */}
				<div className="hero-image">{backgroundImage && <img src={backgroundImage} alt={imageAlt || ''} />}</div>
			</div>
		</div>
	);
}

/**
 * Hero: slider horizontal funcional.
 * Recibe un array de "slides" (ver data/heroSlides.js) y maneja su
 * propio índice actual. Las flechas mueven el track con una transición
 * CSS (transform: translateX) hacia la izquierda o la derecha, con
 * loop infinito (del último slide vuelve al primero y viceversa).
 */
export default function Hero({slides = []}) {
	const [index, setIndex] = useState(0);

	if (!slides.length) return null;

	const goTo = (newIndex) => {
		const total = slides.length;
		setIndex(((newIndex % total) + total) % total); // wrap-around seguro
	};

	const goPrev = () => goTo(index - 1);
	const goNext = () => goTo(index + 1);

	return (
		<section className="hero" aria-roledescription="carousel">
			<button className="hero-arrow hero-arrow-left" aria-label="Slide anterior" onClick={goPrev}>
				‹
			</button>
			<button className="hero-arrow hero-arrow-right" aria-label="Slide siguiente" onClick={goNext}>
				›
			</button>

			<div className="hero-viewport">
				<div className="hero-track" style={{transform: `translateX(-${index * 100}%)`}}>
					{slides.map((slide, i) => (
						<HeroSlide key={i} slide={slide} isActive={i === index} />
					))}
				</div>
			</div>

			<div className="hero-dots">
				{slides.map((_, i) => (
					<button key={i} className={`hero-dot ${i === index ? 'is-active' : ''}`} aria-label={`Ir al slide ${i + 1}`} onClick={() => goTo(i)} />
				))}
			</div>
		</section>
	);
}
