import React from 'react';
type Props = {
  id: number;
  moveToTop: (id: number) => void;
  moveToFoward: (id: number) => void;
  moveToBackward: (id: number) => void;
  moveToBottom: (id: number) => void;
  removeObject: (id: number) => void;
};

const ObjectOptionButtons = ({
  id,
  moveToBackward,
  moveToTop,
  moveToBottom,
  moveToFoward,
  removeObject,
}: Props) => {
  const handleObjectMoveToTopClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    moveToTop(id);
  };
  const handleObjectMoveToForwardClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    moveToBottom(id);
  };
  const handleObjectMoveToBottomClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    moveToFoward(id);
  };
  const handleObjectMoveToBackwardClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    moveToBackward(id);
  };
  const handleObjectRemoveObjecClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    removeObject(id);
  };

  return (
    <div>
      <button onClick={handleObjectMoveToTopClick}>맨 앞으로</button>
      <button onClick={handleObjectMoveToForwardClick}>앞으로</button>
      <button onClick={handleObjectMoveToBottomClick}>맨 뒤로</button>
      <button onClick={handleObjectMoveToBackwardClick}>뒤로</button>
      <button onClick={handleObjectRemoveObjecClick}>삭제</button>
    </div>
  );
};

export default ObjectOptionButtons;
