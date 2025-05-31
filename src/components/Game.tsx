import { memo } from 'react';
import { COL_COUNT, ROW_COUNT } from '../services/Game.service';
import { useGameState } from '../hooks/game-state.hook';
import GameBoard from './GameBoard';
import GameDice from './GameDice';
import RewardPopup from './RewardPopup';

const Game = memo(() => {
  const [
    { cells, currentOrder, gameStatus, showReward, currentReward },
    { movePlayer, closeReward, resetGame }
  ] = useGameState();

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <h1 className="text-3xl font-bold text-pink-500">喵喵大冒险</h1>

      {/* 显示游戏棋盘 */}
      <GameBoard
        colCount={COL_COUNT}
        rowCount={ROW_COUNT}
        cells={cells}
        currentOrder={currentOrder}
      />

      {/* 显示骰子 */}
      <GameDice
        onRoll={movePlayer}
        disabled={gameStatus === 'finished' }
      />

      {/* 游戏结束按钮 */}
      {gameStatus === 'finished' && (
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-bold mt-2"
          onClick={resetGame}
        >
          重新开始
        </button>
      )}

      {/* 奖励弹窗 */}
      {showReward && (
        <RewardPopup
          reward={currentReward}
          onClose={closeReward}
        />
      )}
    </div>
  );
});

Game.displayName = 'Game';

export default Game;