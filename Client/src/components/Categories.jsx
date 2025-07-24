import React from 'react'
import { assets, categories } from '../assets/assets'
import { useAppcontext } from '../context/Appcontext' 

function Categories() {

const {navigate} = useAppcontext()

  return (
    <div className="px-5 md:px-16 py-10 bg-body dark:bg-body text-main">
  <p className="text-3xl font-semibold mb-6 text-color-primary">Categories</p>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1">
    {categories.map((category, index) =>(

        <div key={index} className="w-24 h-24 flex flex-col items-center justify-center gap-1 bg-white dark:bg-surface shadow rounded-lg hover:shadow-md transition duration-300 cursor-pointer"
        style={{backgroundColor: category.bgColor}}
        onClick={()=>{
            navigate(`/products/${category.path.toLowerCase()} `);
            screenTop(0,0)

        }
        }
        >
             <img src={category.image} alt={category.text} className="w-12 h-12 object-contain" />
             <p className="text-xs font-medium !text-black">{category.text}</p>
          </div>

    ))}
  
  
</div>
</div>
  )
}

export default Categories