"use client"

import { listReducer } from "@/reducers/listReducer";
import { useReducer, useState } from "react";


const Page = () => {
  const [list, dispatch] = useReducer(listReducer, []);
  const [inputValue, setInputValue] = useState('')


  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value)
  }

  function handleAddTask() {
    if(inputValue.trim() !== '') {
      dispatch({
        type: 'add',
        payload: {
          text: inputValue
        }
      })
      setInputValue('')
    } else {
      alert('Preencha a tarefa.')
    }
  }

  function handleToggleAction(id: number) {
    dispatch({
      type: 'toggleDone',
      payload: {
        id,
      }
    })
  }

  function handleEditTask(id: number) {
    const newEditedText = window.prompt('Digite aqui o novo texto')

    if(newEditedText) {
      dispatch({
        type: 'editText',
        payload: {
          id,
          newText: newEditedText,
        },
      })
    }
  }

  function handleDeleteTask(id: number) {
    dispatch({
      type: 'remove',
      payload: {
        id,
      },
    })
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center px-5">
        <h1 className="text-center mt-5 text-3xl font-bold">Lista de Tarefas</h1>
        
        <div className="flex justify-center items-center max-w-full flex-wrap mt-8 gap-3">
          <input 
            type="text" 
            placeholder="Digite um item"
            className="border border-transparent rounded p-2 h-10 text-black flex-1 focus:outline-none"
            value={inputValue}
            onChange={handleInputChange}
          />
          
          <button 
            className="bg-blue-400 p-2 rounded h-10 uppercase flex-1 max-w-full hover:bg-blue-500"
            onClick={handleAddTask}
          >
            Adicionar
          </button>
        </div>
        {list.map((item, key) => (
          <div key={key} className="flex justify-between max-w-full">
            <div className="flex items-center justify-between flex-wrap gap-3 container w-screen pb-2 mt-6 border-b border-gray-500 lg:max-w-5xl">
              <ul className="flex items-center">
                  <input
                    type="checkbox" 
                    checked={item.done} 
                    onClick={() => handleToggleAction(item.id)}
                    className="w-6 h-6 mr-5"
                  />
                  <li className={`${item.done ? 'text-green-400' : 'text-red-400'}`}>{item.text}</li>
              </ul>
              <div className="flex items-center gap-5">
                <button 
                  className="bg-orange-400 py-1 px-4 rounded hover:bg-orange-500"
                  onClick={() => handleEditTask(item.id)}
                >
                  Editar
                </button>
                <button 
                  className="bg-red-600 py-1 px-4 rounded hover:bg-red-700"
                  onClick={() => handleDeleteTask(item.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;