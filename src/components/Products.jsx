import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Products() {
  const [data, setData]= useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    axios
    .get('https://nmp4sbv7x6.execute-api.us-east-1.amazonaws.com/dev/gadgets')
    .then((res) => {
      setData(res.data);
      setLoading(false);
    })
    .catch((err) => console.error(err))
    return controller.abort();
  }, []);
  return (
    <>
      <div className="container mx-auto">
        <div className="border rounded-md mt-5">
          <div className='flex flex-wrap'>
            {loading 
            ? "Loading..."
            : data.map((item, i) => (
              <div key={i} className='w-[300px] aspect-square border m-3'>
                <img src={item.image[0]} alt="image" className="h-4/5 object-cover mx-auto"/>
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
