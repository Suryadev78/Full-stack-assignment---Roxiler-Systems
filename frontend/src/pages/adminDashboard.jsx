import StatsSection from "../components/ui/stats.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Button } from "../components/ui/button.jsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Search, Filter, Users, Store } from "lucide-react";
import { Input } from "../components/ui/input.jsx";
import AddStore from "../components/AddStoreDialog.jsx";
import AddUser from "../components/AddUserDialog.jsx";
import useUsers from "../hooks/useUsers.js";
import useAdminStats from "../hooks/useAdminStats.js";
import useStores from "../hooks/useStores.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [storeSearch, setStoreSearch] = useState("");
  const { stats, loading: statsLoading, error: statsError } = useAdminStats();
  const { stores, loading: storesLoading, error: storesError } = useStores({ storeSearch });
  const { users, loading: usersLoading, error: usersError } = useUsers({ search });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [userSortConfig, setUserSortConfig] = useState({ key: null, direction: "asc" });
  const [storeSortConfig, setStoreSortConfig] = useState({ key: null, direction: "asc" });

  // Sorting helpers this sorting feature is implemented by AI
  const sortArray = (array, config) => {
    if (!config.key) return array;
    return [...array].sort((a, b) => {
      const valA = a[config.key];
      const valB = b[config.key];

      if (typeof valA === "string") {
        return config.direction === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else {
        return config.direction === "asc" ? valA - valB : valB - valA;
      }
    });
  };

  const requestUserSort = (key) => {
    let direction = "asc";
    if (userSortConfig.key === key && userSortConfig.direction === "asc") {
      direction = "desc";
    }
    setUserSortConfig({ key, direction });
  };

  const requestStoreSort = (key) => {
    let direction = "asc";
    if (storeSortConfig.key === key && storeSortConfig.direction === "asc") {
      direction = "desc";
    }
    setStoreSortConfig({ key, direction });
  };

  const sortedUsers = sortArray(users, userSortConfig);
  const sortedStores = sortArray(stores, storeSortConfig);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">Welcome, Admin</h1>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <div className="mx-auto px-6 py-8 space-y-8">
        <section>
          <StatsSection stats={stats} />
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
            <p className="text-sm text-gray-500 mb-2">
    Click on column headers to sort ascending/descending
  </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users..."
                    className="pl-10"
                  />
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    onChange={(e) => setStoreSearch(e.target.value)}
                    placeholder="Search stores..."
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Users
              </CardTitle>
              <AddUser />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead onClick={() => requestUserSort("name")}>Name</TableHead>
                    <TableHead onClick={() => requestUserSort("email")}>Email</TableHead>
                    <TableHead onClick={() => requestUserSort("address")}>Address</TableHead>
                    <TableHead onClick={() => requestUserSort("role")}>Role</TableHead>
                    <TableHead onClick={() => requestUserSort("rating")}>Ratings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usersLoading ? (
                    <TableRow>
                      <TableCell colSpan={5}>Loading users...</TableCell>
                    </TableRow>
                  ) : usersError ? (
                    <TableRow>
                      <TableCell colSpan={5}>Failed to fetch users</TableCell>
                    </TableRow>
                  ) : (
                    sortedUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.address}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{user.role}</Badge>
                        </TableCell>
                        <TableCell className="flex items-center gap-1">
                          {user.role === "STORE_OWNER" ? user.rating : null}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Stores
              </CardTitle>
              <AddStore />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead onClick={() => requestStoreSort("name")}>Store Name</TableHead>
                    <TableHead onClick={() => requestStoreSort("email")}>Email</TableHead>
                    <TableHead onClick={() => requestStoreSort("address")}>Address</TableHead>
                    <TableHead onClick={() => requestStoreSort("avarageRating")}>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {storesLoading ? (
                    <TableRow>
                      <TableCell colSpan={4}>Loading stores...</TableCell>
                    </TableRow>
                  ) : storesError ? (
                    <TableRow>
                      <TableCell colSpan={4}>Failed to fetch stores</TableCell>
                    </TableRow>
                  ) : (
                    sortedStores.map((store) => (
                      <TableRow key={store.id}>
                        <TableCell className="font-medium">{store.name}</TableCell>
                        <TableCell>{store.email}</TableCell>
                        <TableCell>{store.address}</TableCell>
                        <TableCell className="flex items-center gap-1">{store.avarageRating}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
