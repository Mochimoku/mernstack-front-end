import { useState,useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { getToken } from "../services/authorize";

const EditComponent=(props)=>{
    const [state,setState] = useState({
        title:"",
        author:"",
        slug:""
    })
    // restruc
    const {title,author,slug} = state

    const [content,setContent] = useState('')

    const submitContent=(event)=>{
        setContent(event)
    }

    // ดึงข้อมูลบทความที่ต้องการแก้ไข
    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
        .then(response=>{
            const {title,content,author,slug} = response.data
            setState({...state,title,author,slug})
            setContent(content)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])

    const showUpdateForm=()=>(
        <form onSubmit={submitForm}>
            <div className="form-group">
                <label>ชื่อบทความ</label>
                <input type="text" className="form-control" value={title} onChange={inputValue("title")}/>
            </div>
            <div className="form-group">
                <label>รายละเอียด</label>
                <ReactQuill
                    value={content}
                    onChange={submitContent}
                    theme="snow"
                    className="pb-5 mb-3"
                    style={{border:'1px solid #666'}}
                />
            </div>
            <div className="form-group">
                <label>ผู้แต่ง</label>
                <input type="text" className="form-control" value={author} onChange={inputValue("author")}/>
            </div>
            <br/>
            <input type="submit" value="อัพเดรต" className="btn btn-primary"/>
          </form>
    )
    
    // กำหนดค่าให้กับ state
    const inputValue=name=>event =>{
        //console.log(name,"=",event.target.value)
        // ... หมายถึงเข้าไปแก้ไข ทุกๆ field ในที่นี้หมายถึง title ,content , author
        setState({...state,[name]:event.target.value});
    }

    // http://localhost:5500/api/blog/slug => put
    // กดปุ่มอัพเดรตข้อมูล
    const submitForm=(e)=>{
        e.preventDefault();
        console.log("API URL",process.env.REACT_APP_API)
        // เวลาเรียกใช้ api ใส่ header ไปด้วย เพื่อไว้เช็ค token ในการทำงาน
        axios
        .put(`${process.env.REACT_APP_API}/blog/${slug}`,{title,content,author},
        {
            headers:{
                authorization:`Bearer ${getToken()}`
            }
        }
        )
        .then(response=>{
            Swal.fire(
                'แจ้งเตือน',
                "อัพเดรตบทความเรียบร้อย",
                'success'
              )
            // เคลียร์แบบฟอร์มให้เป็นค่าว่าง
            const {title,content,author,slug} = response.data
            setState({...state,title,author,slug})
            setContent(content)
        })
        .catch(err=>{
            Swal.fire(
                'แจ้งเตือน', 
                err.response.data.error,
                'error'
              )
        })
    }
    return (
        <div className="container p-5">
        <NavbarComponent/>
          <h1>แก้ไขบทความ</h1>
          {showUpdateForm()}
        </div>
      );
}

export default EditComponent;