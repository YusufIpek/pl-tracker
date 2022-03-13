import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Input from './Components/Input';
import { checkRedirectUriResult, getLoggedInUser } from './Firebase/Firebase';
import Footer from './Pages/Footer';
import Header from './Pages/Header';
import Login from './Pages/Login';
import PrivateLessonsShow from './Pages/Content';
import { fetchAllData } from './Redux/slicer';
import { store } from './Redux/store';
import Loading from './Pages/Loading';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const redirected = await checkRedirectUriResult();
      if (redirected) {
        const user = await getLoggedInUser();
        setUser(user);

        if (user) {
          // initialize data -> fetch data from firebase
          store.dispatch(fetchAllData());
        }
      }

      setIsLoading(false);
    })();
  }, []);

  const renderUI = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (user) {
      return (
        <>
          <Header
            photoURL={
              'https://static0.cbrimages.com/wordpress/wp-content/uploads/2021/04/Ichigo.jpg'
            }
            displayName={user?.displayName ? user.displayName : ''}
          />

          <Footer />
          <Input />
          <PrivateLessonsShow />
        </>
      );
    }

    return <Login />;
  };

  return (
    <div className="h-screen max-h-screen	overflow-hidden	">{renderUI()}</div>
  );
}
