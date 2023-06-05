import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { getUser ,getToken } from "../services/authorize";


const FormComponent=()=>{
    const [state,setState] = useState({
        title:"",
        author:getUser()
    })
    const {title,author} = state

    const [content,setContent] = useState('')
    
    // กำหนดค่าให้กับ state
    const inputValue=name=>event =>{
        //console.log(name,"=",event.target.value)
        // ... หมายถึงเข้าไปแก้ไข ทุกๆ field ในที่นี้หมายถึง title ,content , author
        setState({...state,[name]:event.target.value});
    }

    const submitContent=(event)=>{
        setContent(event)
    }

    // เพิ่มข้อมูล
    const submitForm=(e)=>{
        e.preventDefault();
        //console.table({title,content,author});
        console.log("API URL",process.env.REACT_APP_API)
        // ความหมายเดียวกันกับ  axios.post(http://localhost:5500/api/create)
        // เวลาเรียกใช้ api ใส่ header ไปด้วย เพื่อไว้เช็ค token ในการทำงาน
        axios
        .post(`${process.env.REACT_APP_API}/create`,
        {title,content,author},
        {
            headers:{
                authorization:`Bearer ${getToken()}`
            }
        }
        )
        .then(response=>{
            Swal.fire(
                'แจ้งเตือน',
                "บันทึกข้อมูลบทความเรียบร้อย",
                'success'
              )
            // เคลียร์แบบฟอร์มให้เป็นค่าว่าง
            setState({...state,title:"",author:""})
            setContent("")
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
          <h1>เขียนบทความ</h1>
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
                    placeholder="เขียนรายละเอียดบทความของคุณ"
                    style={{border:'1px solid #666'}}
                />
            </div>
            <div className="form-group">
                <label>ผู้แต่ง</label>
                <input type="text" className="form-control" value={author} onChange={inputValue("author")}/>
            </div>
            <br/>
            <input type="submit" value="บันทึก" className="btn btn-primary"/>
          </form>
        </div>
      );
}

export default FormComponent;