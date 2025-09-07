import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import { Button } from "../components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import {API_BASE_URL} from "../../config.js"

export default function StoreOwnerDashboard() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE_URL}/api/v1/store-owner/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStores(res.data.stores || []);
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/login");
  };

  // Sorting state for each store's ratings table - this sorting feature is implemented by AI
  const [sortConfig, setSortConfig] = useState({}); // {storeId: {key: 'name'|'email'|'value', direction: 'asc'|'desc'}}

  const requestSort = (storeId, key) => {
    setSortConfig((prev) => { 
      const current = prev[storeId] || {};
      let direction = "asc";
      if (current.key === key && current.direction === "asc") direction = "desc";
      return { ...prev, [storeId]: { key, direction } };
    });
  };

  const sortArray = (array, config) => {
    if (!config?.key) return array;
    return [...array].sort((a, b) => {
      const valA = a[config.key];
      const valB = b[config.key];
      if (typeof valA === "string") return config.direction === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      return config.direction === "asc" ? valA - valB : valB - valA;
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{`Error: ${error}`}</p>;

  return (
    <div className="min-h-screen bg-background p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Store Owner Dashboard</h1>
        <div className="flex items-center gap-4">
          {/* Update Password Dialog */}
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

          <Button onClick={handleLogout} variant="destructive">Logout</Button>
        </div>
      </header>

      {stores.length === 0 ? (
        <p>No stores found.</p>
      ) : (
        stores.map((store) => {
          const storeSort = sortConfig[store.id] || {};
          const sortedRatings = sortArray(store.ratings || [], storeSort);

          return (
            <div key={store.id} className="mb-8">
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>{store.name} - Average Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">{store.averageRating || 0} / 5</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Users Who Rated {store.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">
    Click on column headers to sort ascending/descending - Name, Email, Rating
  </p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead onClick={() => requestSort(store.id, "name")}>Name</TableHead>
                        <TableHead onClick={() => requestSort(store.id, "email")}>Email</TableHead>
                        <TableHead onClick={() => requestSort(store.id, "value")}>Rating</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedRatings.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3}>No ratings yet.</TableCell>
                        </TableRow>
                      ) : (
                        sortedRatings.map((r) => (
                          <TableRow key={r.id}>
                            <TableCell>{r.user.name}</TableCell>
                            <TableCell>{r.user.email}</TableCell>
                            <TableCell>{r.value}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          );
        })
      )}
    </div>
  );
}

function UpdatePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!oldPassword) newErrors.oldPassword = "Enter your old password";
    if (!newPassword) newErrors.newPassword = "Enter a new password";
    if (newPassword.length < 8 || newPassword.length > 16)
      newErrors.newPassword = "Password must be between 8 and 16 characters";
    if (!/(?=.*[A-Z])/.test(newPassword))
      newErrors.newPassword = "Password must contain an uppercase letter";
    if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(newPassword))
      newErrors.newPassword = "Password must contain a special character";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API_BASE_URL}/api/v1/user/auth/update-password`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({ type: "success", text: res.data.msg });
      alert("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (e) {
      setErrors(e.response?.data?.errors || { general: "Failed to update password" });
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
