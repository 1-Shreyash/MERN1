import React, { useEffect, useState } from 'react'

const Service = () => {
  const [services, setServices] = useState({});

  const loadServices = async() => {
    try {
      const response = await fetch("http://localhost:5001/api/data/service",{
        method:"GET",
      });
      if(response.ok){
        const data = await response.json();
        let y = data.msg
        setServices(y)
        console.log("SERVICES", services)
      }
      else{
        alert("Unable to load Services")
      }
    } catch (error) {
      console.log("Service Load Error : ", error);
    }
  }
  useEffect(() => {
    loadServices();
  }, [])
  
  return (
    <div>Service</div>
  )
}

export default Service