import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import FruitsAndVegetables from '../pages/FruitsAndVegetables'
import Ghee from '../pages/Ghee'
import Milk from '../pages/Milk'
import Nandini from '../pages/Nandini'
import Tea from '../pages/Tea'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import SignUp from '../pages/SignUp'

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/fruits&vegetables' element={<FruitsAndVegetables/>}/>
        <Route path='/ghee' element={<Ghee/>}/>
        <Route path='/milk' element={<Milk/>}/>
        <Route path='/nandini' element={<Nandini/>}/>
        <Route path='/tea' element={<Tea/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default AllRoutes
