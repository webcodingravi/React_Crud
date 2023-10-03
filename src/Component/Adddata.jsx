import React, {useState} from 'react';
import { Container } from 'react-bootstrap';

function Adddata() {
    const [formData, setFormData] = useState({
        title: "",
        body:"",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value,
           
        });
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
         
        const apiUrl = "https://jsonplaceholder.typicode.com/posts";


        const requestOption = {
            method: "POST",
            headers : {
                "Content-Type": "application/json",
    
            },
            body:JSON.stringify(formData)
        }
    
        fetch(apiUrl, requestOption)
        .then((response)=>response.json())
        .then((data) => {
            console.log("Response Data:", data);
        })
        .catch((error)=> {
            console.log("Error:", error);
        })
    
 
    }

  



  return (
    <>
    <Container>
    <form onSubmit={handlerSubmit}>
        <lable>title</lable>
        <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" placeholder="please Enter title.." /><br/>

        <lable>Body</lable>
        <textarea name="body" value={formData.body} onChange={handleChange} className="form-control" placeholder="please Enter Body..."></textarea><br/>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>

    </Container>
  
    </>
  )
}

export default Adddata;
