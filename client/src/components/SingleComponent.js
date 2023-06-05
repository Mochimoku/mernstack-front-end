import axios from "axios";
import { useState,useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import renderHTML from "react-render-html";

// รายละเอียดบทความ

const SingleComponent=(props)=>{
    const [blog,setBlog] = useState('');
    let slug = props.match.params.slug;
    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_API}/blog/${slug}`)
        //.get("http://localhost:5500/api/blog/tour-thailand")
        .then(response=>{
            setBlog(response.data)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])
    return(
        <div className="container p-5">
            <NavbarComponent/>
            {blog && 
            <dev>
                <h1>{blog.title}</h1>
                <div className="pt-3">{renderHTML(blog.content)}</div>
                <p className="text-muted">ผู้เขียน: {blog.author} , เผยแพร่: {new Date(blog.createdAt).toLocaleString()}</p></dev>}
            </div>
    )
    
 /*   return(
        <div>
            {JSON.stringify(blog)}
            {`${process.env.REACT_APP_API}blog/${slug}`}
        </div>
    )*/
}

export default SingleComponent;