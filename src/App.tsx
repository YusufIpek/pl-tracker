import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { checkRedirectUriResult, getLoggedInUser } from './Firebase/Firebase';
import Header from './Pages/Header';
import Login from './Pages/Login';
import Content from './Pages/Content';
import { fetchAllData } from './Redux/slicer';
import { store } from './Redux/store';
import Loading from './Pages/Loading';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPL from './Pages/AddPL';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      await checkRedirectUriResult();

      const user = await getLoggedInUser();
      setUser(user);

      if (user) {
        // initialize data -> fetch data from firebase
        store.dispatch(fetchAllData());
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
            photoURL={user?.photoURL ? user?.photoURL : ''}
            displayName={user?.displayName ? user.displayName : ''}
          />

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Content />} />
              <Route path="/add" element={<AddPL />} />
            </Routes>
          </BrowserRouter>
        </>
      );
    }

    return <Login />;
  };

  return <div className="h-full	overflow-hidden">{renderUI()}</div>;
}
