import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";


const Form = () => {

// localState
const [checkbox, setCheckBox] = useState(false)


  const { data: sectors } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/sectors')
      const data = res.json()
      return data
    },
  })

  const { data: userinfo, refetch } = useQuery({
    queryKey: ["userinfo"],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/usersinfo')
      const datas = res.json()
      return datas
    },
  })

  const handleSubmit=(e)=>{
    e.preventDefault()
     const form = e.target
     const name = form.name.value
     const sectors = form.sectors.value

    const userInfo ={
      userName: name,
      sectors: sectors,
    }

    fetch('http://localhost:5000/userdata', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          refetch()
           toast.success('Successfully Added data')   
        }
      })
  }
 
  // const handleEdit =(id)=>{
  //   fetch(`https://localhost:5000/userposition/${id}`, {
  //     method: 'PUT',
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.acknowledged) {
  //         toast.success('Post Edited Successfully')
  //         refetch()
  //       }
  //     })
  // }

  const handleDelete = (id) => {
    const agree = window.confirm("Do you sure you want to delete your details")

   if(agree){
    fetch(`http://localhost:5000/usersinfo/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.deletedCount > 0) {
          toast.success('successFully deleted user')
          refetch()
        }
      })
   }
     
  }


  return (
    <div className=''>
        {/*===Form section start====*/}

       <section className="flex flex-col items-center justify-center">
          <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
            <div className="text-lg font-bold pb-10 text-gray-800">
              <p>Please enter your name and pick the Sectors you are currently involved in.
            </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div>
                <label className="font-medium text-gray-800">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="bg-gray-100 border rounded focus:outline-none font-medium text-gray-800 py-3 w-full pl-3 mt-2"/>
                  </div>


              <div className="mt-6 w-full">
                <label className="font-medium  text-gray-800 ">
                Sectors
                </label>
                <br></br>
                <select name="sectors" 
 required className="input w-full input-bordered focus:outline-none font-medium text-gray-800 py-3 pl-3 mt-2">    
                                  
        {
        sectors?.map(item => <optgroup key={item._id} label={item.category}>
          {
            item.items?.map((e, id) => <option  value={e} key={id}>{e}</option>)
          }
     
      </optgroup>)
        }
            </select>
              </div>

            

              <div className='mt-4'>
                <input type="checkbox" onChange={()=>setCheckBox(!checkbox)} /><span className='pl-3'>Agree to terms</span>
              </div>
              

              <div className="mt-8">
                <button
                   disabled = {!checkbox }
                  type="submit"
                  className="btn border-none btn-info"
                >
                  Submit
                </button>

              </div>
            </form>
          </div>
        </section>
     {/* Form end */}


     {/* user Information section start*/}
     <section className='container mx-auto my-16'>
      <div className="overflow-x-auto">
  <table className="table w-full">
   
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Sectors</th>
        <th>Edit</th>
        <th>Delete</th>
        
      </tr>
    </thead>
    <tbody>
      {
        userinfo?.map((users, i) =>(
          <tr key={users._id}>
            <td>{i+1}</td>
            <td>{users.userName}</td>
            <td>{users.sectors}</td>
            <td className='text-green-700'><AiFillEdit/></td>
            <td onClick={()=>handleDelete(users._id)} className='text-red-800'><AiFillDelete/></td>

          </tr>
        ) )
      }
     
    </tbody>
  </table>
</div>
      


     </section>

      </div>
    
       
   
       

  )
}

export default Form
