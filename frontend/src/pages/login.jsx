    import axios from 'axios';
    import { Link } from 'react-router-dom'
    import * as jwt_decode from "jwt-decode";
    import { useNavigate } from 'react-router-dom';
    import { useState } from 'react'
    import {API_BASE_URL} from "../../config.js"
    export default function LoginPage() {
        const [email,setEmail] = useState("");
        const [password,setPassword] = useState("");
        const [errors,setErrors] = useState({});
        const navigate = useNavigate();

        const validate = () => {
            let newErrors = {};
            if(email.length < 3){
                newErrors.email = "Email must be atleast 3 characters";
            }
            if(password.length < 1){
                newErrors.password = "Please enter a password";
            }
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        }
        const handleSubmit = async (e) =>{
            e.preventDefault();
            if(!validate())return ;
            try{

                const res = await axios.post("${API_BASE_URL}/api/v1/user/auth/login" ,{
                    Email :email,
                    Password :password
                })
                const token = res.data.token;
                if(token){
                    localStorage.setItem("token",token)

                   const user = jwt_decode.jwtDecode(token);
                   if(user.role === "ADMIN") navigate("/admin/dashboard");
                   else if(user.role === "NORMAL_USER") navigate("/store-listings");
                   else if(user.role === "STORE_OWNER") navigate("/store-owner-dashboard");
                   else navigate("/unauthorized");}
                   alert("login successful")
            }
            catch(e){
                if(e.response){
                    setErrors({errorMsg : e.response.data.msg})
                }
                else{
                    setErrors({errorMsg : "server unreachable,try later"})
                }
            }
        }
        return (
            <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
                <form onSubmit={handleSubmit}
                    className="bg-white m-auto h-fit w-full max-w-sm rounded-lg border p-0.5 shadow-md">
                    <div className="p-8 pb-6">
                        <div>
                            <Link
                                to="/"
                                aria-label="go home">
                                <div className="w-8 h-8 bg-slate-900 rounded"></div>
                            </Link>
                            <h1 className="mb-1 mt-4 text-xl font-semibold">Login In to Advanto</h1>
                            <p className="text-sm">Welcome back! Login in to continue</p>
                        </div>

                        <hr className="my-4 border-dashed" />

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    name="email"
                                    id="email"
                                    onChange={(e)=>setEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            <div className="space-y-0.5">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="pwd"
                                        className="text-sm font-medium">
                                        Password
                                    </label>
                                    
                                </div>
                                <input
                                    type="password"
                                    required
                                    name="pwd"
                                    onChange={(e)=>setPassword(e.target.value)}
                                    id="pwd"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors.password}</p>
                                )}
                            </div>
                            {errors.errorMsg && (
                                <p className='text-red-500 text-sm'>{errors.errorMsg}</p>
                            )}

                            <button 
                                type="submit"
                                className="w-full bg-slate-900 text-white py-2 px-4 rounded-md hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                Login
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg border p-3">
                        <p className="text-gray-600 text-center text-sm">
                            Don't have an account ?
                            <button
                                type="button"
                                className="text-blue-600 hover:text-blue-800 px-2">
                                    <Link to="/signup">Create an account</Link>
                                
                            </button>
                        </p>
                    </div>
                </form>
            </section>
        )
    }
