// external imports
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import {BiArrowBack} from 'react-icons/bi'
// internal imports
import GoalItem from './GoalItem';
import Spinner from './Spinner';
import { useUpdateGoalMutation } from '../features/goals/goalApiSlice';

function GoalItemEdit({ goal }) {
  const [updateGoal, { isLoading, isSuccess, isError, error }] = useUpdateGoalMutation();
  const ref = useRef(null);
  const { _id, text, updatedAt } = goal;
  const [newText, setNewText] = useState(text);
  const [editView, setEditView] = useState(true);
  
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

  // handle input
  const onChange = () => {
    setNewText(() => ({
      text: ref.current.value,
    }));
  };

  // handle update
  const handleUpdate = () => {
    updateGoal({ _id, newText }).unwrap();
  };
  
  // item content
  const content = (
    <div className='goal'>
      Last update:
      <div>{new Date(updatedAt).toLocaleString('en-US')}</div>
      <textarea
        className='edit-text'
        type='text'
        defaultValue={text}
        onChange={onChange}
        ref={ref}
        readOnly={false}
      />
      <button onClick={() => setEditView(false)} className='close'>
        <BiArrowBack />
      </button>
      <button onClick={handleUpdate} className='btn save'>
        save
      </button>
    </div>
  );

  // render
  return isLoading 
    ? <Spinner /> 
    : !editView 
      ? <GoalItem goal={goal} /> 
      : content;
}

export default GoalItemEdit;
