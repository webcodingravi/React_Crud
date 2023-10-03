import React,{useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';

function UpdateData() {
    const [postData, setPostData] = useState({
        id:1,
        title: "",
        body: ""
    })
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPostData({
            ...postData,
            [name]:value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
 
        const apiUrl = `https://jsonplaceholder.typicode.com/posts/${postData.id}`;

        const requestOption = {
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
            },
            body:JSON.stringify(postData),
        }

        fetch(apiUrl, requestOption)
        .then((response) => response.json())
        .then((data) => {
            setMessage("Post Updated Successfully");
            console.log(data);
        })
        .catch((error)=>{
          console.log("Error:", error);
          setMessage("Post Not Updated ");
        })
        .finally(()=> {
            setLoading(false);
        })
     }




    useEffect(()=> {
      const postId = postData.id;
      const apiUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;

      fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
          setPostData(data);
      })
      .catch((error)=>{
        console.log("Error:", error);
      })
    },[postData.id]);

  
  return (
    <>
     
     <Container>
     {
        loading && <p>Loading..</p>
      }
      {
        message && <p>{message}</p>
      }

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" className="form-control" name="title" value={postData.title} onChange={handleChange}/>
        <br/>
        <label>Title</label>
      <textarea name="body" className="form-control" value={postData.body} onChange={handleChange}/><br/>
      <button type="submit" className="btn btn-primary">Update</button>
      </form>
      </Container>
    </>
  )
}

export default UpdateData;
