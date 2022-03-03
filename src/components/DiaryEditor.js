import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

const emotionList = [
  {
    emotionId: 1,
    emotionImg: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotionDescript: "완전 좋음",
  },
  {
    emotionId: 2,
    emotionImg: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotionDescript: "좋음",
  },
  {
    emotionId: 3,
    emotionImg: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotionDescript: "그럭저럭",
  },
  {
    emotionId: 4,
    emotionImg: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotionDescript: "나쁨",
  },
  {
    emotionId: 5,
    emotionImg: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotionDescript: "끔찍함",
  },
];

const getStringDate = (date) => {
  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();
};

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3); // 최초 감정 설정 여부 확인
  const [content, setContent] = useState("");
  const contentRef = useRef();
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const handleSubmit = () => {
    // if (emotion === 0) { 최초감정 없을 때 사용
    //   alert("감정을 골라주세요");
    //   return;
    // }
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니다?" : " 새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, originData.date, content, emotion); // originData.date 확인
      }
      navigate("/", { replace: true });
    }
  };

  const handleRemove = () => {
    if (window.confirm("정말로 일기를 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton
            text={"< 뒤로가기"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
        rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date.slice(0, 10)}
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
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="오늘은 어땠나요"
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              type={"positive"}
              text={"작성완료"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
