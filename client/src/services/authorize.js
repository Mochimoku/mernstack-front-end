// เก็บ Token  , username ลงไว้ใน session storage
export const authenticate = (response,next)=>{
    if(window !== "undefined"){
        // เก็บข้อมูล session storage
        sessionStorage.setItem("token",JSON.stringify(response.data.token))
        sessionStorage.setItem("user",JSON.stringify(response.data.username))
    }
    next()
}

// ดึงข้อมูล token
export const getToken=()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }
        else{
            return false
        }

    }
}

// ดึงข้อมูล user

export const getUser=()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("user")){
            return JSON.parse(sessionStorage.getItem("user"))
        }
        else{
            return false
        }

    }
}

// logout //เมื่อ logout เสร็จจะทำให้ทำอะไร โดยระบุ  next
export const logout=(next)=>{
    // check ว่า เว็บเปิดอยู่ไหม
    if(window !== "undefined"){
        // ถ้าเปิดอยู่ในลบ ข้อมูลในกล่อง token , user
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
    }
    next()
}