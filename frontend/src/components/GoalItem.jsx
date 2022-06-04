// external imports
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// internal imports
import Spinner from './Spinner';
import GoalItemEdit from './GoalItemEdit';
import { useDeleteGoalMutation } from '../features/goals/goalApiSlice';

function GoalItem({ goal, dispatch }) {
  const [deleteGoal, { isLoading, isSuccess, isError, error }] =
    useDeleteGoalMutation();
  const [editView, setEditView] = useState(false);

  const handleEdit = async () => {
    try {
      await dispatch(setEditView(true))
    } catch (error) {
      console.log(error);
    }
  }

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
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <input
        className='goal-text'
        type='text'
        value={goal.text}
        readOnly={true}
      />
      <button onClick={() => deleteGoal(goal._id)} className='close'>
        X
      </button>
      <button onClick={handleEdit} className='btn edit'>
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
