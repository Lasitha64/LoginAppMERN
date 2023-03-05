import './App.css';
import {createBrowserRouter,Router,RouterProvider} from 'react-router-dom'

//routes available
const router= createBrowserRouter([
    {
        path: '/',
        element : <div>Root router</div>
    },
    {
        path: '/register',
        element : <div>Register router</div>
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