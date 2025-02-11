import { useState } from 'react';
import PageHeader from "../header/PageHeader";
import axios from 'axios';

function PizzaCreate() {
    const [pizza, setPizza] = useState({
        pizzaId: '',
        pizzaName: '',
        pizzaSize: '',
        pizzaPrice: '',
        pizzaCategory: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPizza({
            ...pizza,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Send the pizza data to the server (replace with your actual endpoint)
            const response = await axios.post('/api/pizzas', pizza);
            console.log(response.data); // Handle the response as needed
            // Optionally, you can reset the form after successful submission
            setPizza({
                pizzaId: '',
                pizzaName: '',
                pizzaSize: '',
                pizzaPrice: '',
                pizzaCategory: ''
            });
        } catch (error) {
            console.error('There was an error creating the pizza!', error);
        }
    };

    return (
        <>
            <PageHeader />

            <div className="container mt-4">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="pizzaId">🔢 Please Enter ID</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="pizzaId" 
                            name="pizzaId" 
                            value={pizza.pizzaId} 
                            onChange={handleChange} 
                            placeholder="Please Enter ID" 
                            required 
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="pizzaName">🍕 Please Enter Pizza Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="pizzaName" 
                            name="pizzaName" 
                            value={pizza.pizzaName} 
                            onChange={handleChange} 
                            placeholder="Pizza Name" 
                            required 
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="pizzaSize">📏 Please Enter Pizza Size (in cm)</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            id="pizzaSize" 
                            name="pizzaSize" 
                            value={pizza.pizzaSize} 
                            onChange={handleChange} 
                            placeholder="Size (in cm)" 
                            required 
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="pizzaPrice">💰 Please Enter Pizza Price (in rupees)</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            id="pizzaPrice" 
                            name="pizzaPrice" 
                            value={pizza.pizzaPrice} 
                            onChange={handleChange} 
                            placeholder="Price (in rupees)" 
                            required 
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="pizzaCategory">🍕 Pizza Category</label>
                        <select 
                            className="form-select" 
                            id="pizzaCategory" 
                            name="pizzaCategory" 
                            value={pizza.pizzaCategory} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="" disabled>Choose from Category</option>
                            <option value="Fast Delivery">🚚 Fast Delivery</option>
                            <option value="Order Delivery">📦 Order Delivery</option>
                            <option value="Takeaway">🍴 Takeaway</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">➕ Add Pizza</button>
                </form>
            </div>
        </>
    );
}

export default PizzaCreate;
