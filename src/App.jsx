import React from 'react'
import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberallowed]=useState(false)
  const [charAllowed,setCharallowed]=useState(false)
  const [password,setPassword]=useState("")
//ref hook
  const passwordRef=useRef(null)

  const passwordGenereator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz";
    if(numberAllowed) str+="0123456789";
    if(charAllowed) str+="!@#$%^&*(){}[]_";

    for(let i=1;i<=length;i++){
        let char=Math.floor(Math.random()*str.length+1);
        pass += str.charAt(char);
        
    }
    setPassword(pass);

  },[length,numberAllowed,charAllowed,setPassword]);

  const copyPasswordToClipboard = useCallback (()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenereator()
  },[length,passwordGenereator,numberAllowed,charAllowed])
  return (
    <>
     
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-600 bg-gray-700'>
      <h1 className='text-2xl text-center'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input type="text"
              value={password}
              className='outline-none  w-full py-1 px-3'
              placeholder='password'
              readOnly
              ref={passwordRef}
              id='navigator'
            />
          <button  onClick={copyPasswordToClipboard()} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
            copy
          </button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type="range"
                min={8}
                max={100}
                value={length}
                className='cursor-pointer'
                onChange={(e)=>{setLength(e.target.value)}}
              />
              <label>Length:{length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
                <input type="checkbox"
                      defaultChecked={numberAllowed}
                      id='numberInput'
                      onChange={()=>{
                        setNumberallowed((prev)=>!prev);
                      }}
                />
                <label>Number</label>
            </div>
            <div className='flex items-center gap-x-1'>
                <input type="checkbox"
                      defaultChecked={numberAllowed}
                      id='charInput'
                      onChange={()=>{
                        setCharallowed((prev)=>!prev);
                      }}
                />
                <label>Characters</label>
            </div>
          </div>
      
     </div>

    </>
  )
}

export default App