import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../header/PageHeader";
import axios from 'axios';

function PizzaView() {
    const [pizza, setPizza] = useState({id:'', name:'', size:'', price:'', category:''});
    const params = useParams();

    const readById = async () => {
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.get(`${baseUrl}/pizzas/${params.id}`);
            const queriedPizza = response.data;
            setPizza(queriedPizza);
        } catch(error) {
            alert('Server Error');
        }
    };

    useEffect(() => {
        readById();
    }, []);

    return (
        <>
            <PageHeader />
            
            <h3><a href="/pizzas/list" className="btn btn-light">🔙Go Back</a>👁️View Pizza</h3>
            <div className="container">
                <div className="form-group mb-3">
                    <label htmlFor="id" className="form-label">🔢Pizza ID:</label>
                    <div className="form-control" id="id">{pizza.id}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label">🍕Pizza Name:</label>
                    <div className="form-control" id="name">{pizza.name}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="size" className="form-label">📏Size (in cm):</label>
                    <div className="form-control" id="size">{pizza.size}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="price" className="form-label">💰Price (in rupees):</label>
                    <div className="form-control" id="price">{pizza.price}</div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="category" className="form-label">🍕Pizza Category:</label>
                    <div className="form-control" id="category">{pizza.category}</div>
                </div>
            </div>
        </>
    );
}

export default PizzaView;
