const LandingVideo = () => {
  const videoPath = "/video/landing-vidya.mp4"
  return (
    <video
      autoPlay
      loop
      muted
      width="100%"
      height="100%"
      preload="none"
      className="hidden lg:block fixed inset-0 -z-10 pointer-events-none"
      aria-hidden
    >
      <source src={videoPath} type="video/mp4" />
    </video>
  )
}

export default LandingVideo
