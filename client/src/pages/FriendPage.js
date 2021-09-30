// import './App.css';
import Ed from '../assets/img/img-1.png';
import Olivia from '../assets/img/img-2.png';
import Charlotte from '../assets/img/img-3.png';
import Rob from '../assets/img/img-4.png';
import Friend from '../components/Friend/Friend';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

function FriendPage() {
  return (
    <div className="Wrapper">
      <div className="cards">
        <Friend
          img={ Ed }
          name="Ed"
          description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups." />
        <Friend
          img={ Olivia  }
          name="Olivia "
          description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups." />
        <Friend
          img={ Charlotte }
          name="Charlotte"
          description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups." />
        <Friend
          img={ Rob }
          name="Rob"
          description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups." />
      </div>
    </div>
  );
}

export default FriendPage;
