import './App.css';
import AddRoom from './componenents/room/AddRoom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import ExistingRooms from './componenents/room/ExistingRooms';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './componenents/home/Home';
import RoomDetails from './componenents/room/RoomDetails';
import EditRoom from './componenents/room/EditRoom';
import MyNavBar from './componenents/layout/MyNavBar';
import Footer from './componenents/layout/Footer';
import AddHotel from './componenents/Hotel/AddHotel';
import ExistingHotels from './componenents/Hotel/ExistingHotels';
import HotelDetails from './componenents/Hotel/HotelDetails';
import EditHotel from './componenents/Hotel/EditHotel';
import Packages from './componenents/Package/Packages';
import AddPackage from './componenents/Package/AddPackage';
import ShowHotels from './componenents/Hotel/ShowHotels';
import HotelLogin from './componenents/Hotel/HotelLogin';
import UserLogin from './componenents/service/UserLogin';
import RoomForHotel from './componenents/room/RoomForHotel';
import Admin from './componenents/admin/Admin';
import ExistingPackage from './componenents/Package/ExistingPackage';
import Floating from './componenents/layout/Floating';
import Contact from './componenents/layout/Contactus';
import Cart from './componenents/bookings/Cart';

function App() {
  return (
    <>
      
      <main className='body' >
        <BrowserRouter>
        <MyNavBar></MyNavBar>
        <div className="content">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/room-details/:roomId' element={<RoomDetails/>}/>
          <Route path='/existing-rooms' element={<ExistingRooms/>}/>
          <Route path='/room-update/:roomId' element={<EditRoom/>}/>
          <Route path='/add-room/:id' element={<AddRoom/>}/>
          <Route path='/existing-hotels' element={<ExistingHotels/>}/>
          <Route path='/hotel/login' element={<HotelLogin/>}/>
          <Route path='/user/login' element={<UserLogin/>}/>
          <Route path='/user/profile' element={<ExistingRooms/>}/>
          <Route path='/rooms/:hotelId/:pid' element={<RoomForHotel/>}/>
          <Route path='/add-hotel' element={<AddHotel/>}/>
          <Route path='/hotel-details/:hotelId' element={<HotelDetails/>}/>
          <Route path='/hotel-update/:hotelId' element={<EditHotel/>}/>
          <Route path='/plans' element={<Packages/>}/>
          <Route path='/add-package' element={<AddPackage/>}/>
          <Route path='/book-package/:id' element={<ShowHotels/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/existing-plans'element={<ExistingPackage/>}/>
          <Route path='/contact-us' element={<Contact/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
        </div>
        </BrowserRouter>
        <Floating/>
      </main>

      <Footer></Footer>
      
    </>
  );
}

export default App;
