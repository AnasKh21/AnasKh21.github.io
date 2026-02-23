export default function WavingMascot() {
  return (
    <div className="wm-wrap" aria-label="Mascot">
      <div className="wm-orb" tabIndex={0}>
        <img
          src="/images/mascot2.png"
          alt="Anas mascot"
          className="wm-img"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            // debug visuel si path cassé
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />

        <div className="wm-badge">
          <span className="wm-hand" aria-hidden="true">👋</span>
          <span className="wm-text">Hi</span>
        </div>

        <div className="wm-tooltip" role="tooltip">
          Hey, I’m Anas — hover me ✨
        </div>
      </div>
    </div>
  );
}