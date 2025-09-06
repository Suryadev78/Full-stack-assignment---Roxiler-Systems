import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger, } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import axios from "axios";

export default function AddUser(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [address,setAddress] = useState("");
    const [password,setPassword] = useState("");
    const [role,setRole] = useState("NORMAL_USER");
    const [errors,setErrors] = useState({});



    const validate = () =>{
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
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!validate())return;
        try{
            const token =localStorage.getItem("token")
            const res = await axios.post("http://localhost:3000/api/v1/admin/create-user",
                {
                    Name:name,
                    Email:email,
                    Address:address,
                    Password:password,
                    role:role
                },
                {headers:{
                    Authorization:`Bearer ${token}`
                }}
            )
            alert(res.data.msg)
            setName("");
            setEmail("");
            setAddress("");
            setPassword("");
            setErrors({});

        }
        catch(e){
            alert("failed to create user")
        }

        }


    return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" size="sm">+ Add User/Admin</Button>
          </DialogTrigger>
          <DialogContent>
            <p className="text-sm text-gray-500 mb-2">Make sure to refresh the page after adding the user/admin to see added users/admins</p>
            <DialogHeader>
              <DialogTitle>Add User/Admin</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <Label>Address</Label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} required />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              <div>
  <Label>Role</Label>
  <select
    value={role}
    onChange={(e) => setRole(e.target.value)}
    className="w-full border rounded-md p-2"
  >
    <option value="NORMAL_USER">User</option>
    <option value="ADMIN">Admin</option>
    <option value="STORE_OWNER">Store Owner</option>
  </select>
</div>  
    
              <Button type="submit" className="w-full">Create User</Button>
            </form>
          </DialogContent>
        </Dialog>
      );
}