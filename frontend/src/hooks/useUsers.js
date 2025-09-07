import axios from "axios";
import { useEffect,useState } from "react";
import {API_BASE_URL} from "../../config.js"


export default function useUsers({search}){
    const [users,setUsers] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const token = localStorage.getItem("token");
                const query = search ? `?search=${search}` : "";
                const res =await axios.get(`${API_BASE_URL}/api/v1/admin/list-users${query}`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                setUsers(res.data.users || []);
            }
            catch(e){
                setError(e.message);
                console.log(e);
            }
            finally{
                setLoading(false);
            }
        }
        fetchData();
    },[search])
    return {users,loading,error}
}