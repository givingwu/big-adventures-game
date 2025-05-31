import { memo, useState, useEffect } from 'react';

interface RewardPopupProps {
  reward: string;
  onClose: () => void;
  autoCloseTime?: number;
}

const RewardPopup = memo(({ reward, onClose, autoCloseTime = 5000 }: RewardPopupProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 自动关闭
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, autoCloseTime);

    return () => clearTimeout(timer);
  }, [onClose, autoCloseTime]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50 bg-opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 shadow-xl z-10 max-w-md text-center transform transition-all">
        <h2 className="text-2xl font-bold text-pink-500 mb-4">恭喜获得奖励！</h2>
        <div className="text-6xl mb-4">🎁</div>
        <p className="text-lg mb-6">
          猫猫获得了 <span className="font-bold text-purple-500">{reward}</span>
        </p>
        <button
          className="bg-pink-500 text-white px-6 py-2 rounded-full text-lg font-bold"
          onClick={onClose}
        >
          太棒了！
        </button>
      </div>
    </div>
  );
});

RewardPopup.displayName = 'RewardPopup';

export default RewardPopup;