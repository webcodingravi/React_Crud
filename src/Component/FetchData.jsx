import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function FetchData() {
 const [data, setData] = useState([]);
 const [loading, setLoading] = useState(true);

 const FetchApi = async() => {
     try{
       const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if(!response.ok) {
            throw new Error("Network Response failed");
        }
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
        setLoading(false);
     }
     catch(error){
        console.error("Error:", error);
     }
 }

 useEffect(()=> {
     FetchApi();
 },[]);

 /****delete data */

 const deleteBtn = (id) => {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, 
   {method: "DELETE",})
  .then((response)=> {
   if(!response.ok) {
     throw new Error("Network delete not response");
   }
   return response.json();
 }) 
   .then(()=> {
     setData(data.filter((item) => item.id !== id));
   })
   .catch((error) => {
      console.error("Error:", error);
 
  })
}


  
  return (
    <>
      <Container>
        <Row>
         <Col>
        
         <table className="table table-bordered">
           <thead>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
           </thead>
           {loading && (<p>Loading...</p>)}
           {
            data.map((item) => (
              <tbody key={item.id}>
              <tr>
               <td>{item.id}</td>
               <td>{item.title}</td>
               <td>{item.body}</td>
               <td><button className="btn btn-danger" onClick={() =>deleteBtn(item.id)}>Delete</button></td>
              </tr>
            </tbody>
          
            ))
            
           }
            </table>
         </Col>
        </Row>
      </Container>
    </>
  )
}

export default FetchData;
