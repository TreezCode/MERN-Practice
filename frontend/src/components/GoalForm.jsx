// external imports
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// internal imports
import { useSetGoalMutation } from '../features/goals/goalApiSlice';
import Spinner from './Spinner';

function GoalForm() {
  const [setGoal, { isLoading, isSuccess, isError, error }] =
  useSetGoalMutation();
  const [text, setText] = useState('');

  // goal effects
  useEffect(() => {
    if (isError) {
      const message = error?.data?.message;
      !message ? toast.error(error) : toast.error(message);
    }
    if (isSuccess) {
      // console.log('Goal created!');
    }
  }, [isError, isSuccess, error]);

  // handle submit
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdGoal = await setGoal({ text }).unwrap();
    } catch (error) {
      // console.log(error);
    }
    setText('');
  };

  // form content
  const content = (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Goal</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );

  // render
  return isLoading ? <Spinner /> : content;
}

export default GoalForm;
