import {useState} from 'react';
import {quickLinks, usefulLinks, socialLinks} from '../data/Footer';
import './Footer.css';

function PhoneIcon() {
	return (
		<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d="M6.5 3.5c.7 1.6 1.1 3 1.1 3.6 0 .9-1.6 1.6-1.6 2.6 0 2 4.8 6.8 6.8 6.8 1 0 1.7-1.6 2.6-1.6.6 0 2 .4 3.6 1.1.3 2.8-1.9 4-3.4 4C10.5 20 4 13.5 4 8.4c0-1.5 1.2-3.7 2.5-4.9Z" />
		</svg>
	);
}

function PinIcon() {
	return (
		<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d="M12 21s7-7.1 7-12a7 7 0 1 0-14 0c0 4.9 7 12 7 12Z" />
			<circle cx="12" cy="9" r="2.5" />
		</svg>
	);
}

function MailIcon() {
	return (
		<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<rect x="3" y="5" width="18" height="14" rx="2" />
			<path d="m4 6.5 8 6 8-6" />
		</svg>
	);
}

function ChevronIcon() {
	return (
		<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d="m9 5 7 7-7 7" />
		</svg>
	);
}

// Un ícono de red social por nombre, para no depender de una librería
// externa de íconos. Agregar uno nuevo: sumar la función acá y
// referenciarla por nombre en data/footer.js.
const SOCIAL_ICONS = {
	facebook: () => (
		<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
			<path d="M13.5 21v-7.6h2.6l.4-3h-3v-1.9c0-.9.2-1.5 1.5-1.5h1.6V4.3C15.9 4.2 15 4.1 14 4.1c-2.2 0-3.7 1.3-3.7 3.8v2.1H7.7v3h2.6V21h3.2Z" />
		</svg>
	),
	x: () => (
		<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
			<path d="M4 4l7 9.2L4.3 20H6l5.1-5.7L15.5 20H20l-7.3-9.6L19.4 4h-1.7l-4.7 5.3L8.5 4H4Zm2.5 1.3h2l9 11.4h-2l-9-11.4Z" />
		</svg>
	),
	instagram: () => (
		<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
			<rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
			<circle cx="12" cy="12" r="4" />
			<circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
		</svg>
	),
	youtube: () => (
		<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
			<rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
			<path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
		</svg>
	),
	linkedin: () => (
		<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
			<rect x="3" y="3" width="18" height="18" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
			<circle cx="7.3" cy="8.3" r="1.3" />
			<path d="M6.2 11h2.2v7H6.2v-7Zm4.3 0h2.1v1c.5-.7 1.3-1.2 2.4-1.2 1.8 0 3 1.1 3 3.4V18h-2.2v-3.4c0-1-.4-1.7-1.3-1.7-.8 0-1.3.5-1.5 1.1-.1.2-.1.4-.1.7V18h-2.2c0-3.6 0-6.4 0-7Z" />
		</svg>
	),
};

/**
 * Footer: marca + contacto, dos columnas de links, y newsletter con
 * íconos de redes sociales. El formulario de newsletter es un input
 * controlado simple; pasale "onSubscribe" para conectarlo a un
 * servicio real (Mailchimp, un endpoint propio, etc).
 */
export default function Footer({
	logoText = 'Aterna',
	description = 'Consectetur adipisicing elit, sede dolores eiuse smod temporaleste incididunt ut labore',
	phone = '+1 800 9123 456 78',
	address = '4127 Lady Bug Drive Colorado',
	email = 'example@mail.com',
	quickLinksTitle = {accent: 'Quick', rest: 'Links'},
	usefulLinksTitle = {accent: 'Useful', rest: 'Links'},
	newsletterTitle = {accent: 'Subscribe', rest: 'Newsletter'},
	newsletterText = 'Subscribe to our newsletter and stay in touch with us. Get latest updates and offers.',
	links = quickLinks,
	moreLinks = usefulLinks,
	socials = socialLinks,
	onSubscribe,
}) {
	const [subscribeEmail, setSubscribeEmail] = useState('');
	const [status, setStatus] = useState('idle'); // idle | sent

	const handleSubscribe = (e) => {
		e.preventDefault();
		if (onSubscribe) {
			onSubscribe(subscribeEmail);
		} else {
			console.log('Newsletter subscribe:', subscribeEmail);
		}
		setStatus('sent');
		setSubscribeEmail('');
		setTimeout(() => setStatus('idle'), 3500);
	};

	return (
		<footer className="footer">
			<div className="footer-inner">
				{/* ---- Marca + contacto ---- */}
				<div className="footer-col footer-brand">
					<a href="#home" className="footer-logo">
						<span className="footer-logo-mark" aria-hidden="true" />
						<span className="footer-logo-text">{logoText}</span>
					</a>

					<p className="footer-description">{description}</p>

					<ul className="footer-contact">
						<li>
							<PhoneIcon /> {phone}
						</li>
						<li>
							<PinIcon /> {address}
						</li>
						<li>
							<MailIcon /> {email}
						</li>
					</ul>
				</div>

				{/* ---- Quick Links ---- */}
				<nav className="footer-col" aria-label={`${quickLinksTitle.accent} ${quickLinksTitle.rest}`}>
					<h3 className="footer-col-title">
						<span className="footer-title-accent">{quickLinksTitle.accent}</span> {quickLinksTitle.rest}
					</h3>
					<ul className="footer-links">
						{links.map((link) => (
							<li key={link.label}>
								<a href={link.href}>
									<ChevronIcon /> {link.label}
								</a>
							</li>
						))}
					</ul>
				</nav>

				{/* ---- Useful Links ---- */}
				<nav className="footer-col" aria-label={`${usefulLinksTitle.accent} ${usefulLinksTitle.rest}`}>
					<h3 className="footer-col-title">
						<span className="footer-title-accent">{usefulLinksTitle.accent}</span> {usefulLinksTitle.rest}
					</h3>
					<ul className="footer-links">
						{moreLinks.map((link) => (
							<li key={link.label}>
								<a href={link.href}>
									<ChevronIcon /> {link.label}
								</a>
							</li>
						))}
					</ul>
				</nav>

				{/* ---- Newsletter ---- */}
				<div className="footer-col footer-newsletter">
					<h3 className="footer-col-title">
						<span className="footer-title-accent">{newsletterTitle.accent}</span> {newsletterTitle.rest}
					</h3>
					<p className="footer-newsletter-text">{newsletterText}</p>

					<form className="footer-subscribe-form" onSubmit={handleSubscribe}>
						<input type="email" required placeholder="Email" value={subscribeEmail} onChange={(e) => setSubscribeEmail(e.target.value)} aria-label="Email para suscribirse" />
						<button type="submit" className="btn btn-accent">
							{status === 'sent' ? 'Sent ✓' : 'Subscribe'}
						</button>
					</form>

					<div className="footer-socials">
						{socials.map((social) => {
							const Icon = SOCIAL_ICONS[social.icon];
							return (
								<a key={social.icon} href={social.href} className="footer-social-link" aria-label={social.label}>
									{Icon && <Icon />}
								</a>
							);
						})}
					</div>
				</div>
			</div>
		</footer>
	);
}
