import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ax from 'axios'

const Home = () => {

  const [itemsData, setItemsData] = useState()
  const [isLoad, setisLoad] = useState(true)


  const bulr = `${import.meta.env.VITE_API_URL}/items/`

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await ax.get(bulr);

        // Ensure that response.data is an array before using slice
        if (Array.isArray(response.data)) {
          setItemsData(response.data.slice(-4));
        } else {
          throw new Error('Invalid data structure in the API response');
        }

        setisLoad(false);
      } catch (error) {
        console.error(`ERROR! ${error}`);
        setisLoad(false);
      }
    };

    fetchItem();
  }, []);
  return (

    <>{/* Jumbotron/hero section */}
      <div className=" jumbotron">
        <div className="container">
          <h1 className="display-4">Welcome to Our Body & Skin Care Company</h1>
          <p className="lead">Discover our high-quality products designed to enhance your beauty.</p>
          <Link className="btn btn-lg" to="/products" role="button" >Explore Products</Link>
        </div>
      </div>
      <div className="container">
        <h1 className=" m-4">Latest Products</h1>
        {
          isLoad ? (<p>Loading...</p>) : (
            <div className="row row-cols-1 row-cols-md-4 g-4 m-2">
              {
                itemsData.map((item, index) => (
                  <div key={index} className="col mb-4">
                    <div className="card h-100">
                      <div className="square-wrapper" style={{ position: 'relative', width: '100%', paddingTop: '100%' }}>
                        <img src={`${import.meta.env.VITE_API_URL.replace('/api', '')}/uploads/${item.thumbnail}`} style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', objectFit: 'cover' }} className="card-img-top" alt="Product Image" />
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

    </>
  )
}

export default Home