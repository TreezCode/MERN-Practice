import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDeleteGoalMutation } from '../features/goals/goalApiSlice';
import Spinner from '../components/Spinner';

function GoalItem({ goal }) {
  const [deleteGoal, { isLoading, isSuccess, isError, error }] =
    useDeleteGoalMutation();

  // error/success effects
  useEffect(() => {
    if (isError) {
      const message = error?.data?.message;
      !message ? toast.error(error) : toast.error(message);
    }
    if (isSuccess) {
      console.log('Goal deleted!');
    }
  }, [isSuccess, isError, error]);

  // item content
  const content = (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <button onClick={() => deleteGoal(goal._id)} className='close'>
        X
      </button>
      <button onClick={() => {}} className='btn edit'>
        edit
      </button>
    </div>
  );

  // render
  return isLoading ? <Spinner /> : content;
}

export default GoalItem;
