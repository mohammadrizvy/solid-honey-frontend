
import React from 'react'
import { dashboardCard, products } from './data'
import ProductsTables from '../../components/dashboard/ProductsTables'



const DashboardPage = () => {
  return (
    <div>
      <div className='grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {dashboardCard.map((card, index) => (
          <div key={index} className="bg-black/70 p-6 rounded-lg">
              <div className="flex flex-row space-x-4 items-center">
                  <div id="stats-1">
                    {card?.icon && <card.icon size={35} className='text-honey' />}
                  </div>
                  <div>
                    <p className="text-honey text-sm font-medium uppercase leading-4">{card?.title}</p>
                    <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                        <span>{card?.value}</span>

                        
                        
                    </p>
                    <span className='text-xs text-honey ml-2'>This months</span>
                </div>
            </div>
          </div>
        ))}
      </div>


      {/* last 5 products */}
      <div>
        <h1 className='text-2xl text-gray-50 mt-8'>শেষ 5 পণ্য বিক্রি</h1>

        <ProductsTables type="SELL" products={products?.filter((_, i) => i < 5)} />
      </div>


      {/* last 5 return products and buy products */}
      <div className='grid md:grid-cols-2 grid-cols gap-3'>
        <div className='px-5 py-2 bg-black/60 mt-8 rounded-md text-honey'>
          <h1 className='text-xl text-gray-50 py-3'>শেষ 5 রিটার্ন পণ্য</h1>

          <ProductsTables type="RETURN" products={products?.filter((_, i) => i < 5)} />
        </div>
        



        <div className='px-5 py-2 bg-black/60 mt-8 rounded-md text-honey'>
          <h1 className='text-xl text-gray-50 py-3'>শেষ 5 ক্রয় পণ্য</h1>

          <ProductsTables type="BUY" products={products?.filter((_, i) => i < 5)} />
        </div>
      </div>


     
    </div>
  )
}

export default DashboardPage
