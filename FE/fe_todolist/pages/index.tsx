import { DragEvent, useCallback, useEffect, useState } from "react";
import { calculateWeekDates } from "./helpers/_utility";
import { format } from "date-fns";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import ModalBox from "./components/ModalBox";
import axios from "axios";

type dates = {
  startDate: Date | "",
  endDate: Date | "",
};

interface Task  {
  id:number,
  title:string,
  description:string,
  date:string | Date
}

export default function Home() {
  const [weekStartDate, setWeekStartDate] = useState<Date>(new Date());
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [data, setData] = useState<Task[]>([]);
  const [dates,setDates] = useState<dates>({
    startDate:"",
    endDate:""
  })
  
  useEffect(() => {
    updateWeekDates(weekStartDate);
  }, [weekStartDate]);

  useEffect(()=>{
    if(!dates.startDate && !dates.endDate) return
    getScheduleList()
  },[dates])

  const getScheduleList = () =>{
    axios.post("http://localhost:8080/todolist/getScheduleCalender",dates)
    .then((res)=>{
      const result = res.data
      setData(result)
    })
    .catch((err)=>console.log(err))
  }

  const updatedScheduleList = async(id: string,rescheduleDate: string) =>{
    const formattedDate = new Date(rescheduleDate).toISOString();

    await axios.put(  `http://localhost:8080/todolist/rescheduleCalendar/${Number(id)}`, {
      date: formattedDate
    })
    .then((res: any)=>{
      const result = res.data
      setData(result)
    })
    .catch((err: any)=>console.log(err))

  }

  const updateWeekDates = useCallback((startDate: Date) => {
    const { startDate: weekstartDate, endDate: weekEndDate } = calculateWeekDates(startDate);
    const dates: Date[] = [];
    const currentDate = new Date(weekstartDate);

    while (currentDate <= weekEndDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setWeekDates(dates);
    setDates({
      startDate:weekstartDate,
      endDate:weekEndDate
    })
  },[]);

  const handleWeekChange = (days: number) => {
    setWeekStartDate(
      (prevDate) => new Date(prevDate.setDate(prevDate.getDate() + days))
    );
  };  

  const onDragElement = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.add("opacity-50");
      const id : string | null = e.currentTarget.getAttribute("data-id");
    if(id == null) return 
    e.dataTransfer.setData("text/plain", id);
  };

  const onDragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if(e.currentTarget.classList.contains("w-full")){
      e.currentTarget.classList.add("add-scale")
    }
  };

  const onDragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if(e.currentTarget.classList.contains("w-full")){
      e.currentTarget.classList.remove("add-scale");
    }
  };

  const onDragDropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedElementId = e.dataTransfer.getData("text/plain");
    const dateInput: string | null = e.currentTarget?.getAttribute("data-id");

    if (!draggedElementId || !dateInput) return; 
    updatedScheduleList(draggedElementId,dateInput)
    // const formattedDate = format(new Date(dateInput), "yyyy-MM-dd");

    // const updatedData = data.map((task) =>
    //   task.id === Number(draggedElementId)
    //     ? { ...task, date: formattedDate }
    //     : task
    // );
    e.currentTarget.classList.remove("add-scale")
    // setData(updatedData);
  };

  const onDragEndHandler = (e: DragEvent<HTMLDivElement>) =>{
    e.currentTarget.classList.remove("opacity-50")
  }

  return (
    <div>
      <div className="bg-slate-400 text-center py-5">
        <h2 className="text-2xl tracking-wide">Todo List</h2>
      </div>

      <div className="flex justify-end items-center px-10 py-3 cursor-pointer">
        <IoIosArrowDropleft size={50} onClick={() => handleWeekChange(-3)} className="hover:text-slate-500"/>
        <IoIosArrowDropright size={50} onClick={() => handleWeekChange(+3)} className="hover:text-slate-500" />
        <span className="px-4">
          <ModalBox/>
        </span>
      </div>

      <div className="container mx-auto my-5"  onDrop={onDragDropHandler}>
        <div className="grid grid-cols-6 gap-4">
          {weekDates.map((currentDate, key) => {
            return (
              <div
                className="h-[500px] bg-slate-300 w-full overflow-auto"
                key={key}
                data-id={currentDate}
                onDragOver={onDragOverHandler}
                onDragLeave={onDragLeaveHandler}
                onDrop={onDragDropHandler}
              >
                <span className="w-full bg-primary block text-center py-2">
                  {`${format(currentDate, "PP")} - ${format(
                    currentDate,
                    "EEE"
                  )}`}
                </span>

                {

                data
                  .filter((userData: Task) => format(new Date(userData.date), "yyyy-MM-dd") == format(new Date(currentDate), "yyyy-MM-dd"))
                  .map((scheduleItem: Task, index: number) => {
                    return (
                      <div
                        key={key}
                        className="bg-secondary p-2 rounded-lg m-2 hover:cursor-grab hover:bg-blue-800"
                        draggable
                        data-id={scheduleItem.id}
                        onDragStart={onDragElement}
                        onDragEnd={(e)=>onDragEndHandler(e)}
                      >
                        <h2 key={index} className="text-white">{scheduleItem.title}</h2>
                        <h5 key={index} className="text-white">{scheduleItem.description}</h5>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
