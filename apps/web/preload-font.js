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
	}).catch( error => {
		console.error(`Error Preload font ${fontName}:`, error );
	});
}

// Helper function to lazyload fonts
function lazyloadFont(
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
	}).catch( error => {
		console.error(`Error Lazyload font ${fontName}:`, error );
	});
}

/**
 * Preload fonts
 */
document.addEventListener( 'DOMContentLoaded', () => {

	// Preload fonts in parallel
	const fontsToLoad = [
		preloadFont('flaticon_visa', '/assets/assets1/_nuxt/flaticon_visa.C9ljdjtP.ttf'),

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

	// Preload fonts
	Promise.all( fontsToLoad )
	.then();

	// Preload font icons
	const linkElement = document.createElement( 'link' );
	linkElement.rel = 'stylesheet';
	linkElement.href = 'assets/fonts/Nucleo/Nucleo.css?hs3yr9';
	document.head.appendChild( linkElement );
});

/**
 * Lazyload fonts
 */
window.addEventListener( 'load', () => {

	// Lazyload fonts in parallel
	const fontsToLoadlazy = [
		lazyloadFont( 'Inter', '/assets/fonts/Inter/body/Inter-Regular-400.ttf?hs3yr2', '400' ),
		lazyloadFont( 'Inter', '/assets/fonts/Inter/body/Inter-Medium-500.ttf?hs3yr2', '500' ),
		lazyloadFont( 'InterHeading', '/assets/fonts/Inter/heading/InterTight-Medium-500.ttf?hs3yr2', '500' ),
		lazyloadFont( 'Inter', '/assets/fonts/Inter/body/Inter-Thin-100.ttf?hs3yr2', '100' ),
		lazyloadFont( 'Inter', '/assets/fonts/Inter/body/Inter-ExtraLight-200.ttf?hs3yr2', '200' ),
		lazyloadFont( 'Inter', '/assets/fonts/Inter/body/Inter-Light-300.ttf?hs3yr2', '300' ),
		lazyloadFont( 'Inter', '/assets/fonts/Inter/body/Inter-SemiBold-600.ttf?hs3yr2', '600' ),
	];

	// Lazyload fonts
	Promise.all( fontsToLoadlazy )
	.then();
});
