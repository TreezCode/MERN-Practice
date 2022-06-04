// external imports
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {IoMdClose} from 'react-icons/io'
// internal imports
import Spinner from './Spinner';
import GoalItemEdit from './GoalItemEdit';
import { useDeleteGoalMutation } from '../features/goals/goalApiSlice';

function GoalItem({ goal }) {
  const [editView, setEditView] = useState(false);
  const [deleteGoal, { isLoading, isSuccess, isError, error }] =
    useDeleteGoalMutation();

  // error/success effects
  useEffect(() => {
    if (isError) {
      const message = error?.data?.message;
      !message ? toast.error(error) : toast.error(message);
    }
    if (isSuccess) {
      // console.log('Goal deleted!');
    }
  }, [isSuccess, isError, error]);

  // item content
  const content = (
    <div className='goal'>
      <p>Created at:</p>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <textarea
        className='goal-text'
        type='text'
        value={goal.text}
        readOnly={true}
      />
      <button onClick={() => deleteGoal(goal._id)} className='close'>
        <IoMdClose />
      </button>
      <button onClick={() => setEditView(true)} className='btn edit'>
        edit
      </button>
    </div>
  );

  // render
  return isLoading 
    ? <Spinner />
    : editView 
      ? <GoalItemEdit goal={goal} /> 
      : content
}

export default GoalItem;
