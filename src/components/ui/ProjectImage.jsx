import imageVariants from '../../data/imageVariants.json'

export default function ProjectImage({ src, alt, sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw', ...props }) {
  return <img src={src} alt={alt} srcSet={imageVariants[src]} sizes={imageVariants[src] ? sizes : undefined} decoding="async" {...props} />
}
