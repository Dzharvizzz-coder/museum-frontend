import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.jsx';
import EventPage from "./pages/EventPage/EventPage.jsx";
import AboutMuseum from "./pages/AboutMuseum/AboutMuseum.jsx";
import NavigationPage from "./pages/NavigationPage/NavigationPage.jsx";
import EventInformationPage from "./pages/EventInformationPage/EventInformationPage.jsx";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess.jsx"

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
            </Routes>
        </BrowserRouter>
    );
}

export default App;