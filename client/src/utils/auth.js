// BRING IN JWT-DECODE MODULE
import decode from 'jwt-decode';

// CREATE A NEW CLASS TO INSTANTIATE FOR A USER
class AuthService {
  // GET USER DATA FROM TOKEN
  getProfile() {
    return decode(this.getToken());
  }

  // CHECK IF USER IS LOGGED IN BY THE TOKEN
  loggedIn() {
    const token = this.getToken();
    // IF THERE IS A TOKEN AND IT'S NOT EXPIRED RETURN TRUE
    // ELSE, RETURN FALSE (I.E. NOT LOGGED IN)
    return token && !this.isTokenExpired(token) ? true : false;
  }

  // CHECK IF TOKEN IS EXPIRED
  isTokenExpired(token) {
    // DECODE TOKEN TO GET EXPIRATION SET BY SERVER
    const decoded = decode(token);
    // IF THE EXPIRATION TIME IS LESS THAN THE CURRENT TIME (IN SEC),
    // TOKEN IS EXPIRED AND WE REMOVE TOKEN FROM LOCAL STORAGE & REDIRECT TO HOME
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      window.location.assign('/');
      // RETURN TRUE (I.E. TOKEN HAS EXPIRED)
      return true;
    }
    // IF TOKEN HASN'T PASSED IT'S EXPIRATION, RETURN FALSE
    return false;
  }

  // RETRIEVE USER TOKEN FROM LOCAL STORAGE
  getToken() {
    return localStorage.getItem('id_token');
  }

  // SAVES USER TOKEN TO LOCAL STORAGE ON LOGIN/SIGNUP
  // AND REDIRECTS TO HOMEPAGE
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // REMOVES USER TOKEN FROM LOCAL STORAGE ON LOGOUT
  // AND REDIRECTS TO HOMEPAGE
  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();
