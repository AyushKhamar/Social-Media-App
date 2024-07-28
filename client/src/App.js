import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { HomePage } from "scenes/homePage";
import { LoginPage } from "scenes/loginPage";
import { ProfilePage } from "scenes/profilePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/progile/:userId" element={<ProfilePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
