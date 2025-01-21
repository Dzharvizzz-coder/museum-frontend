import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.jsx';
import EventPage from "./pages/EventPage/EventPage.jsx";
import AboutMuseum from "./pages/AboutMuseum/AboutMuseum.jsx";
import NavigationPage from "./pages/NavigationPage/NavigationPage.jsx";
import EventInformationPage from "./pages/EventInformationPage/EventInformationPage.jsx";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess.jsx"
import AdminPage from './pages/AdminPage/AdminPage.tsx';
import AdminEventsPage from './pages/AdminEventsPage/AdminEventsPage.jsx';
import AdminCreateEventsPage from './pages/AdminCreateEventsPage/AdminCreateEventsPage.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<MainPage />} />
                <Route path="/events" element={<EventPage />} />
                <Route path="/events/:eventId" element={<EventInformationPage />} />
                <Route path="/about" element={<AboutMuseum />} />
                <Route path='/navigation' element={<NavigationPage/>} />
                <Route path='/payment/success' element={<PaymentSuccess/>} />
                <Route path='/admin' element={<AdminPage/>} />
                <Route path='/admin/events' element={<AdminEventsPage/>} />
                <Route path='/admin/create/event' element={<AdminCreateEventsPage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;