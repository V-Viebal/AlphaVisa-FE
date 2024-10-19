/**
 * Preload fonts and icons
 */
document.addEventListener( 'DOMContentLoaded', () => {
	// Helper function to preload fonts
	function preloadFont(
		fontName,
		fontUrl,
		weight = 'normal',
		style = 'normal'
	) {
		const font
			= new FontFace(
				fontName,
				`url(${fontUrl})`,
				{
					weight: weight,
					style: style,
					display: 'swap',
				}
			);
		return font.load().then( loadedFont => {
			document.fonts.add( loadedFont );
		});
	}

	// Preload all fonts in parallel
	const fontsToLoad = [
		preloadFont('Inter', '/assets/fonts/Inter/body/Inter-Thin-100.ttf?hs3yr2', '100'),
		preloadFont('Inter', '/assets/fonts/Inter/body/Inter-ExtraLight-200.ttf?hs3yr2', '200'),
		preloadFont('Inter', '/assets/fonts/Inter/body/Inter-Light-300.ttf?hs3yr2', '300'),
		preloadFont('Inter', '/assets/fonts/Inter/body/Inter-Regular-400.ttf?hs3yr2', '400'),
		preloadFont('Inter', '/assets/fonts/Inter/body/Inter-Medium-500.ttf?hs3yr2', '500'),
		preloadFont('Inter', '/assets/fonts/Inter/body/Inter-SemiBold-600.ttf?hs3yr2', '600'),
		preloadFont('InterHeading', '/assets/fonts/Inter/heading/InterTight-Medium-500.ttf?hs3yr2', '500'),

		preloadFont(
			"flaticon_visa",
			'/assets/assets1/_nuxt/flaticon_visa.C9ljdjtP.ttf'
		),

		// Manrope fonts for different weights and unicode ranges
		preloadFont("Manrope", '/assets/assets1/_nuxt/Manrope-300-2.C1zWlyYG.woff2', "300"),
		preloadFont("Manrope", '/assets/assets1/_nuxt/Manrope-300-3.-KUh6X2k.woff2', "300"),
		preloadFont("Manrope", '/assets/assets1/_nuxt/Manrope-300-4.CvPE_C53.woff2', "300"),
		preloadFont("Manrope", '/assets/assets1/_nuxt/Manrope-300-5.D62tbE3i.woff2', "300"),
		preloadFont("Manrope", '/assets/assets1/_nuxt/Manrope-300-6.DWlqe-xm.woff2', "300"),
		preloadFont("Manrope", '/assets/assets1/_nuxt/Manrope-300-2.C1zWlyYG.woff2', "400"),
		preloadFont("Manrope", '/assets/assets1/_nuxt/Manrope-300-3.-KUh6X2k.woff2', "400"),
		preloadFont("Manrope", '/assets/assets1/_nuxt/Manrope-300-4.CvPE_C53.woff2', "400"),
		preloadFont("Manrope", '/assets/assets1/_nuxt/Manrope-300-5.D62tbE3i.woff2', "400"),
		preloadFont("Manrope", '/assets/assets1/_nuxt/Manrope-300-6.DWlqe-xm.woff2', "400"),
		preloadFont("Manrope", '/assets/assets1/_nuxt/Manrope-300-2.C1zWlyYG.woff2', "500"),
		preloadFont("Manrope", '/assets/assets1/_nuxt/Manrope-300-3.-KUh6X2k.woff2', "500"),
		preloadFont("Manrope", '/assets/assets1/_nuxt/Manrope-300-4.CvPE_C53.woff2', "500"),
		preloadFont("Manrope", '/assets/assets1/_nuxt/Manrope-300-5.D62tbE3i.woff2', "500"),
		preloadFont("Manrope", '/assets/assets1/_nuxt/Manrope-300-6.DWlqe-xm.woff2', "500"),
		preloadFont("Manrope", '/assets/assets1/_nuxt/Manrope-300-2.C1zWlyYG.woff2', "600"),
		preloadFont("Manrope", '/assets/assets1/_nuxt/Manrope-300-3.-KUh6X2k.woff2', "600"),
		preloadFont("Manrope", '/assets/assets1/_nuxt/Manrope-300-4.CvPE_C53.woff2', "600"),
		preloadFont("Manrope", '/assets/assets1/_nuxt/Manrope-300-5.D62tbE3i.woff2', "600"),
		preloadFont("Manrope", '/assets/assets1/_nuxt/Manrope-300-6.DWlqe-xm.woff2', "600"),
		preloadFont('Manrope', '/assets/assets1/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk6jFO_F.ttf', '300'),
		preloadFont('Manrope', '/assets/assets1/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FO_F.ttf', '400'),
		preloadFont('Manrope', '/assets/assets1/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk7PFO_F.ttf', '500'),
		preloadFont('Manrope', '/assets/assets1/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4jE-_F.ttf', '600'),
		preloadFont('Manrope', '/assets/assets1/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4aE-_F.ttf', '700'),
		preloadFont('Manrope', '/assets/assets1/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk59E-_F.ttf', '800'),
	];

	// Load all fonts
	Promise.all(fontsToLoad)
	.then(() => {
		console.log( 'All fonts loaded successfully' );
	})
	.catch((err) => {
		console.error( 'Failed to load fonts', err );
	});

	// Load Icons (stylesheet for Nucleo icons)
	const linkElement = document.createElement( 'link' );

	linkElement.rel = 'stylesheet';
	linkElement.href = 'assets/fonts/Nucleo/Nucleo.css?hs3yr4';
	document.head.appendChild( linkElement );
});
