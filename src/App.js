import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/section/Main';

const Home = lazy(() => import('./components/Home/Home'));
const Search = lazy(() => import('./components/Search/Search'));
const Loginpage = lazy(() => import('./components/Loginpage/Loginpage'));
const Registerpage1 = lazy(() => import('./components/Registerpage/Registerpage1'));
const Recipewrite = lazy(() => import('./components/Recipewrite/Recipewrite'));
const Questionboard = lazy(() => import('./components/QuestionBoard/Questionboard'));
const Koreafood = lazy(() => import('./components/Koreafood/Koreafood'));
const Recipe = lazy(() => import('./components/Recipe/Recipe'));
const Inboard = lazy(() => import('./components/Inboard/Inboard'));
const Write = lazy(() => import('./components/Write/Write'));
const Checkbox = lazy(() => import('./components/Checkbox'));
const Buttonrecipe = lazy(() => import('./components/Buttonrecipe/Buttonrecipe'));
const Emptypage = lazy(() => import('./components/Emptypage/Emptypage'));
const Mypage = lazy(() => import('./components/Mypage/Mypage'));
const Changepwd = lazy(() => import('./components/Changepwd/Changepwd'));
const Recipeboard = lazy(() => import('./components/Recipeboard/Recipeboard'));



const App = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Main />}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/loginpage" element={<Loginpage />} />
                    <Route path='/search/:searchId' element={<Search />} />
                    <Route path='/registerpage1' element={<Registerpage1 />} />
                    <Route path='/recipewrite' element={<Recipewrite />} />
                    <Route path='/questionboard' element={<Questionboard />} />
                    <Route path='/koreafood' element={<Koreafood />} />
                    <Route path='/recipe' element={<Recipe />} />
                    <Route path='/inboard/:id' element={<Inboard />} />
                    <Route path='/write' element={<Write />} />
                    <Route path='/check' element={<Checkbox />} />
                    <Route path='/buttonrecipe' element={<Buttonrecipe />} />
                    <Route path='/mypage' element={<Mypage />} />
                    <Route path='/changepwd' element={<Changepwd />} />
                    <Route path='/recipeboard' element={<Recipeboard />} />
                    <Route element={<Emptypage />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;