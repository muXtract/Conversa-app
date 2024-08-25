import React from 'react'
//props passed at the child component 
//destructured props 
const GenderCheckbox = ({onCheckboxChange, selectedGender}) => {
  return (
    <div className='flex mt-2'>
        <div className='form-control'>
            <label className={`label gap-2  cursor-pointer    ${selectedGender==="male"?"selected":"" }  `     }  >
                <span className='label-text text-white hover:text-green-600'>Male</span>
                <input onChange={()=>onCheckboxChange("male")} checked={selectedGender==="male"}   type='checkbox'  className='checkbox border-slate-50'  ></input>
            </label>
        </div>
        <div className='form-control'>
            <label className={`label gap-2 cursor-pointer  ${selectedGender==="female"?"selected":"" } `}>
                <span className='label-text text-white  hover:text-green-600'>Female</span>
                <input   onChange={()=>onCheckboxChange("female")} checked={selectedGender==="female"} type='checkbox' className='checkbox border-slate-50'  ></input>
            </label>
        </div>
      
    </div>
  )
}

export default GenderCheckbox
