import { Route, Routes } from "react-router-dom";
import Login from './screens/Login'
import Register from './screens/Register';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './screens/Home';
import PropertyDetails from './screens/PropertyDetails';
import AppliedJobs from './screens/AppliedJobs';
import Jobs from "./screens/Jobs";
import Cart from "./screens/Cart";
import AppliedDone from "./screens/AppliedDone";

function App() {
  return (
    <div className="container-fluid">
      <Routes>
         <Route path='' element={<Login/>}/>
         <Route path='login' element={<Login/>}/>
         <Route path='register' element={<Register/>}/>
         <Route path='home' element={<Home/>}/>
         <Route path='jobs' element={<Jobs/>}/>
         <Route path='cart' element={<Cart/>}/>
         <Route path='property-details' element={<PropertyDetails/>}/>
         <Route path='applied-jobs' element={<AppliedJobs/>}/>
         <Route path="applied-done" element={<AppliedDone/>}/>
      </Routes>
      <ToastContainer/>
    </div>
   
  );
}

export default App;
