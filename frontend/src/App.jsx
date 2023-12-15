import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Default from './pages/Default'
import Hotel from './pages/Hotel';
import Add from './pages/Add';


export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Default />} />
                    <Route path='/hotel' element={<Hotel />} />
                    <Route path='/hotel/create' element={<Add />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}