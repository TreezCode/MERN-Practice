import { useEffect } from 'react';
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner';
import { useGetUserQuery } from '../features/auth/authApiSlice';

const User = () => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useGetUserQuery();

  // error effects
  useEffect(() => {
    if(isError) {
      const message = error?.data?.message;
      !message ? toast.error(error) : toast.error(message);
    }
  })

  // page content
  const content = (
    <section className='heading'>
      <h1>Welcome {user?.username}</h1>
      <p>{user?.email}</p>
      <p>{user?.updatedAt}</p>
    </section>
  );
  
  // render
  return isLoading ? <Spinner /> : content;
};
export default User;
