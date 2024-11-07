import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ax from 'axios'


const Products = () => {
  const [adminActive, setadminActive] = useState(false)
  const [itemsData, setItemsData] = useState([])
  const [isLoad, setisLoad] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [SelectCategory, setSelectCategory] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))
  const bulr = `${import.meta.env.VITE_API_URL}/items/`
  const detData = () => {

  }
  useEffect(() => {
    user ? setadminActive(true) : setadminActive(false)
    const fetchItem = async () => {
      try {
        let urll = bulr
        if (SelectCategory) {
          const encodedCategory = encodeURIComponent(SelectCategory);
          urll += `?category=${encodedCategory}`

        }

        let res = await ax.get(urll)
        setItemsData(res.data)
        setisLoad(false)
      } catch (error) {
        console.log(`ERROR! ${error}`);
      }
    }

    fetchItem()
  }, [SelectCategory])

  const filteredItems = itemsData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mt-5">
      <div className='head d-flex'>
        <h2>All Products</h2>
        {adminActive && <Link className="btn btn-lg add btn-outline-light" to="/AddProduct" role="button" >Add Produts</Link>
        }
      </div>

      <div className=' filters'>
        <label>Categories</label>
        <select onChange={(e) => setSelectCategory(e.target.value)}>
          <option value="">All</option>
          <option value="Hair Shampoos & Conditioners">Hair Shampoos & Conditioners</option>
          <option value="Facial Cleansers">Facial Cleansers</option>
          <option value="Moisturizers & Creams">Moisturizers & Creams</option>
          <option value="Sunscreen">Sunscreen</option>
          <option value="Face Masks">Face Masks</option>
          <option value="other">other</option>
        </select>
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {
        isLoad ? (<p>Loading...</p>) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {
              filteredItems.map((item, index) => (
                <div key={index} className="col mb-4">
                  <div className="card h-100">
                    <div className="square-wrapper" style={{ position: 'relative', width: '100%', paddingTop: '100%' }}>
                      <img src={`${import.meta.env.VITE_API_URL.replace('/api', '')}/uploads/${item.thumbnail}`} 
                      style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', objectFit: 'cover' }} className="card-img-top" alt="Product Image" />

                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</h5>
                      <Link to={'/Details'} state={item} className="btn mt-auto">View Details</Link>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default Products