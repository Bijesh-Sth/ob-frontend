import React from 'react'
import Card from '../../components/Card/Card'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { searchProductApi } from '../../apis/Api'
const Search = () => {
  const { query } = useParams();
  console.log(  query);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    searchProductApi(searchQuery).then((res) => {
      console.log(res.data);
      setProducts(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [searchQuery]);
  console.log(products);
  return (
    <div className="container mt-5">
        <div className="d-flex justify-content-between">
            <h1>Search</h1>
            <input className='form-control w-25'  type="text" placeholder="Search" aria-label="Search"  onChange={(e)=>{setSearchQuery(e.target.value)}}/>
            </div>

            <p>Result for <b>{searchQuery}</b> </p>
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {
              products.length > 0 ? products.map((product) => {
                return (<Card product={product} />) 
              }) : <h1>No products found</h1>
            }
              </div>
    </div>
  )
}

export default Search