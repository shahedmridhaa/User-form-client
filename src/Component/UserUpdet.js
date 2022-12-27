import React from 'react';

const UserUpdet = ({sector, handleUpdet, userinfo}) => {
   



    return (
        <div>
            <div>
{/* <label htmlFor="updet-modal" className="btn">open modal</label> */}


<input type="checkbox" id="updet-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
    <label htmlFor="updet-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
   
   
    <form>
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
                <label className="font-medium text-gray-800 ">
                Sectors
                </label>
                <br></br>
                <select name="sectors" 
     required className="input w-full input-bordered focus:outline-none font-medium text-gray-800 py-3 pl-3 mt-2">    
                                  
        {
        sector?.map(item => <optgroup key={item._id} label={item.category}>
          {
            item.items?.map((e, id) => <option  value={e} key={id}>{e}</option>)
          }
     
      </optgroup>)
        }
            </select>
              </div>
              

              <div className="mt-8">
                <button
                  type="submit"
                  className="btn border-none btn-info"
                >
                  Updet
                </button>

              </div>
            </form>
  </div>
</div>
        </div>
        </div>
      
    );
};

export default UserUpdet;