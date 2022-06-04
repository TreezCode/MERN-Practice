// external imports
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
// internal imports
import Spinner from './Spinner';
import { useUpdateGoalMutation, useDeleteGoalMutation } from '../features/goals/goalApiSlice';

function GoalItemEdit({ goal }) {
  const [deleteGoal] = useDeleteGoalMutation();
  const [updateGoal, { isLoading, isSuccess, isError, error }] = useUpdateGoalMutation();
  const ref = useRef(null);
  const { _id, text, createdAt } = goal;
  const [newText, setNewText] = useState(text);

  // handle input
  const onChange = () => {
    setNewText(() => ({
      text: ref.current.value,
    }));
  };

  // handle delete
  const handleDelete = () => {
    deleteGoal(_id).unwrap();
  };

  // handle update
  const handleUpdate = () => {
    updateGoal({ _id, newText }).unwrap();
  };

  // update effects
  useEffect(() => {
    if (isError) {
      const message = error?.data?.message;
      !message ? toast.error(error) : toast.error(message);
    }
    if (isSuccess) {
      // console.log('Goal updated!');
    }
  }, [isSuccess, isError, error]);

  // item content
  const content = (
    <div className='goal goal-edit'>
      <div>{new Date(createdAt).toLocaleString('en-US')}</div>
      <input
        className='goal-text goal-text-edit'
        type='text'
        defaultValue={text}
        onChange={onChange}
        ref={ref}
        readOnly={false}
      />
      <button onClick={handleDelete} className='close'>
        X
      </button>
      <button onClick={handleUpdate} className='btn save'>
        save
      </button>
    </div>
  );

  // render
  return isLoading ? <Spinner /> : content;
}

export default GoalItemEdit;
