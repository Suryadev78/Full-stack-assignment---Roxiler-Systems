import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Star } from "lucide-react";
import useStores from "../hooks/useStores.js"; 
import axios from "axios";
import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import {API_BASE_URL} from "../../config.js"

export default function NormalUserDashboard() {
  const [storeSearch, setStoreSearch] = useState("");
  const navigate = useNavigate();
  const [ratingError, setRatingError] = useState(null);
  const [userRatings, setUserRatings] = useState({});
  const { stores, loading, error } = useStores({ storeSearch });


  // Initialize userRatings from the fetched stores
  useEffect(() => {
    const initialRatings = {};
    stores.forEach(store => {
      if (store.userRating) initialRatings[store.id] = store.userRating;
    });
    setUserRatings(initialRatings);
  }, [stores]);

  const logOut = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/");
  };

  const handleSubmitRating = async (storeId, value) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_BASE_URL}/api/v1/user/rate-store`,
        { storeId, value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if(res) alert("Rating submitted successfully");
      setUserRatings(prev => ({ ...prev, [storeId]: value }));
    } catch (e) {
      console.log(e);
      alert("Failed to submit rating");
      setRatingError(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Available Stores</h1>
        
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search stores by name or address..."
            onChange={(e) => setStoreSearch(e.target.value)}
            className="w-64"
          />

        {/* update password dialog box from shadcn */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Update Password</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Password</DialogTitle>
              </DialogHeader>
              <UpdatePasswordForm />
            </DialogContent>
          </Dialog>

          <Button onClick={logOut} variant="destructive">Logout</Button>
        </div>
      </header>

      <p className="text-sm text-gray-500 mb-4">
        *Make sure to refresh the page to see the latest updated average rating
      </p>

      {loading ? (
        <p>Loading stores...</p>
      ) : error ? (
        <p className="text-red-400">{`Failed to fetch stores: ${error}`}</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stores.map(store => {
            const selectedRating = userRatings[store.id] || 0;
            return (
              <Card key={store.id} className="shadow-md">
                <CardHeader>
                  <CardTitle>{store.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-gray-600">{store.address}</p>

                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    Overall: {store.avarageRating}
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-sm mr-2">Your Rating:</span>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => handleSubmitRating(store.id, star)}
                        className={star <= selectedRating ? "text-yellow-500" : "text-gray-400"}
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  {ratingError && <p className="text-red-400 text-sm">{ratingError}</p>}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Update Password Form Component
function UpdatePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (oldPassword.length < 1) {
      newErrors.oldPassword = "Enter your old password";
    }
    if(newPassword.length < 8){
        newErrors.newPassword = "Password must be atleast 8 characters";
    }
    if (newPassword.length < 8 || newPassword.length > 16) { 
        newErrors.password = "Password must be between 8 and 16 characters";
      } else if (!/(?=.*[A-Z])/.test(newPassword)) {
        newErrors.newPassword = "Password must contain an uppercase letter";
      } else if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(newPassword)) {
        newErrors.password = "Password must contain a special character";
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API_BASE_URL}/api/v1/user/auth/update-password`,
        { oldPassword : oldPassword, 
            newPassword:newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({ type: "success", text: res.data.msg });
      alert("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (e) {
       setErrors(e.response.data.errors);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <Input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      {message && (
        <p className={message.type === "success" ? "text-green-500" : "text-red-500"}>
          {message.text}
        </p>
      )}
      <Button type="submit" className="w-full">Update</Button>
    </form>
  );
}
