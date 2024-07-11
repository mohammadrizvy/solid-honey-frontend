import React from 'react'

function MyAccountPage() {
  return (


    <div>
        <div className="p-4 rounded-xl">
            <div className="md:col-span-3 h-60 shadow-xl space-y-2 p-8 rounded-sm bg-muted/70">
                    <div className="flex ">
                        <span
                            className="text-sm font-bold uppercase rounded-l px-4 py-2 w-2/6" >Email:</span>
                        <input 
                            className="px-4 cursor-default focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6" placeholder='Enter Your Email'
                            type="text"/>
                    </div>
                    <div className="flex ">
                        <span
                            className="text-sm font-bold uppercase rounded-l px-4 py-2 w-2/6">Password:</span>
                        <input 
                            className="px-4 cursor-default focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6" placeholder='Enter Your Password'
                            type="password"  />
                    </div>
                    <div className="flex ">
                        <span
                            className="text-sm font-bold uppercase rounded-l px-4 py-2 w-2/6">Role:</span>
                        <input 
                            className="px-4 cursor-default focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6"
                            type="text" value="Admin (Not changable)"  readonly/>
                    </div>

                    <div className='text-right pt-5'>
                        <button className="px-6 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-red-400 hover:bg-honey active:bg-red-700 focus:ring-red-300" type="submit">Save</button>
                    </div>

                </div>
                
        </div>
    </div>
   


  )
}

export default MyAccountPage
