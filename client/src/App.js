import './App.css';
import {createBrowserRouter,Router,RouterProvider} from 'react-router-dom'

// import all components
import Username from './components/Username';
import Password from './components/Password';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Register from './components/Register';
import PageNotFound from './components/PageNotFound';
import Reset from './components/Reset';


//routes available
const router= createBrowserRouter([
    {
        path: '/',
        element :<Username></Username>
    },
    {
        path: '/register',
        element : <Register></Register>
    },
    {
        path: '/password',
        element : <Password></Password>
    },
    {
        path: '/profile',
        element : <Profile></Profile>
    },
    {
        path: '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path: '/reset',
        element : <Reset></Reset>
    },
    {
        path: '*',              //invalid router
        element : <PageNotFound></PageNotFound>
    },
])

function App() {
    return ( 
        <main>
            <RouterProvider routes={router}></RouterProvider>
        </main>
    );
}

export default App;