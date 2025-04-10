import { useEffect, useState } from "react";
import api from "../libs/axios";

const Protected = () => {
    const [error, setError] = useState({
        status: 200,
        message: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                await api.get('/gemini/readAny')
            } catch (error) {
                console.log(error);
                if (error.response) {
                    setError({
                        status: error.response.status,
                        message: error.response.data.message || 'An error occurred'
                    });
                } else if (error.request) {
                    setError({
                        status: 500,
                        message: 'No response received from server'
                    });
                } else {
                    setError({
                        status: 500,
                        message: 'An unexpected error occurred'
                    });
                }
            }finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [])
    if (isLoading) {
        return (
            <div className="loading-page">
                <h1>Loading...</h1>
            </div>
        );
    }
    if (error.status !== 200) {
        return (
            <div className="error-page">
                <h1>Error {error.status}</h1>
                <p>{error.message}</p>
            </div>
        );
    }
    return (
        <div>
            <h1>Protected Page</h1>
            <p>This is a protected page that only authenticated users can see.</p>
        </div>
    );
}

export default Protected;