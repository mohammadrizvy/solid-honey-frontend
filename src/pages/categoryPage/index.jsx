import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table"
import { Delete, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesList } from '../../redux/actions/categoriesSlice'
import { POST_CATEGORY, POST_SUB_CATEGORY } from '../../../axios'
import toast, { Toaster } from 'react-hot-toast'


const CaregoryPage = () => {
  const dispatch = useDispatch()
  const {categories} = useSelector(state => state?.category)

  const [category, setCategory] = useState('')
  const [sub_category, setSub_category] = useState('')
  const [category_id, setCategory_id] = useState(categories[0]?.id || '')
  



  useEffect(() => {
    dispatch(getCategoriesList())
  }, [dispatch])


  const categorySubmitHandle = (e, type_handler) => {
    e.preventDefault()

    if (type_handler === "c") {

      if (!category.trim()) return toast.error("Category is Empty")

      POST_CATEGORY({category}, (err, data) => {
        if (err) return console.log(err);

        setCategory("")
        dispatch(getCategoriesList())
        return toast.success(data?.message)
      })

    }

    if (type_handler === "sc") {

      if (!category_id.trim()) return toast.error("Please select an category");
      if (!sub_category.trim()) return toast.error("Sub category is Empty");
      POST_SUB_CATEGORY({category_id, sub_category}, (err, data) => {
        if (err) return console.log(err);

        setSub_category("")
        dispatch(getCategoriesList())
        return toast.success(data?.message)
      })
    }

  }




  return (
    <>
    <Toaster />
    <div className='grid md:grid-cols-2 grid-cols gap-8'>
      <div className='bg-muted p-8 rounded-md'>
        <h1 className='text-xl font-bold mb-4'>Add Category</h1>
        
        <form onSubmit={e => categorySubmitHandle(e, "c")}>
          <div className="flex flex-col items-start gap-2">
          <Label htmlFor="category_name" className="text-right">
            Category Name
          </Label>
          <Input
            value={category}
            onChange={e => setCategory(e.target.value)}
            name="category_name"
            id="category_name"
            
            className="col-span-3"
          />
          </div>

          <Button type="submit" className="mt-4" >Save</Button>
        </form>
      </div>

      <form onSubmit={e => categorySubmitHandle(e, "sc")} className='bg-muted p-8 rounded-md'>
        <h1 className='text-xl font-bold mb-4'>Add Sub-Category</h1>


        <div className="flex flex-col items-start gap-2 mb-4">
          <Label htmlFor="sub_category_name" className="text-right">
            Choose an category
          </Label>
          
          <select onChange={(e) => setCategory_id(e.target.value)} className='w-full py-2 px-2' name="" id="">
            <option>Select ...</option>
            {categories?.map((c, i) => (
              <option key={i} value={c?.id}>{c?.category}</option>
            ))}
          </select>
        </div>



        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="sub_category_name" className="text-right">
            Sub-Category Name
          </Label>
          <Input
            value={sub_category}
            onChange={e => setSub_category(e.target.value)}
            name="sub_category_name"
            id="sub_category_name"
            
            className="col-span-3"
          />
        </div>


        <Button className="mt-4" >Save</Button>

      </form>
    </div>


    <div className='bg-muted p-4 rounded-md'>

      <h1 className='text-xl font-bold my-4'>Category List</h1>

    <Table>
        <TableHeader>   
            <TableRow>
            <TableHead className="text-honey">Category</TableHead>
            <TableHead className="text-honey">Sub-Category</TableHead>
            {/* <TableHead className="text-honey text-right">Action</TableHead> */}
            </TableRow>
        </TableHeader>
        <TableBody>
            {
              categories?.filter(c => c?.subcategories?.length > 0)?.map((c, i) => {

                return (
                  <TableRow key={i} className="hover:bg-honey hover:text-muted">
                    <TableCell className="font-medium">{c?.category}</TableCell>
                    <TableCell>
                      {c?.subcategories?.map((sc, i) => (
                        sc?.product_sub_category + " , "
                      ))}
                    </TableCell>
                    {/* <TableCell className="text-right">
                      <Trash className='inline shadow-md bg-muted text-red-500 p-2 rounded-full hover:bg-red-500 duration-200 hover:text-muted cursor-pointer' size={40} />
                    </TableCell> */}

                  </TableRow>
                )
              })
            }
        </TableBody>

    </Table>
    </div>



    </>
  )
}

export default CaregoryPage
