import PizzaList from "./pizzas/PizzaList";
import PizzaCreate from "./pizzas/PizzaCreate";
import PizzaView from "./pizzas/PizzaView";
import PizzaEdit from "./pizzas/PizzaEdit";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<PizzaList />} />
        <Route path="/pizzas/list" element={<PizzaList />} />
        <Route path="/pizzas/create" element={<PizzaCreate />} />
        <Route path="/pizzas/view/:id" element={<PizzaView />} />
        <Route path="/pizzas/edit/:id" element={<PizzaEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
