import axios from 'axios'
import React, { useState,useEffect } from 'react'
import Isloading from '../../../components/Isloading'

function AddProduct({ setShow, selectedCategory,editProduct, deletedProductUpdated,addProductToSelectedCategory,addUpdatedProductsToArray }) {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [isloading, setIsLoading] = useState(false)

    useEffect(() => {
        if (editProduct) {
            setName(editProduct.name || '');
            setPrice(editProduct.price || '');
            setDescription(editProduct.description || '');
            setImage(editProduct.imageUrl || null);
        }
      }, [editProduct]);

    const handleAddProduct = async () => {
      if (editProduct && editProduct._id) {
        setIsLoading(true)
        
        const selectedCategoryId = selectedCategory._id
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('id',editProduct._id)
        
        if (typeof image === 'string') {
            formData.append('imageUrl', image);  // Pass existing image URL separately
          } else {
            formData.append('image', image); // Pass new image file
          }//http://localhost:3002
          const createProduct = await axios.put(`https://menuserver-eight.vercel.app/categories/${selectedCategoryId}/editProducts`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          })
          addUpdatedProductsToArray(createProduct.data.updated)
          setShow("edit")
      }else{
        setIsLoading(true)

      if (name.length == 0 || price.length == 0 || description.length == 0) {
        alert("empty")
        setIsLoading(false)
      }else{

        const selectedCategoryId = selectedCategory._id
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image);

        const createProduct = await axios.post(`http://localhost:3002/categories/${selectedCategoryId}/products`, formData, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        })
        addProductToSelectedCategory(createProduct.data.product)
        setShow("edit")
      }
      }
    };
    const deleteTheProduct = async () =>{
        console.log(editProduct)
        const deletedInDb = await axios.delete(`http://localhost:3002/api/${editProduct._id}/deletedProduct`)
        console.log(deletedInDb.data.deletedProduct)
        deletedProductUpdated(deletedInDb.data.deletedProduct)
        setShow("edit")
    }
    return (
        <>
            <div className="flex px-3 justify-center h-full items-center">

                <div className="w-full flex items-start flex-col h-full">
                    <button
                        onClick={() => setShow("edit")}
                        className="text-gray-500 text-xl mb-4"
                    >
                        &times;
                    </button>

                    {/* Title Input */}
                    <div className="flex flex-col gap-2 mb-4 w-full">
                        <label className="block text-gray-700">Product Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter category title"
                        />
                        <label className="block text-gray-700 ">Product Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter category title"
                        />
                        <label className="block text-gray-700 ">Product description</label>
                        <input
                            type='text'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter category title"
                        />

                        <label className="block text-gray-700">Product Image</label>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])} // Handle file selection
                            className="w-full border border-gray-300 p-2 rounded"
                        />

                    </div>
                    {/* Add Button */}

                    {editProduct&& <button
                    onClick={deleteTheProduct}
                    className='w-full bg-red-500 text-white p-2 mb-1  rounded-full'>Delete The Product</button>}
                    <button
                        onClick={handleAddProduct}
                        className="w-full bg-blue-500 text-white p-2  rounded-full"
                    >
                       {isloading?<Isloading width="w-6" height="h-6"/>:"Add Product"}
                    </button>
                </div>
            </div>
        </>)
}

export default AddProduct
