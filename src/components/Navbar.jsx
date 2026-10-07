import {useEffect, useState} from 'react';
import {navLinks} from '../data/navLinks';
import './Navbar.css';

/**
 * NavItem: un link del menú. Si tiene "children", se comporta como dropdown
 * (hover en desktop, click en mobile) mostrando una flechita indicadora.
 */
function NavItem({item}) {
	const [open, setOpen] = useState(false);
	const hasChildren = Boolean(item.children?.length);

	return (
		<li className="nav-item" onMouseEnter={() => hasChildren && setOpen(true)} onMouseLeave={() => hasChildren && setOpen(false)}>
			<a
				href={item.href}
				className="nav-link"
				onClick={(e) => {
					if (hasChildren) {
						e.preventDefault();
						setOpen((prev) => !prev);
					}
				}}
			>
				{item.label}
				{hasChildren && (
					<span className="nav-caret" aria-hidden="true">
						▾
					</span>
				)}
			</a>

			{hasChildren && open && (
				<ul className="nav-dropdown">
					{item.children.map((child) => (
						<li key={child.label}>
							<a href={child.href} className="nav-dropdown-link">
								{child.label}
							</a>
						</li>
					))}
				</ul>
			)}
		</li>
	);
}

export default function Navbar({
	logoText = 'Aterna',
	ctaLabel = 'Get a Quota',
	ctaHref = '#quota',
	stickyOffset = 60, // píxeles de scroll antes de "fijar" el navbar arriba
}) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [isSticky, setIsSticky] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsSticky(window.scrollY > stickyOffset);
		};

		handleScroll(); // por si la página ya carga scrolleada (ej. al recargar)
		window.addEventListener('scroll', handleScroll, {passive: true});
		return () => window.removeEventListener('scroll', handleScroll);
	}, [stickyOffset]);

	return (
		<header className={`navbar ${isSticky ? 'navbar-sticky' : ''}`}>
			<div className="navbar-inner">
				<a href="#home" className="navbar-logo">
					<span className="navbar-logo-mark" aria-hidden="true" />
					<span className="navbar-logo-text">{logoText}</span>
				</a>

				<nav className={`navbar-nav ${mobileOpen ? 'is-open' : ''}`}>
					<ul>
						{navLinks.map((item) => (
							<NavItem key={item.label} item={item} />
						))}
					</ul>
				</nav>

				<div className="navbar-actions">
					<a href={ctaHref} className="btn btn-primary navbar-cta">
						{ctaLabel}
					</a>

					<button className="navbar-burger" aria-label="Abrir menú" aria-expanded={mobileOpen} onClick={() => setMobileOpen((prev) => !prev)}>
						<span />
						<span />
						<span />
					</button>
				</div>
			</div>
		</header>
	);
}
