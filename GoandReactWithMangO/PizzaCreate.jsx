import { useState } from "react";
import PageHeader from "../header/PageHeader";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function PizzaCreate() {
    const [pizza, setPizza] = useState({id:'', name:'', size:'', price:'', category:''});
    const navigate = useNavigate();

    const txtBoxOnChange = event => {
        const updatablePizza = { ...pizza };
        updatablePizza[event.target.id] = event.target.value;
        setPizza(updatablePizza);
    };

    const createPizza = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.post(`${baseUrl}/pizzas`, {...pizza});
            const createdPizza = response.data.pizza;
            setPizza(createdPizza);
            alert(response.data.message);
            navigate('/pizzas/list');
        } catch(error) {
            alert('Server Error');
        }
    };

    return(
        <>
            <PageHeader/>            
            <h3><a href="/pizzas/list" className="btn btn-light">🔙Go Back</a>➕Add Pizza</h3>
            <div className="container">
                <div className="form-group mb-3">
                    <label htmlFor="id" className="form-label">🔢Pizza Id:</label>
                    <input type="text" className="form-control" id="id" 
                        placeholder="Please enter pizza id"
                        value={pizza.id} 
                        onChange={txtBoxOnChange}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">🍕Pizza Name:</label>
                    <input type="text" className="form-control" id="name" 
                        placeholder="Please enter name of pizza"
                        value={pizza.name} 
                        onChange={txtBoxOnChange}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="size" className="form-label">📏Size (in cm):</label>
                    <input type="text" className="form-control" id="size" 
                        placeholder="Please enter size of pizza"
                        value={pizza.size} 
                        onChange={txtBoxOnChange}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="price" className="form-label">💰Price (in rupees):</label>
                    <input type="text" className="form-control" id="price" 
                        placeholder="Please enter price of pizza"
                        value={pizza.price} 
                        onChange={txtBoxOnChange}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="category" className="form-label">🍕 Pizza Category:</label>
                    <select
                        className="form-select"
                        id="category"
                        value={pizza.category}
                        onChange={txtBoxOnChange}
                        required
                    >
                        <option value="" disabled>Choose from Category</option>
                        <option value="Fast Delivery">🚚 Fast Delivery</option>
                        <option value="Order Delivery">📦 Order Delivery</option>
                        <option value="Takeaway">🍴 Takeaway</option>
                    </select>
                </div>

                <button className="btn btn-primary"
                    onClick={createPizza}>Create Pizza</button>
            </div>
        </>
    );
}

export default PizzaCreate;
