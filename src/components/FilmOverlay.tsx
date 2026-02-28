"use client";

export default function FilmOverlay() {
  return (
    <>
      {/* Film grain texture */}
      <div className="film-grain" />
      {/* Vignette darkened edges */}
      <div className="vignette" />
      {/* Scanlines */}
      <div className="scanlines" />
      {/* Letterbox bars — cinematic aspect ratio */}
      <div className="letterbox-top" />
      <div className="letterbox-bottom" />
    </>
  );
}
