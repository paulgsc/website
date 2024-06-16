export const getPexelsImage = () => {
  const category = "mountains"
  const orientation = "landscape"
  const size = "large"
  const page = Math.floor(Math.random() * 100) + 1 // Random page number
  const imageNumber = Math.floor(Math.random() * 20) + 1 // Random image number on the page

  const baseUrl = "https://images.pexels.com"
  const url = `${baseUrl}/photos/${category}/${orientation}/${size}/${page}/${imageNumber}`

  return url
}
