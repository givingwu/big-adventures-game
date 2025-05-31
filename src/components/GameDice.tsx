import { useState, useCallback, memo } from 'react';
import GameService from '../services/Game.service';

export type DiceStatus = 'idle' | 'rolling' | 'stopped';

interface GameDiceProps {
  onRoll: (value: number) => void;
  disabled?: boolean;
}

const GameDice = memo(({ onRoll, disabled = false }: GameDiceProps) => {
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState<DiceStatus>('idle');

  // 骰子点数对应的显示
  const getDiceFace = useCallback(() => {
    if (status === 'rolling') {
      return '🎲';
    }

    switch (value) {
      case 1:
        return '⚀';
      case 2:
        return '⚁';
      case 3:
        return '⚂';
      case 4:
        return '⚃';
      case 5:
        return '⚄';
      case 6:
        return '⚅';
      default:
        return '🎲';
    }
  }, [status, value]);

  // 处理骰子点击
  const handleRoll = useCallback(() => {
    if (disabled || status === 'rolling') return;

    setStatus('rolling');

    // 模拟骰子旋转
    setTimeout(() => {
      const newValue = GameService.rollDice();
      setValue(newValue);
      setStatus('stopped');
      onRoll(newValue);
    }, 1000);
  }, [disabled, status, onRoll]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`text-6xl ${status === 'rolling' ? 'animate-spin' : ''} cursor-pointer`}
        title={`骰子点数: ${value || '未掷骰'}`}
        onClick={handleRoll}
      >
        {getDiceFace()}
      </div>

      <button
        className="bg-pink-500 text-white px-6 py-2 rounded-full text-lg font-bold disabled:opacity-50"
        onClick={handleRoll}
        disabled={disabled || status === 'rolling'}
      >
        {status === 'rolling' ? '骰子旋转中...' : '摇骰子'}
      </button>
    </div>
  );
});

GameDice.displayName = 'GameDice';

export default GameDice;