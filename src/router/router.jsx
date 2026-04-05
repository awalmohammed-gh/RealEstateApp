import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import SystemLayout from '../layout/SystemLayout'
import Home from '../pages/Home'
import Properties from '../pages/Properties'
import Agents from '../pages/Agents'
import Contact from '../pages/Contact'
import LoginForm from '../pages/LoginForm'
import PropertiesDetails from '../pages/PropertiesDetails'
import PropertyPerPage from '../pages/PropertyPerPage'
import Listings from '../pages/Listings'
import MakeOffer from '../pages/MakeOffer'
import AgentDetailsPage from '../pages/AgentDetailsPage'

const router = createBrowserRouter(
    createRoutesFromElements(
         <Route path='/' element={<SystemLayout />}>
            <Route index element={<Home />} />
            <Route path='properties' element={<Properties />} />
            <Route path='house/:id' element={<PropertiesDetails />} />
            <Route path='listings' element={<Listings/>} />
            <Route path='offer' element={<MakeOffer/>} />
            <Route path='/:status' element={<PropertyPerPage/>} />
            <Route path='agents' element={<Agents />} />
            <Route path='agent/:id' element={<AgentDetailsPage />} />
            <Route path='contact' element={<Contact />} />
            <Route path='login' element={<LoginForm />} />
         </Route>
    )
)

export default router;