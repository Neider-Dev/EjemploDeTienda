import {useEffect, useRef, useState} from 'react';

/**
 * useInView: devuelve [ref, isVisible].
 * Enganchá "ref" al elemento que querés observar; "isVisible" pasa a
 * true la primera vez que ese elemento entra en el viewport y se
 * queda en true (no se vuelve a disparar si el usuario scrollea
 * hacia arriba y hacia abajo de nuevo) — pensado para animaciones de
 * entrada por sección, como la de About.jsx.
 */
export default function useInView({threshold = 0.2, rootMargin = '0px'} = {}) {
	const ref = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return undefined;

		// Si el navegador no soporta IntersectionObserver, mostramos
		// el contenido directamente en vez de dejarlo oculto para siempre.
		if (typeof IntersectionObserver === 'undefined') {
			setIsVisible(true);
			return undefined;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(node); // solo se anima una vez
				}
			},
			{threshold, rootMargin},
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [threshold, rootMargin]);

	return [ref, isVisible];
}
