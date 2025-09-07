import axios from "axios";
import { useEffect,useState } from "react";
import {API_BASE_URL} from "../../config.js"

export default function useAdminStats(){
    const [stats,setStats] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const token = localStorage.getItem("token");
                const res = await axios.get(`${API_BASE_URL}/api/v1/admin/dashboard`,
                    {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setStats(res.data.data)
            }
            catch(e){
                console.log(e);
                setError(e.message);
            }
            finally{
                setLoading(false);
            }
            }
            fetchData();
        },[])

        return {stats,loading,error};
    }
    
    