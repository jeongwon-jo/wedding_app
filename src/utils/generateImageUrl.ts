function generateImageUrl({
  filename,
  format,
  option = 'q_auto,c_fill',
}: {
  filename: string
  format: 'jpg' | 'webp'
  option: string
}) {
  return `https://res.cloudinary.com/dqjqt0ld5/image/upload/${option}/v1780916123/${filename}.${format}`
  // return `https://res.cloudinary.com/dqjqt0ld5/image/upload/v1780916123/wedding_10.jpg`
}

export default generateImageUrl
