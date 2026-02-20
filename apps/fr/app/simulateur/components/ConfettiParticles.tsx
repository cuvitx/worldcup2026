export function ConfettiParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 0.8}s`,
    color: ["#FF6B35", "#f5a623", "#06D6A0", "#2EC4B6", "#EF476F"][
      Math.floor(Math.random() * 5)
    ], // accent, gold, success, secondary, error
    size: `${6 + Math.random() * 8}px`,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute confetti-particle"
          style={{
            left: p.left,
            top: "-10px",
            width: p.size,
            height: p.size,
            background: p.color,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
