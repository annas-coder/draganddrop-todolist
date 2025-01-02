import axios from 'axios';
import React, { useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

interface Modal{
  updateDate : ()=>void
}

function ModalBox({updateDate}: Modal) {

  const closeM = useRef(null);

  const initialState = {
    title: '',
    description: '',
    date: new Date(),
  };

  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', state);
    createTodoList();
  };

  const createTodoList = () =>{

    const todoPayload = {
      ...state
    }

    axios.post("http://localhost:8080/todolist/createTodoItem",todoPayload)
    .then((res)=>{
      if(res.data){
        updateDate(res.data)
        closeM.current.click();
      }
    })
    .catch((error)=>console.log(error))
  } 

  return (
    <div>
      <label
        className="w-[50px] h-[50px] bg-primary hover:bg-slate-500 group flex rounded-2xl cursor-pointer"
        htmlFor="modal-2"
      >
        <FaPlus size={25} className="m-auto group-hover:text-white" />
      </label>
      <input className="modal-state" id="modal-2" type="checkbox" />

      <div className="modal w-screen">
        <label className="modal-overlay" htmlFor="modal-2"></label>
        <div className="modal-content flex flex-col gap-5 max-w-3xl">
          <label
            htmlFor="modal-2"
            ref={closeM}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">Schedule list</h2>
          <div className="text-end">
            <form onSubmit={handleSubmit}>
              <div className="relative float-label-input">
                <input
                  type="text"
                  name="title"
                  value={state.title}
                  onChange={handleChange}
                  placeholder=" "
                  className="block bg-white w-full focus:outline-none focus:shadow-outline border border-gray-500 rounded-md py-3 px-3 appearance-none leading-normal"
                />
                <label className="absolute top-3 mx-2 left-0 text-gray-500 pointer-events-none transition duration-200 ease-in-out bg-white px-2">
                  Title
                </label>
              </div>

              <div className="relative float-label-input">
                <input
                  type="text"
                  name="description"
                  value={state.description}
                  onChange={handleChange}
                  placeholder=" "
                  className="block bg-white w-full focus:outline-none focus:shadow-outline border border-gray-500 rounded-md py-3 px-3 appearance-none leading-normal"
                />
                <label className="absolute top-3 mx-2 left-0 text-gray-500 pointer-events-none transition duration-200 ease-in-out bg-white px-2">
                  Description
                </label>
              </div>

              <div className="relative float-label-input">
                <input
                  type="date"
                  name="date"
                  value={state.date}
                  onChange={handleChange}
                  placeholder=" "
                  className="block bg-white w-full focus:outline-none focus:shadow-outline border border-gray-500 rounded-md py-3 px-3 appearance-none leading-normal"
                />
                <label className="absolute top-3 mx-2 left-0 text-gray-500 pointer-events-none transition duration-200 ease-in-out bg-white px-2">
                  Date
                </label>
              </div>

              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalBox;
