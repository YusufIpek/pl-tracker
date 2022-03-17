import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { checkRedirectUriResult, getLoggedInUser } from './firebase2/Firebase';
import Header from './pages2/Header';
import Login from './pages2/Login';
import Content from './pages2/Content';
import { fetchAllData } from './redux2/slicer';
import { store } from './redux2/store';
import Loading from './pages2/Loading';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPL from './pages2/AddPL';

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
          <BrowserRouter>
            <Header
              photoURL={user?.photoURL ? user?.photoURL : ''}
              displayName={user?.displayName ? user.displayName : ''}
            />
            <Routes>
              <Route path="/" element={<Content />} />
              <Route path="/add" element={<AddPL />} />
              <Route path="/edit/:id" element={<AddPL />} />
            </Routes>
          </BrowserRouter>
        </>
      );
    }

    return <Login />;
  };

  return <div className="h-full	overflow-hidden">{renderUI()}</div>;
}
