import React from "react";
import { Route, Routes } from "react-router-dom";
import Adduser from "./component/Adduser";
import Display from "./component/Display";
import ViewUser from "./component/ViewUser";
import EditUser from "./component/EditUser";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Adduser />} />
        <Route path="/display" element={<Display />} />
        <Route path="/user/:id" element={<ViewUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </>
  );
}

export default App;
