import React, { useEffect, useState } from "react";
import axios from "axios";

export default function fetchApi(url) {
  const [data, setData] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    try {
      axios
        .get(url)
        .then((res) => setData(res))
        .catch((err) => console.error(err));
    } catch (err) {
      console.lgo(err);
    }

    try {
      axios
        .get(url)
        .then((res) => setBlogs(res))
        .catch((err) => console.error(err));
    } catch (err) {
      console.lgo(err);
    }

    return controller?.abort();
  }, [url]);
  return { data, loading, blogs };
}
