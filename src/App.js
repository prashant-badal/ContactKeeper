
import './App.css';
import SignupForm from './signUp/SignUp';
import LoginForm from './login/LoginForm';
import ContactList from './contact/ContactList';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginState from './store/LoginState';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
   
    
  },
  {
    path: "/signUp",
    element: <SignupForm/>,
  },
  {
    path: "/contactList",
    element: <ContactList/>,
  },

]);

function App() {
  return (
  <>
  <LoginState>
  <RouterProvider router={router}/>

  </LoginState>
 

    
    </>
  );
}

export default App;
