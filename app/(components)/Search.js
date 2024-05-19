"use client"
import {useState} from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Search() {
    const router = useRouter()
    const [query, setQuery] = useState('')

   const handleOnSearch = async (e) => {
     e.preventDefault()
      router.push(`/search?q=${encodeURIComponent(query)}`);
   }

   const isInputEmpty = () => {
       return query.trim().length === 0
   }

  return (
    <>
    <form className='flex w-full justify-center items-center text-black'>
    <Input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
    <Button variant="secondary"
     className='btn'
     disabled={isInputEmpty()}
     type="submit" onClick={handleOnSearch}>Search</Button>
    </form>

    </>
  )
}
