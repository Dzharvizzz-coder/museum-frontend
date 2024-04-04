import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;