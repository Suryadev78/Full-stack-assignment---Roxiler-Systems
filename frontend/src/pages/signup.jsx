import axios from 'axios';
import * as jwt_decode from "jwt-decode";

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (name.length < 3 || name.length > 20) {
      newErrors.name = "Name must be between 3 and 20 characters";
    }
    if (email.length < 3) {
      newErrors.email = "Email must be atleast 3 characters";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email";
    }
    if (password.length < 8 || password.length > 16) {
      newErrors.password = "Password must be between 8 and 16 characters";
    } else if (!/(?=.*[A-Z])/.test(password)) {
      newErrors.password = "Password must contain an uppercase letter";
    } else if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
      newErrors.password = "Password must contain a special character";
    }
    if (address.length > 400) {
      newErrors.address = "Address must be less than 400 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const res = await axios.post("http://localhost:3000/api/v1/user/auth/signup", {
      Name: name,
      Email: email,
      Password: password,
      Address: address,
    });
    const token = res.data.token
    if(token){
        localStorage.setItem("token",token)
        alert("signup successful")
        const user  = jwt_decode.jwtDecode(token);
        if(user.role ==="NORMAL_USER") navigate("/store-listings");
    }
    console.log(res.data);
  };

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-8 md:py-16 dark:bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="bg-white m-auto w-full max-w-md rounded-lg border p-0.5 shadow-md
                   max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div>
            <Link to="/" aria-label="go home">
              <div className="w-8 h-8 bg-slate-900 rounded"></div>
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">Create an Account</h1>
            <p className="text-sm">Welcome! Create an account to get started</p>
          </div>

          <hr className="my-4 border-dashed" />

          <div className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                required
                id="name"
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                required
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="pwd" className="text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                required
                id="pwd"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="block text-sm font-medium">
                Address
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                maxLength={400}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-2 px-4 rounded-md hover:bg-slate-950  focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Continue
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg border p-3">
          <p className="text-gray-600 text-center text-sm">
            Have an account ?{" "}
            <Link to="/login" className="text-slate-800 hover:text-slate-950 px-2">
              Login
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
