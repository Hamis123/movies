import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.jsx'
import Details from './pages/details.jsx'
import NotFound from './pages/notFound.jsx'

import { createBrowserRouter , RouterProvider } from 'react-router-dom'
const router=createBrowserRouter([
  {path:"/" ,element:<App />},
  {path:"/details/:id" , element: <Details/>},
  {path:"*", element: <NotFound/>},
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}/>
  </StrictMode>
)
