import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Product() {
  const { id } = useParams();
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    axios
    .get(`https://d6fq7jdbk9.execute-api.us-east-1.amazonaws.com/dev/gadgets/${id}`)
    .then((res) => {
      setData(res.data);
      setLoading(false);
    })
    .catch((err) => console.error(err))
    return controller.abort();
  }, [])
  return (
    <>
    <div className="container mx-auto">
        <div className="border rounded-md mt-5">
          <div className='flex flex-wrap justify-center'>
            <div className='image'>
              {data.title}
            </div>
          </div>
        </div>
    </div>
    </>
  )
}
