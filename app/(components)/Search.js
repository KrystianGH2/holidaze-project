"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { addDays, format } from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function Search({className}) {
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 1),
  })

   const handleOnSearch = async (e) => {
     e.preventDefault()
      router.push(`/search?q=${encodeURIComponent(query)}`);
   }

   const isInputEmpty = () => {
       return query.trim().length === 0
   }

  return (
    <>
      <form className='flex w-full justify-center items-center text-black max-w-7xl lg:px-6'>
        <section className='flex flex-row w-full justify-center items-center gap-1 p-2'>

       
        <div className='flex w-full max-w-xl'>
          <Input placeholder="Search your destination..." 
           type="text" value={query}
            onChange={(e) => setQuery(e.target.value)} 
            className="h-[45px] focus:outline-none"
            
            />
        </div>

          <div className={cn("grid gap-2 w-full ", className)}>
            <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"secondary"}
            className={cn(
              " w-full  flex  justify-start text-left font-normal h-[45px]",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
            </Popover>
          </div>
        <Button 
          variant="secondary"
          className='btn disabled:bg-white  w-full max-w-[300px] min-h-[45px] text-black'
          disabled={isInputEmpty()}
          type="submit" onClick={handleOnSearch}>Search</Button>
 </section>
      </form>
    </>
  )
}
