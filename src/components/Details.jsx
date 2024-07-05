// import React, { useState } from 'react';
// import { AiFillStar, AiOutlineHeart, AiOutlineSync, AiOutlineTruck } from 'react-icons/ai';
// import { Link, useLocation } from 'react-router-dom';
// import AllProducts from './AllProducts';
// import { useNavigate } from "react-router-dom";


// const Details = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const product = location.state.product;
//   const products = location.state.products;
//   const [selectedSize, setSelectedSize] = useState('');
//   const [quantity, setQuantity] = useState(1);


//   const handleSizeSelection = (size) => {
//     setSelectedSize(size);
//   };

//   const handleQuantityChange = (event) => {
//     setQuantity(parseInt(event.target.value));
//   };

//   const handleAddToCart = async (product) => {

//     const productDetail = { email: "", products: product };
//     const response = await fetch('https://fitness-server-u793.onrender.com/cart/buynow', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ productDetail }),
//     });

//     const paymentUrl = await response.text();
//     window.location.href = paymentUrl;
//   };

//   const handleWishlist = (product) => {

//   };

//   let filteredProducts = [];
//   filteredProducts = products.filter(prod => prod.category === product.category).slice(0, 5);

//   return (
//     <div className="bg-[#F8F8F3] flex flex-col">
//       <div className='px-16 py-8 flex flex-row pt-24'>
//         <Link to='/shop'>
//           <h1 className='text-gray-500'>Shop /</h1>
//         </Link>
//         <h1 className='px-1 text-gray-500'> Details / </h1>
//         <h1 className='px-1 font-semibold'>{product.Product_Name}</h1>
//       </div>
//       <div className='flex justify-center'>
//         <div className="flex justify-between w-full px-10">
//           {/* Product Image */}
//           <div className="w-1/2">
//             <img src={product.Product_Image} alt="Product" className="w-full border-2 border-black" />
//           </div>
//           {/* Product Details */}
//           <div className="w-1/2 px-20">
//             <h1 className="text-3xl font-bold mb-4">{product.Product_Name}</h1>
//             <h2 className="text-2xl font-semibold text-orange-500 mb-4">Rs.{product.Product_Price}</h2>
//             <div className="flex items-center mb-4">
//               <div className="flex gap-1">
//                 {[...Array(5)].map((_, index) => (
//                   <AiFillStar key={index} className="text-yellow-400" />
//                 ))}
//               </div>
//               <span className="text-gray-500 ml-2">({product.rating})</span>
//             </div>
//             <p className="text-gray-600 mb-4">{product.description}</p>
//             {/* Size Options */}
//             <div className="flex items-center mb-4">
//               <span className="mr-2">Size:</span>
//               {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
//                 <button
//                   key={size}
//                   className={`mx-1 px-2 py-1 border border-gray-300 rounded ${selectedSize === size ? 'bg-gray-200' : ''
//                     }`}
//                   onClick={() => handleSizeSelection(size)}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//             {/* Quantity Option */}
//             <div className="flex items-center mb-4">
//               <span className="mr-2">Quantity:</span>
//               <input
//                 type="number"
//                 min="1"
//                 value={quantity}
//                 onChange={handleQuantityChange}
//                 className="w-16 px-2 py-1 border border-gray-300 rounded"
//               />
//             </div>
//             <div className="flex flex-row gap-5">
//               {/* Add to Cart Button */}
//               <button
//                 onClick={() => handleAddToCart(product)}
//                 className="bg-orange-600 text-gray-50 py-2 px-4 rounded hover:bg-orange-800 hover:text-white"
//               >
//                 Buy Now
//               </button>
//               {/* Handle wishlist */}
//               <button onClick={() => handleWishlist(product)} className='flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full w-10 h-10'>
//                 <AiOutlineHeart className='text-red-500 text-2xl' />
//               </button>
//             </div>
//             <div className='py-10 flex flex-row gap-3'>
//               <div className='flex flex-row gap-2 p-2 border border-black'>
//                 <AiOutlineTruck className=' text-3xl' />
//                 <h1 className='text-xl font-bold'>Free Delivery</h1>
//               </div>
//               <div className='flex flex-row gap-2 p-2 border border-black'>
//                 <AiOutlineSync className=' text-3xl' />
//                 <h1 className='text-xl font-bold'>Free 30 Days Return</h1>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='p-10'>
//         <div className='flex flex-row items-center py-10'>
//           <span className='bg-orange-600 w-3 h-6 mr-3'></span>
//           <h1 className='text-xl font-semibold text-orange-600 '>Related Item</h1>
//         </div>
//         <div className='flex flex-wrap justify-left gap-7'>
//           {filteredProducts.map((product, index) => (
//             <ProductCard key={index} product={product} products={products} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProductCard = ({ product, products }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <Link to="/details" state={{ product: product, products: products }}>
//       <div
//         className='relative p-2 bg-white shadow-md'
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <img src={product.Product_Image} alt="Product Photo" className='w-52 h-52 border border-gray-300' />
//         {isHovered && (
//           <button className='absolute top-44 left-2 right-2 flex items-center justify-center bg-gray-200 opacity-90 font-bold text-black h-10'>
//             View Details
//           </button>
//         )}
//         <div className='p-2'>
//           <h1 className='font-bold'>{product.Product_Name}</h1>
//           <h1 className='text-sm text-gray-500'>{product.category}</h1>
//           <div className='flex items-center mt-2 gap-1'>
//             <h1 className='text-xs text-gray-400 line-through'>Rs.{product.Product_Price}</h1>
//             <h1 className='text-xs text-orange-400'>(Rs.{product.originalPrice - product.currentPrice} OFF)</h1>
//           </div>
//           <div className='flex items-center py-2'>
//             {[...Array(5)].map((_, index) => (
//               <h1 key={index} className='text-md text-yellow-400'><AiFillStar /></h1>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default Details;


import React, { useState } from 'react';
import { AiFillStar, AiOutlineHeart, AiOutlineSync, AiOutlineTruck } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, products } = location.state;

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSizeSelection = size => setSelectedSize(size);
  const handleQuantityChange = event => setQuantity(parseInt(event.target.value));
  const handleBuyNow = () => setShowForm(!showForm);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('https://fitness-server-u793.onrender.com/cart/buynow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, phone, address, product }),
    });
    if (response.ok) navigate('/shop');
  };

  let filteredProducts = products.filter(prod => prod.category === product.category).slice(0, 5);

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <div className='px-16 py-8 flex flex-row pt-24'>
          <Link to='/shop' className="text-gray-600 hover:text-gray-800 text-lg">
            <h1>Shop /</h1>
          </Link>
          <h1 className='px-1 text-gray-600'> Details / </h1>
          <h1 className='px-1 font-semibold text-gray-800'>{product.Product_Name}</h1>
        </div>
        {!showForm ? (
          <div className='flex flex-col items-center'>
            <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-lg">
              <div className="w-full md:w-1/2 p-4">
                <img src={product.Product_Image} alt="Product" className="max-w-full h-auto rounded-lg" />
              </div>
              <div className="w-full md:w-1/2 pl-4 md:pl-10">
                <h1 className="text-3xl font-bold mb-4">{product.Product_Name}</h1>
                <h2 className="text-2xl font-semibold text-orange-500 mb-4">Rs.{product.Product_Price}</h2>
                <div className="flex items-center mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, index) => (
                      <AiFillStar key={index} className="text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-gray-500 ml-2">({product.rating})</span>
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center mb-4">
                  <span className="mr-2">Size:</span>
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      className={`mx-1 px-2 py-1 border rounded ${selectedSize === size ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
                      onClick={() => handleSizeSelection(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <div className="flex items-center mb-4">
                  <span className="mr-2">Quantity:</span>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 px-2 py-1 border rounded"
                  />
                </div>
                <button
                  onClick={handleBuyNow}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition duration-200"
                >
                  Buy Now
                </button>
                <button className=' text-white py-4 px-4 rounded transition duration-200'>
                  <AiOutlineHeart className='text-red-500 text-2xl' />
                </button>
              </div>
              <div className='py-10 flex flex-col-reverse gap-3'>
                <div className='flex flex-col-reverse gap-2 p-2 border border-black'>
                  <AiOutlineTruck className=' text-3xl' />
                  <h1 className='text-xl font-bold'>Free Delivery</h1>
                </div>
                <div className='flex flex-row gap-2 p-2 border border-black'>
                  <AiOutlineSync className=' text-3xl' />
                  <h1 className='text-xl font-bold'>Free 30 Days Return</h1>
                </div>
              </div>
            </div>
            <div className='p-10'>
              <div className='flex flex-row items-center py-10'>
                <span className='bg-orange-600 w-3 h-6 mr-3'></span>
                <h1 className='text-xl font-semibold text-orange-600 '>Related Items</h1>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-7'>
                {filteredProducts.map((product, index) => (
                  <ProductCard key={index} product={product} products={products} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className='flex justify-center items-center min-h-screen'>

            <form onSubmit={handleSubmit} className="w-full max-w-lg p-5 bg-white shadow-lg rounded-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email Id
                  <input
                    type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-600 focus:border-orange-600" required
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                  <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-600 focus:border-orange-600" required
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Home Address
                  <input type="text" placeholder="Home Address" value={address} onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-600 focus:border-orange-600" required
                  />
                </label>
              </div>
              <button type="submit" className="w-full bg-orange-600 mt-4 text-white py-2 rounded-md hover:bg-orange-500">
                Submit
              </button>
            </form>
          </div>
        )}
      </div >
    </>
  );
};

const ProductCard = ({ product, products }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to="/details" state={{ product: product, products: products }}>
      <div
        className='relative p-2 bg-white shadow-md rounded-lg'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={product.Product_Image} alt="Product Photo" className='w-full h-52 border border-gray-300 rounded-t-lg' />
        {isHovered && (
          <button className='absolute bottom-0 left-0 right-0 flex items-center justify-center bg-gray-200 opacity-90 font-bold text-black h-10'>
            View Details
          </button>
        )}
        <div className='p-2'>
          <h1 className='font-bold'>{product.Product_Name}</h1>
          <h1 className='text-sm text-gray-500'>{product.category}</h1>
          <div className='flex items-center mt-2 gap-1'>
            <h1 className='text-xs text-gray-400 line-through'>Rs.{product.Product_Price}</h1>
            <h1 className='text-xs text-orange-400'>(Rs.{product.originalPrice - product.currentPrice} OFF)</h1>
          </div>
          <div className='flex items-center py-2'>
            {[...Array(5)].map((_, index) => (
              <h1 key={index} className='text-md text-yellow-400'><AiFillStar /></h1>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Details;