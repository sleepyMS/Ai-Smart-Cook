import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/section/Main';

const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const Loginpage = lazy(() => import('./pages/Loginpage'));
const Registerpage1 = lazy(() => import('./pages/Registerpage1'));
const Board = lazy(() => import('./pages/Board'));
const Question = lazy(() => import('./pages/Question'));
const Koreafood = lazy(() => import('./pages/Koreafood'));
const Recipe = lazy(() => import('./pages/Recipe'));
const Inboard = lazy(() => import('./pages/Inboard'));
const Write = lazy(() => import('./pages/Write'));
const Checkbox = lazy(() => import('./components/Checkbox'));
const Buttonrecipe = lazy(() => import('./pages/Buttonrecipe'));
const Emptypage = lazy(() => import('./pages/Emptypage'));


const App = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Main />}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/loginpage" element={<Loginpage />} />
                    <Route path='/search/:searchId' element={<Search />} />
                    <Route path='/registerpage1' element={<Registerpage1 />} />
                    <Route path='/board' element={<Board />} />
                    <Route path='/question' element={<Question />} />
                    <Route path='/koreafood' element={<Koreafood />} />
                    <Route path='/recipe' element={<Recipe />} />
                    <Route path='/inboard/:id' element={<Inboard />} />
                    <Route path='/write' element={<Write />} />
                    <Route path='/check' element={<Checkbox />} />
                    <Route path='/buttonrecipe' element={<Buttonrecipe />} />
                    <Route element={<Emptypage />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;