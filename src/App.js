// import './assets/css/App.css';
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Redirector from "./component/Redirector";
import GoogleMapComponent from "./component/GetCurrentLocation";

function App() {
  return (
    <>
      <Toaster />
      <Redirector />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
        
        {/* <GoogleMapComponent /> */}
      </div>
    </>
  );
}

export default App;
