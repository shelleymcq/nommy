// Utilities
import Auth from '../utils/auth';

// Components
import LoggedOutHome from '../components/LoggedOutHome/LoggedOutHome';
import LoggedInHome from '../components/LoggedInHome/LoggedInHome';

const Home = () => {

  return (
    <main>
      {Auth.loggedIn() ?
      
      <>
      <LoggedInHome />
      </>
      
      : 

      <>
      <LoggedOutHome />
      </>
      }
    </main>
  );
};

export default Home;
