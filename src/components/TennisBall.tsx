import { useEffect, useRef, useState } from "react";

export default function TennisBall() {
  const ballRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 60, y: 120 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const ball = ballRef.current;
      if (!ball) return;

      const rect = ball.getBoundingClientRect();
      const ballCenterX = rect.left + rect.width / 2;
      const ballCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - ballCenterX;
      const dy = e.clientY - ballCenterY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        const newX = Math.random() * (window.innerWidth - 120);
        const newY = Math.random() * (window.innerHeight - 120);
        setPos({ x: newX, y: newY });
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ballRef}
      className="tennis-ball"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`
      }}
    >
      <img
        src="/images/tennis_logo.png"
        alt="Catch me tennis ball"
      />
      <span className="tennis-caption">Catch me if you can</span>
    </div>
  );
}