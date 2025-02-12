import { useState, useEffect } from 'react';
import PageHeader from "../header/PageHeader";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function PizzaEdit() {
    const { pizzaId } = useParams(); 
    const [pizza, setPizza] = useState({
        pizzaId: "",
        pizzaName: "",
        pizzaSize: "",
        pizzaPrice: "",
        pizzaCategory: ""
    });

    const navigate = useNavigate();

    const readPizzaById = async () => {
        try {
            const baseUrl = 'http://127.0.0.1:8080'; 
            const response = await axios.get(`${baseUrl}/pizza/${pizzaId}`);
            const pizzaData = response.data.pizza;
            setPizza({
                pizzaId: pizzaData.pizzaId,
                pizzaName: pizzaData.pizzaName,
                pizzaSize: pizzaData.pizzaSize.toString(), 
                pizzaPrice: pizzaData.pizzaPrice.toString(),
                pizzaCategory: pizzaData.pizzaCategory,
            });
        } catch (error) {
            alert("Error fetching pizza details");
        }
    };

    useEffect(() => {
        readPizzaById(); 
    }, [pizzaId]);

    const OnChangeBox = (event) => {
        const newPizza = { ...pizza };
        newPizza[event.target.id] = event.target.value;
        setPizza(newPizza);
    };

    
    const OnUpdate = async () => {
        if (!pizza.pizzaPrice || isNaN(pizza.pizzaPrice)) {
            alert("Please enter a valid price.");
            return;
        }

        try {
            const baseUrl = 'http://127.0.0.1:8080'; 
            const response = await axios.put(`${baseUrl}/pizza/${pizzaId}`, {
                ...pizza,
                pizzaPrice: parseFloat(pizza.pizzaPrice) 
            });
            const json = response.data;
            alert(json.message);
            navigate("/pizzas/list");
        } catch (error) {
            alert("Error updating pizza price");
        }
    };

    return (
        <>
            <PageHeader PageNumber={2} />
            <h3><a href="/pizzas/list" className="btn btn-light">Go Back</a> Edit Pizza Price</h3>
            <div className="container">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group mb-3">
                        <label htmlFor="pizzaId">🔢 Pizza ID (Cannot Edit)</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pizzaId"
                            name="pizzaId"
                            value={pizza.pizzaId}
                            onChange={OnChangeBox}
                            placeholder="Pizza ID"
                            disabled 
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="pizzaName">🍕 Pizza Name (Cannot Edit)</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pizzaName"
                            name="pizzaName"
                            value={pizza.pizzaName}
                            onChange={OnChangeBox}
                            placeholder="Pizza Name"
                            disabled 
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="pizzaSize">📏 Pizza Size (Cannot Edit)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="pizzaSize"
                            name="pizzaSize"
                            value={pizza.pizzaSize}
                            onChange={OnChangeBox}
                            placeholder="Size (in cm)"
                            disabled 
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="pizzaPrice">💰 Pizza Price (Editable)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="pizzaPrice"
                            name="pizzaPrice"
                            value={pizza.pizzaPrice}
                            onChange={OnChangeBox}
                            placeholder="Price (in rupees)"
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="pizzaCategory">🍕 Pizza Category (Cannot Edit)</label>
                        <select
                            className="form-select"
                            id="pizzaCategory"
                            name="pizzaCategory"
                            value={pizza.pizzaCategory}
                            onChange={OnChangeBox}
                            disabled 
                            required
                        >
                            <option value="Fast Delivery">🚚 Fast Delivery</option>
                            <option value="Order Delivery">📦 Order Delivery</option>
                            <option value="Takeaway">🍴 Takeaway</option>
                        </select>
                    </div>

                   
                    <button 
                        type="button" 
                        className="btn btn-warning" 
                        onClick={OnUpdate}  
                    >
                        ➕ Update Price
                    </button>
                </form>
            </div>
        </>
    );
}

export default PizzaEdit;
