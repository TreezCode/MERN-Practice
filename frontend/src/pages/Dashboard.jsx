// external imports
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// internal imports
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import Spinner from '../components/Spinner';
import { useGetUserQuery } from '../features/auth/authApiSlice';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useGetGoalsQuery } from '../features/goals/goalApiSlice';
import { setGoals } from '../features/goals/goalSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // current global user
  const currentUser = useSelector(selectCurrentUser);

  // destructure rtk queries
  const { data: user, isLoading } = useGetUserQuery(currentUser);
  const { data: goals, isFetching, isError, error } = useGetGoalsQuery(currentUser);
  
  // currentUser effects
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  // goal effects
  useEffect(() => {
    if (isError) {
      const message = error?.data?.message;
      !message ? toast.error(error) : toast.error(message);
    }
    dispatch(setGoals(goals))
  }, [goals, isError, error, dispatch])
  
  // page content
  const content = (
    <>
      <section className='heading'>
        <h1>Welcome {user?.username}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className='content'>
        {goals?.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );

  // render
  return isLoading || isFetching ? <Spinner /> : content;
}

export default Dashboard;
