// Categorías que se muestran como pestañas de filtro arriba de la galería.
// "all" es especial: no filtra, muestra las 12 imágenes.
export const galleryCategories = [
	{id: 'all', label: 'All'},
	{id: 'landscape-design', label: 'Landscape Design'},
	{id: 'garden-maintenance', label: 'Garden Maintenance'},
	{id: 'lawn-installation', label: 'Lawn Installation'},
	{id: 'irrigation-systems', label: 'Irrigation Systems'},
];

// 12 imágenes, 3 por categoría. Para agregar/quitar fotos alcanza con
// editar este array — el grid y el filtro se ajustan solos.
//
// "title" es el título de la entrada de blog a la que va a apuntar el
// botón de enlace (todavía no existe esa sección, así que "blogHref"
// queda en "#" por ahora). Se divide en accent/rest para resaltar la
// primera palabra igual que en el resto del sitio.
export const galleryItems = [
	{
		id: 'g1',
		category: 'landscape-design',
		image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=900&auto=format&fit=crop',
		alt: 'Sendero de piedra hacia un portón de jardín',
		title: {accent: 'Border', rest: 'Design'},
		blogHref: '#',
	},
	{
		id: 'g2',
		category: 'garden-maintenance',
		image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=900&auto=format&fit=crop',
		alt: 'Casa rodeada de flores y arbustos prolijos',
		title: {accent: 'Seasonal', rest: 'Blooms'},
		blogHref: '#',
	},
	{
		id: 'g3',
		category: 'lawn-installation',
		image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=900&auto=format&fit=crop',
		alt: 'Canteros de madera con plantas ordenadas',
		title: {accent: 'Modern', rest: 'Planters'},
		blogHref: '#',
	},
	{
		id: 'g4',
		category: 'irrigation-systems',
		image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=900&auto=format&fit=crop',
		alt: 'Invernadero al amanecer con hileras de cultivos',
		title: {accent: 'Sunrise', rest: 'Growth'},
		blogHref: '#',
	},
	{
		id: 'g5',
		category: 'garden-maintenance',
		image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=900&auto=format&fit=crop',
		alt: 'Persona trabajando entre plantas, vista desde arriba',
		title: {accent: 'Hands-On', rest: 'Care'},
		blogHref: '#',
	},
	{
		id: 'g6',
		category: 'landscape-design',
		image: 'https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?q=80&w=900&auto=format&fit=crop',
		alt: 'Rincón exterior con luces colgantes entre árboles',
		title: {accent: 'Evening', rest: 'Retreat'},
		blogHref: '#',
	},
	{
		id: 'g7',
		category: 'irrigation-systems',
		image: 'https://images.unsplash.com/photo-1611843467160-25afb8df1074?q=80&w=900&auto=format&fit=crop',
		alt: 'Sistema de riego entre canteros verdes',
		title: {accent: 'Smart', rest: 'Watering'},
		blogHref: '#',
	},
	{
		id: 'g8',
		category: 'lawn-installation',
		image: 'https://images.unsplash.com/photo-1590212151175-e58edd96185b?q=80&w=900&auto=format&fit=crop',
		alt: 'Invernadero de vidrio con estructura metálica',
		title: {accent: 'Glass', rest: 'Structures'},
		blogHref: '#',
	},
	{
		id: 'g9',
		category: 'landscape-design',
		image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=900&auto=format&fit=crop',
		alt: 'Estantería con plantas colgantes en un balcón',
		title: {accent: 'Vertical', rest: 'Greenery'},
		blogHref: '#',
	},
	{
		id: 'g10',
		category: 'garden-maintenance',
		image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=900&auto=format&fit=crop',
		alt: 'Jardín florido en tonos rosados',
		title: {accent: 'Blooming', rest: 'Beds'},
		blogHref: '#',
	},
	{
		id: 'g11',
		category: 'lawn-installation',
		image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=900&auto=format&fit=crop',
		alt: 'Césped prolijo bajo árboles altos',
		title: {accent: 'Lush', rest: 'Lawns'},
		blogHref: '#',
	},
	{
		id: 'g12',
		category: 'irrigation-systems',
		image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=900&auto=format&fit=crop',
		alt: 'Plantas resistentes a la sequía en fila',
		title: {accent: 'Drought', rest: 'Wise'},
		blogHref: '#',
	},
];
