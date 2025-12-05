import React,{useState} from 'react'
import "../styles/LoginPage.css"
import { LoginApi } from '../services/Api'
import { storeUserData } from '../services/Storage'
import { isAuthenticated } from '../services/Auth'
import { Link, Navigate } from 'react-router-dom'
import Navbar from './Navbar'
const LoginPage = () => {
    const initialStateErrors = {
            email:{required:false},
            password:{required:false},
            custom_error:null
        }
    const [errors, setErrors] = useState(initialStateErrors)
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({email:"",password:""})

    const handleInput = (event) =>{
        setInputs({...inputs,[event.target.name]:event.target.value})
    }

    const handleSubmit = (event) =>{
            event.preventDefault()
            let error = initialStateErrors
            let hasError = false
            if(inputs.email == ""){
                error.email.required = true
                hasError = true
            }
            if(inputs.password == "" ){
                error.password.required = true
                hasError = true
            }
            if(!hasError){
                setLoading(true)
                LoginApi(inputs)
                .then((res)=>{
                    storeUserData(res.data.idToken)
                })
                .catch((err)=>{
                    if(err.response.data.error.message == "INVALID_LOGIN_CREDENTIALS"){
                        setErrors({...errors,custom_error:"Incorrect email or password"})
                    }
                })
                .finally(()=>setLoading(false))
            }
            setErrors({...error})
        }

        if(isAuthenticated()){
            return <Navigate to="/dashboard"/>
        }

  return (
        <>
        <Navbar/>
        <section className="login-block">
            <div className="container">
                <div className="row ">
                    <div className="col login-sec">
                        <h2 className="text-center">Login Now</h2>
                        <form onSubmit={handleSubmit} className="login-form" action="">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                            <input type="email"  className="form-control" name="email"  id="" placeholder="email" onChange={handleInput} />
                            { errors.email.required ? 
                                (<span className="text-danger" >
                                    Email is required.
                                </span>):null
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                            <input  className="form-control" type="password"  name="password" placeholder="password" id="" onChange={handleInput}/>
                            {errors.password.required?
                                (<span className="text-danger" >
                                    Password is required.
                                </span>):null
                            } 
                        </div>
                        <div className="form-group">
                        {
                            loading?
                            <div  className="text-center">
                                <div className="spinner-border text-primary " role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </div>:null
                        }
                            {errors.custom_error?
                            (<span className="text-danger" >
                                <p>{errors.custom_error}</p>
                            </span>):null
                            }
                            <input  type="submit" className="btn btn-primary" disabled={loading} value="Login" />
                        </div>
                        <div className="clearfix"></div>
                        <div className="form-group">Create new account ? Please <Link  to="/register">Register</Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </>

  )
}

export default LoginPage