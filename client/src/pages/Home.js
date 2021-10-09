// BRING IN AUTHENTICATION SERVICES FUNCTIONS
import Auth from '../utils/auth';

// BRING IN COMPONENTS
import LoggedOutHome from '../components/LoggedOutHome/LoggedOutHome';
import LoggedInHome from '../components/LoggedInHome/LoggedInHome';

// HOME PAGE
const Home = () => {

  // IF USER IS LOGGED IN, RENDER LOGGEDINHOME
  // IF USER IS LOGGED OUT, RENDER LOGGEDOUTHOME
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
