import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import Spinner from '../components/Spinner';
import { useGetUserQuery } from '../features/auth/authApiSlice';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useGetGoalsQuery } from '../features/goals/goalApiSlice';

function Dashboard() {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const { data: userData, isLoading } = useGetUserQuery(user);
  const { data: goalData, isFetching, isError, error } = useGetGoalsQuery(user);

  // user effects
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // error effects
  useEffect(() => {
    if (isError) {
      const message = error?.data?.message;
      !message ? toast.error(error) : toast.error(message);
    }
  }, [isError, error]);

  // page content
  const content = (
    <>
      <section className='heading'>
        <h1>Welcome {userData?.username}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className='content'>
        {goalData?.length > 0 ? (
          <div className='goals'>
            {goalData.map((goal) => (
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
