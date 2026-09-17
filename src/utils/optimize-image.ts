import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import type { OptimizedImg } from '../types/image';

export async function optimizeImage(
	src: ImageMetadata,
	widths: number[],
): Promise<OptimizedImg> {
	const img = await getImage({
		src,
		widths,
		format: 'webp',
		quality: 80,
	});

	return {
		src: img.src,
		srcSet: img.srcSet.attribute,
		width: Number(img.attributes.width),
		height: Number(img.attributes.height),
	};
}
