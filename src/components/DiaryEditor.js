import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import MyHeader from ".//MyHeader";
import EmotionItem from "./EmotionItem";

const emotionList = [
  {
    emotionId: 1,
    emotionImg: process.env.PUBLIC_URL + `assets/emotion1.png`,
    emotionDescript: "완전 좋음",
  },
  {
    emotionId: 2,
    emotionImg: process.env.PUBLIC_URL + `assets/emotion2.png`,
    emotionDescript: "좋음",
  },
  {
    emotionId: 3,
    emotionImg: process.env.PUBLIC_URL + `assets/emotion3.png`,
    emotionDescript: "그럭저럭",
  },
  {
    emotionId: 4,
    emotionImg: process.env.PUBLIC_URL + `assets/emotion4.png`,
    emotionDescript: "나쁨",
  },
  {
    emotionId: 5,
    emotionImg: process.env.PUBLIC_URL + `assets/emotion5.png`,
    emotionDescript: "끔찍함",
  },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);

  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={"새 일기쓰기"}
        leftChild={
          <MyButton
            text={"< 뒤로가기"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotionId}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotionId === emotion}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
