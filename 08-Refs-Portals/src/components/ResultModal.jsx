import { useImperativeHandle, useRef } from "react"; // 모든 환경에서 사용가능한 함수, 기능을 불러옴(리액트 네이티브)
import { createPortal } from "react-dom"; // 리액트가 DOM과 상효작용하게 함

export default function ResultModal({
  ref,
  targetTime,
  remainingTime,
  onReset,
}) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemaingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  // 이 컴포넌트 외부에서 프로퍼티와 메서드를 통해 접근할 수 있도록 해주는 리액트 훅
  // 첫 번째 인수: ref 객체
  // 두 번째 인수: 함수
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal">
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemaingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
}
