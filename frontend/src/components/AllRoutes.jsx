import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import FruitsAndVegetables from '../pages/FruitsAndVegetables'
import Ghee from '../pages/Ghee'
import Milk from '../pages/Milk'
import Tea from '../pages/Tea'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import SignUp from '../pages/SignUp'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'
import Honey from '../pages/Honey'
// import Checkout from '../pages/Checkout'

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/fruits&vegetables' element={<FruitsAndVegetables/>}/>
        <Route path='/ghee' element={<Ghee/>}/>
        <Route path='/milk' element={<Milk/>}/>
        <Route path='/honey' element={<Honey/>}/>
        <Route path='/tea' element={<Tea/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profile' element={<Profile/>}/>
        {/* <Route path='/checkout' element={<Checkout/>}/> */}
        <Route path='/product/productDetail/:id' element={<ProductDetail/>}/>
      </Routes>
    </div>
  )
}

export default AllRoutes
