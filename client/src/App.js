import axios from 'axios';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { FaEdit, FaTrash,FaPlus } from 'react-icons/fa';


function App() {
  const [addCount, setAddCount] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [items, setItems] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://react-api-two-chi.vercel.app/api/count');
      const data = response.data;
      setAddCount(data.addCount);
      setItems(data.data);
      setUpdateCount(data.updateCount);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (values) => {
    const {title,description}=values
    try {
      const response = await axios.post('https://react-api-two-chi.vercel.app/api/add', {
        title,
        description,
      });
      const data = await response.json();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };
const handleEdit=(items)=>{
  setSelectedComponent(items)
}


  const handleUpdate = async (values) => {
    const { title, description } = values;
  
    try {
      const response = await axios.put(
        `https://react-api-two-chi.vercel.app/api/update/${selectedComponent._id}`,
        {
          title,
          description,
        }
      );
  
      const data = response.data;
      setUpdateCount(data.updateCount);
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async (id) => {
  
    try {
      const response = await axios.delete(
        `https://react-api-two-chi.vercel.app/api/delete/${id}`,
        {
        }
      );
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  return (
    <div className="flex min-[320px]:flex-col sm:flex-col md:flex-col lg:flex-row h-100  text-sm mx-auto font-poppins p-8 rounded h-[100vh]   justify-center items-center ">
    <Formik
    enableReinitialize
      initialValues={ selectedComponent
        ? { title: selectedComponent.title, description: selectedComponent.description }
        : { title: '', description: '' }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (selectedComponent) {
          // Editing existing component
          handleUpdate(values)
            .then(() => {
              setSubmitting(false); // Set submitting to false
              setSelectedComponent(null)
              resetForm(); // Reset the form after successful submission
              fetchData();
            })
            .catch((error) => {
              console.error('Error updating data:', error);
              setSubmitting(false); // Set submitting to false in case of an error
            });
        } else {
          // Adding a new component
          handleAdd(values)
            .then(() => {
              setSubmitting(false); // Set submitting to false
              resetForm(); // Reset the form after successful submission
              fetchData(); // Refresh data
            })
            .catch((error) => {
              console.error('Error adding data:', error);
              setSubmitting(false); // Set submitting to false in case of an error
            });
        }
        
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => ( 
        <Form className='p-8  min-h-[26rem]  bg-green-200 w-500'  >
         <button onClick={(e)=>{
          e.preventDefault();
          setSelectedComponent(null);
         }} className="bg-blue-500 text-white px-4 py-2 rounded ml-auto flex items-center">
  <FaPlus className="mr-1" /> New
</button>

          <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-semibold mb-2">Title:</label>
            <Field
              type="text"
              id="title"
              name="title"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage name="title" component="div" className="text-red-500 mt-1" />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-lg font-semibold mb-2">Description:</label>
            <Field
              as="textarea"
              id="description"
              name="description"
              className="w-full p-2 border rounded"
            />
            <ErrorMessage name="description" component="div" className="text-red-500 mt-1" />
          </div>

          <div className="flex space-x-4">
            <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded">
             {selectedComponent? 'Edit' :'Add'} 
            </button>
          </div>
        </Form>
      )}
    </Formik>
    <div  className="md:mt-4 min-[320px]:mt-4 sm:mt-4  lg:ml-4 lg:mt-0 w-50 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 p-8 min-h-[26rem]  min-w-[20rem]">
      <h3 className="text-xl font-semibold mb-2">API Call Counts:</h3>
      <p>Add Count: {addCount}</p>
      <p>Update Count: {updateCount}</p>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 ">Added Items</h3>
        {!items || items.length === 0 ? (
  <div>No items added</div>
) : (
      <div className='overflow-x-auto overflow-y-auto max-w-[24rem]  max-h-[12.6rem]  scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200'>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
)}
      </div>
  
    </div>
  
  </div>
  );
}

export default App;
