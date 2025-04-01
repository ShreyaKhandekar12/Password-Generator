import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed]=useState(false);
  const [charAllowed, setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() =>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed){
      str+="0123456789";
    }
    if(charAllowed){
      str+="!@#$%^&*()_+-=~`?/\|<>.,:;{}[]";
    }
    for(let i=0;i<length;i++){
      pass+=str.charAt(Math.floor(Math.random()*str.length));
    }
    setPassword(pass);
  },[length,numberAllowed,charAllowed]);

  const copyPassword = useCallback(()=> {
    passwordRef.current.select();
    passwordRef.current.setselectionRange(0,password.length);
    window.navigator.clipboard.writeText(password)
  },[password]);

  useEffect(()=>{
    passwordGenerator();
  },[numberAllowed,charAllowed,length,passwordGenerator])

  return (
    <>
    <div className="bg-gray-700 text-orange-500 my-8 p-6 rounded-lg text-center">
      <h2 className="text-white text-xl font-semibold mb-4">Password Generator</h2>
      <div className="flex items-center bg-white p-2 rounded-lg shadow-md">
        <input 
          type="text" 
          value={password} 
          className="w-full text-black px-3 py-2 outline-none rounded-lg" 
          placeholder="password" 
          readOnly 
        />
        <button 
      className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition" onClick={copyPassword}>
        Copy
      </button>
      </div>
      <div className="mt-6">
      <input 
    type="range" 
    min={8} 
    max={50} 
    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-orange-500"
    value={length}
    onChange={(e) => setLength(e.target.value)}
    ref={passwordRef}
  />
  <label className="text-white font-semibold text-lg">Length: {length}</label>
  </div>


  <div className="mt-4 flex items-center gap-20">

  <div className="mt-4 flex items-center gap-3">
  <input 
    type="checkbox" 
    defaultChecked={numberAllowed} 
    id="numberInput" 
    onChange={() => setNumberAllowed((prev) => !prev)} 
    className="w-5 h-5 accent-orange-500 cursor-pointer"
  />
  <label htmlFor="numberInput" className="text-white font-semibold text-lg">Numbers</label>
  </div>


  <div className="mt-4 flex items-center gap-3">
  <input 
    type="checkbox" 
    defaultChecked={charAllowed} 
    id="charInput" 
    onChange={() => setCharAllowed((prev) => !prev)} 
    className="w-5 h-5 accent-orange-500 cursor-pointer"
  />
  <label htmlFor="charInput" className="text-white font-semibold text-lg">Characters</label>
  </div>



  </div>

    </div>
    </>
  )
}

export default App
