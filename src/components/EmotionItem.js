const EmotionItem = ({
  emotionId,
  emotionImg,
  emotionDescript,
  onClick,
  isSelected,
}) => {
  return (
    <div
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${emotionId}` : `EmotionItem_off`,
      ].join(" ")}
      onClick={() => onClick(emotionId)}
    >
      <img src={emotionImg} alt="" />
      <span>{emotionDescript}</span>
    </div>
  );
};

export default EmotionItem;
