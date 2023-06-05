import NavbarComponent from "./NavbarComponent";
import { useState ,useEffect } from "react";
import axios from "axios"
import Swal from "sweetalert2";
import { authenticate, getUser } from "../services/authorize";
import {withRouter} from "react-router-dom"

const LoginComponent=(props)=>{
    const [state,setState] = useState({
        username:"",
        password:""
    })
    const {username,password} = state

    // กำหนดค่าให้กับ state
    const inputValue=name=>event =>{
        //console.log(name,"=",event.target.value)
        // ... หมายถึงเข้าไปแก้ไข ทุกๆ field ในที่นี้หมายถึง title ,content , author
        setState({...state,[name]:event.target.value});
    }

    const submitForm=(e)=>{
        e.preventDefault();
        //console.table({username,password})
        axios
        .post(`${process.env.REACT_APP_API}/login`,{username,password})
        .then(response=>{
            // login สำเร็จ  //next คือเมื่อ login สำเร็จให้ทำอะไร ในที่นี้คือให้ redirect ไป หน้า เขียนบทความ
            authenticate(response,()=>props.history.push("/create"))
        }).catch(err=>{
            Swal.fire('แจ้งเตือน',err.response.data.error,'error')
        })
    }
    // เช็คว่ามีข้อมูลในการ login แล้วให้ re direct ไปหน้าแรก
    useEffect(()=>{
        getUser() && props.history.push('/')
        // eslint-disable-next-line
    },[])
    return(
        <div className="container p-5">
        <NavbarComponent/>
          <h1>เข้าสู่ระบบ | Admin</h1>
          <form onSubmit={submitForm}>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={username} onChange={inputValue("username")}/>
            </div>
            
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange={inputValue("password")}/>
            </div>
            <br/>
            <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary"/>
          </form>
        </div>
    );
}

export default withRouter(LoginComponent) 