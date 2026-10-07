import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Gallery from './components/Gallery';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import {heroSlides} from './data/heroSlides';
import './styles/theme.css';
import './styles/buttons.css';
import './App.css';

/**
 * App.jsx funciona como el "orquestador" de la página: por ahora solo
 * tiene Navbar + Hero (lo que se ve en la imagen de referencia), pero
 * está pensado para ir agregando secciones nuevas debajo, por ejemplo:
 *
 *   import Features from "./components/Features";
 *   import Portfolio from "./components/Portfolio";
 *
 *   <main>
 *     <Hero ... />
 *     <About ... />
 *     <Features />
 *     <Portfolio />
 *   </main>
 *   <Footer />
 *
 * Cada sección nueva es un componente independiente en /components,
 * con su propio .css, y consume los colores de styles/theme.css
 * para mantener todo consistente.
 */
export default function App() {
	return (
		<div className="app">
			<Navbar logoText="Aterna" ctaLabel="Get a Quota" ctaHref="#quota" />

			<main>
				<Hero slides={heroSlides} />
				<About />
				<Products />
				<Gallery />
				<WhyChooseUs />
				<Testimonials />
				<Blog />
				<Contact />

				{/* 👇 Acá se van agregando las próximas secciones de la página */}
			</main>

			<Footer />
		</div>
	);
}
