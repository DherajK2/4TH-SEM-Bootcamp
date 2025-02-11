import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageHeader from "../header/PageHeader";

function PizzaView() {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [pizza, setPizza] = useState({
        pizzaId: '',
        pizzaName: '',
        pizzaSize: '',
        pizzaPrice: '',
        pizzaCategory: ''
    });

    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const response = await axios.get(`/api/pizzas/${id}`);
                setPizza(response.data); 
            } catch (error) {
                console.error("Error fetching pizza:", error); 
            }
        };

        fetchPizza(); 
    }, [id]); 
    return (
        <>
            <PageHeader />

            <h3>
                <button className="btn btn-light" onClick={() => navigate('/PizzaList')}>🔙 Go Back</button> ➕ View Pizza 🍕
            </h3>

            <div className="container mt-4">
                <form>
                    <div className="form-group mb-3">
                        <label htmlFor="pizzaId">ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pizzaId"
                            name="pizzaId"
                            value={pizza.pizzaId}
                            readOnly
                            placeholder="Pizza ID"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="pizzaName">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pizzaName"
                            name="pizzaName"
                            value={pizza.pizzaName}
                            readOnly
                            placeholder="Pizza Name"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="pizzaSize">Size (in cm)</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pizzaSize"
                            name="pizzaSize"
                            value={pizza.pizzaSize}
                            readOnly
                            placeholder="Pizza Size"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="pizzaPrice">Price (in Rupees)</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pizzaPrice"
                            name="pizzaPrice"
                            value={pizza.pizzaPrice}
                            readOnly
                            placeholder="Pizza Price"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="pizzaCategory">Category</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pizzaCategory"
                            name="pizzaCategory"
                            value={pizza.pizzaCategory}
                            readOnly
                            placeholder="Pizza Category"
                        />
                    </div>
                </form>
            </div>
        </>
    );
}

export default PizzaView;
