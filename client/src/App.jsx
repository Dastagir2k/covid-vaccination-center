// import Login from "./Login"
import AdminPage from "./Component/AdminPage"
import Homepage from "./Component/Homepage"
import Login from "./Component/Login"
import SignIn from "./Component/SignIn"
import{BrowserRouter,Route,Routes} from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/home" element={<Homepage/>}></Route>
      <Route path="/admin" element={<AdminPage/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App