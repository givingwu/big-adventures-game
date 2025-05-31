import { memo } from 'react';

const GamePlayer = memo(() => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div className="text-3xl animate-bounce">
        🐱
      </div>
    </div>
  );
});

GamePlayer.displayName = 'GamePlayer';

export default GamePlayer;