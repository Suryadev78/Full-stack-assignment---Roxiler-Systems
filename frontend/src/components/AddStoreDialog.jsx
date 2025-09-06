import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AddStore(){
  const [storeName,setStoreName] = useState("");
  const [storeEmail,setStoreEmail] = useState("");
  const [storeAddress,setStoreAddress] = useState("");
  const [storeOwner,setStoreOwner] = useState("");
  const [users,setUsers] = useState([]);
  const [errors,setErrors] = useState({});

  // fetch users to show in dropdown
  useEffect(()=>{
    const fetchUsers = async()=>{
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/v1/admin/list-users",{
          headers:{ Authorization: `Bearer ${token}` }
        });
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("Error fetching users:",err);
      }
    }
    fetchUsers();
  },[]);

  const validate = () => {
    let newErrors = {};
    if(storeName.length < 3){
      newErrors.name = "Name must be atleast 3 characters";
    }
    if(storeEmail.length < 3){
      newErrors.email = "Email must be atleast 3 characters";
    }
    else if(!/\S+@\S+\.\S+/.test(storeEmail)){
      newErrors.email = "Invalid email";
    }
    if(storeAddress.length > 400){
      newErrors.address = "Address cannot be more than 400 characters";
    }
    if(!storeOwner){
      newErrors.owner = "You must select an owner";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!validate())return;

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/api/v1/admin/create-store",{
        Name: storeName,
        Email: storeEmail,
        Address: storeAddress,
        ownerId: Number(storeOwner)
      },{
        headers:{ Authorization: `Bearer ${token}` }
      });
      alert("store created successfully!");
    } catch (err) {
      console.error(err);
      alert("error creating store");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">+ Add Store</Button>
      </DialogTrigger>
      <DialogContent>
        <p className="text-sm text-gray-500 mb-2">Make sure to refresh the page after adding the store to see added stores</p>
        <DialogHeader>
          <DialogTitle>Add Store</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Store Name</Label>
            <Input name="name" onChange={(e)=>setStoreName(e.target.value)} required />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" name="email" onChange={(e)=>setStoreEmail(e.target.value)} required />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <Label>Address</Label>
            <Input name="address" onChange={(e)=>setStoreAddress(e.target.value)} required />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>
          <div>
            <Label>Owner</Label>
            <select value={storeOwner} onChange={(e)=>setStoreOwner(e.target.value)} className="w-full border rounded-md p-2">
              <option value="">Select Owner</option>
              {users.map(user=>(
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
            {errors.owner && <p className="text-red-500 text-sm">{errors.owner}</p>}
          </div>
          <Button type="submit" className="w-full">Create Store</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
