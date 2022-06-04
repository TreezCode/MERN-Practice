// external imports
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {IoMdClose} from 'react-icons/io'
// internal imports
import GoalItemEdit from './GoalItemEdit';
import Spinner from './Spinner';
import { useDeleteGoalMutation } from '../features/goals/goalApiSlice';

function GoalItem({ goal }) {
  // destructure goal
  const { _id, text, createdAt} = goal

  // local state
  const [editView, setEditView] = useState(false);

  // destructure mutation
  const [deleteGoal, { isLoading, isSuccess, isError, error }] = useDeleteGoalMutation();
  
  // delete effects
  useEffect(() => {
    if (isError) {
      const message = error?.data?.message;
      !message ? toast.error(error) : toast.error(message);
    }
    if (isSuccess) {
      // ----------- TODO -----------
      // create goal deleted success message
      // ----------- TODO -----------
      // console.log('Goal deleted!');
    }
  }, [isSuccess, isError, error]);

  // item content
  const content = (
    <div className='goal'>
      <p>Created at:</p>
      <div>{new Date(createdAt).toLocaleString('en-US')}</div>
      <textarea
        className='goal-text'
        type='text'
        value={text}
        readOnly={true}
      />
      <button onClick={() => deleteGoal(_id)} className='close'>
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
