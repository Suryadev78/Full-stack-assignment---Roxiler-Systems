import { useState, useEffect } from "react";
import axios from "axios";
import {API_BASE_URL} from "../../config.js"
export default function useStores({storeSearch}) {
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  useEffect(()=>{
    const fetchData = async ()=>{
        try{
            const token = localStorage.getItem("token");
            const query = storeSearch ? `?search=${storeSearch}` : "";
            const res = await axios.get(`${API_BASE_URL}/api/v1/user/list-stores${query}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setStores(res.data.stores || []);

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
  },[storeSearch])
  return {stores,loading,error}

}