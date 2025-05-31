import { useState, useCallback, useEffect, useMemo } from 'react';
import GameService, { type Cell } from '../services/Game.service';

export type GameStatus = 'idle' | 'playing' | 'finished';

interface GameState {
  cells: Cell[];
  currentOrder: number;
  gameStatus: GameStatus;
  showReward: boolean;
  currentReward: string;
}

interface GameActions {
  movePlayer: (steps: number) => void;
  closeReward: () => void;
  resetGame: () => void;
}

export const useGameState = (): [GameState, GameActions] => {
  const [cells, setCells] = useState<Cell[]>([]);
  const [currentOrder, setCurrentOrder] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [showReward, setShowReward] = useState(false);
  const [currentReward, setCurrentReward] = useState('');

  // 初始化游戏数据
  useEffect(() => {
    const gameCells = GameService.getCellsList();
    setCells(gameCells);
  }, []);

  const maxOrder = useMemo(() => {
    return Math.max(...cells.map(cell => cell.order));
  }, [cells]);

  // 检查游戏是否结束
  const checkGameEnd = useCallback((order: number) => {
    if (order >= maxOrder) {
      setGameStatus('finished');
    }
  }, [maxOrder]);

  // 检查特殊格子
  const checkSpecialCell = useCallback((order: number) => {
    const currentCell = GameService.getCellByOrder(cells, order);
    if (currentCell && (currentCell.type === 'special' || currentCell.type === 'end')) {
      setCurrentReward(currentCell.reward || '特别奖励');
      setShowReward(true);
    }
  }, [cells]);

  // 移动玩家
  const movePlayer = useCallback((steps: number) => {
    // 计算目标位置
    const targetOrder = Math.min(currentOrder + steps, maxOrder);
    setGameStatus('playing');

    // 模拟移动动画
    let currentStep = currentOrder;
    const moveInterval = setInterval(() => {
      if (currentStep < targetOrder) {
        currentStep += 1;
        setCurrentOrder(currentStep);
      } else {
        clearInterval(moveInterval);
        checkGameEnd(currentStep);
        checkSpecialCell(currentStep);
      }
    }, 500);
  }, [currentOrder, maxOrder, checkGameEnd, checkSpecialCell]);

  // 关闭奖励弹窗
  const closeReward = useCallback(() => {
    setShowReward(false);
  }, []);

  // 重置游戏
  const resetGame = useCallback(() => {
    setCurrentOrder(0);
    setGameStatus('idle');
    setShowReward(false);
    setCurrentReward('');
  }, []);

  return [
    { cells, currentOrder, gameStatus, showReward, currentReward },
    { movePlayer, closeReward, resetGame }
  ];
};