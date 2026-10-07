import {useState} from 'react';
import useInView from '../hooks/useInView';
import './Contact.css';

function UserIcon() {
	return (
		<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<circle cx="12" cy="8" r="3.5" />
			<path d="M5 20c1.3-3.6 4-5.5 7-5.5s5.7 1.9 7 5.5" />
		</svg>
	);
}

function MailIcon() {
	return (
		<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<rect x="3" y="5" width="18" height="14" rx="2" />
			<path d="m4 6.5 8 6 8-6" />
		</svg>
	);
}

function CalendarIcon() {
	return (
		<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<rect x="3.5" y="5" width="17" height="16" rx="2" />
			<path d="M8 3v4M16 3v4M3.5 10h17" />
		</svg>
	);
}

function PhoneIcon() {
	return (
		<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d="M6.5 3.5c.7 1.6 1.1 3 1.1 3.6 0 .9-1.6 1.6-1.6 2.6 0 2 4.8 6.8 6.8 6.8 1 0 1.7-1.6 2.6-1.6.6 0 2 .4 3.6 1.1.3 2.8-1.9 4-3.4 4C10.5 20 4 13.5 4 8.4c0-1.5 1.2-3.7 2.5-4.9Z" />
		</svg>
	);
}

const FIELDS = [
	{name: 'name', label: 'Name', type: 'text', icon: UserIcon, half: true},
	{name: 'email', label: 'Email', type: 'email', icon: MailIcon, half: true},
	{name: 'date', label: 'Date / Time', type: 'text', icon: CalendarIcon, half: true},
	{name: 'phone', label: 'Phone', type: 'tel', icon: PhoneIcon, half: true},
];

/**
 * Contact: imagen + datos de contacto a la izquierda, formulario a la
 * derecha. El formulario es controlado por React (useState) y por
 * defecto solo hace console.log + muestra un mensaje de confirmación;
 * pasale "onSubmit" para conectarlo a un servicio de envío real
 * (un endpoint propio, Formspree, EmailJS, etc).
 */
export default function Contact({
	badge = 'Contact Us!',
	titleAccent = 'Schedule',
	titleRest = 'a Visit',
	image = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
	personName = 'Kathrina Gardian',
	personPhone = '(0123) 456 789 0',
	submitLabel = 'Submit Form',
	onSubmit,
}) {
	const [ref, isVisible] = useInView({threshold: 0.2});
	const [form, setForm] = useState({name: '', email: '', date: '', phone: '', message: ''});
	const [status, setStatus] = useState('idle'); // idle | sending | sent

	const handleChange = (field) => (e) => {
		setForm((prev) => ({...prev, [field]: e.target.value}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setStatus('sending');

		if (onSubmit) {
			onSubmit(form);
		} else {
			// Sin backend conectado todavía: solo lo dejamos en consola.
			console.log('Contact form submitted:', form);
		}

		setStatus('sent');
		setForm({name: '', email: '', date: '', phone: '', message: ''});
		setTimeout(() => setStatus('idle'), 3500);
	};

	return (
		<section ref={ref} className={`contact ${isVisible ? 'is-visible' : ''}`}>
			<div className="contact-inner">
				{/* ---- Columna de imagen ---- */}
				<div className="contact-media">
					<div className="contact-image">
						<img src={image} alt={personName} />
					</div>
					<p className="contact-person-name">{personName}</p>
					<p className="contact-person-phone">Call: {personPhone}</p>
				</div>

				{/* ---- Columna de formulario ---- */}
				<div className="contact-form-wrap">
					<span className="contact-badge">{badge}</span>
					<h2 className="contact-title">
						<span className="contact-title-accent">{titleAccent}</span> {titleRest}
					</h2>

					<form className="contact-form" onSubmit={handleSubmit}>
						<div className="contact-form-grid">
							{FIELDS.map(({name, label, type, icon: Icon}) => (
								<div className="contact-field" key={name}>
									<input type={type} name={name} placeholder={label} value={form[name]} onChange={handleChange(name)} autoComplete="off" />
									<span className="contact-field-icon" aria-hidden="true">
										<Icon />
									</span>
								</div>
							))}
						</div>

						<div className="contact-field contact-field-message">
							<textarea name="message" placeholder="Message" rows={5} value={form.message} onChange={handleChange('message')} />
						</div>

						<button type="submit" className="btn btn-accent contact-submit" disabled={status === 'sending'}>
							{status === 'sent' ? 'Message Sent ✓' : submitLabel}
						</button>
					</form>
				</div>
			</div>
		</section>
	);
}
