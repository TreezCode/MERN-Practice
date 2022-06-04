// external imports
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// internal imports
import Spinner from './Spinner';
import { useSetGoalMutation } from '../features/goals/goalApiSlice';

function GoalForm() {
  // local state
  const [text, setText] = useState('');

  // destructure mutation
  const [setGoal, { isLoading, isSuccess }] = useSetGoalMutation();

  // set effects
  useEffect(() => {
    if (isSuccess) {
      // ----------- TODO -----------
      // create goal created success message
      // ----------- TODO -----------
      // console.log('Goal created!');
    }
  }, [isSuccess]);

  // handle submit
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdGoal = await setGoal({ text }).unwrap();
    } catch (error) {
      const message = error?.data?.message;
      !message ? toast.error(error) : toast.error(message);
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
