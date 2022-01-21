import React, {useState, useEffect} from 'react'
import Advances from './Advances'
import Declines from './Declines';

const AllIndices = () => {
    const [AllIndices, setIndices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true)
        const client = new WebSocket("ws://localhost:5000")
        client.onopen = () => {
            client.send('CLIENT: Connected to server.');
        }

        client.onmessage = (event) => {
            const jsonData = JSON.parse(event.data);
            setLoading(false)
            if(jsonData.length!==0){
                setIndices(jsonData);
            } else {
                setError(true)
            }
        }
    }, [])
    

    return (
        <div className="all-indices">
            <table>
                <thead>
                    <tr>
                        <th>Index Name</th>
                        <th>Advances</th>
                        <th>Declines</th>
                    </tr>
                </thead>
                <tbody style={{align:"left"}}>
                   {    error ? (
                            <tr className="text-center">
                                <td colSpan="3">{error}</td>
                            </tr>
                        ) : (
                           loading ? (
                            <tr className="text-center">
                                <td colSpan="3">Loading...</td>
                            </tr>
                        ) :
                        AllIndices?.map((indice, i) => {
                            return(                                
                                <tr key={indice.indexId} className={i%2 ? "even-tr" : "odd-tr"}>
                                    <td>{indice.indexName}</td>
                                    <td><Advances indexId = {indice.indexId} indexName={indice.indexName} advances={indice.advances}/></td>
                                    <td><Declines indexId = {indice.indexId} indexName={indice.indexName} declines={indice.declines} /></td>
                                </tr>
                            )
                        }))
                    }
                </tbody>
            </table>
            
        </div>
    )
}

export default AllIndices;