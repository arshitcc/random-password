import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialAllowed, setSpecialAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // const randomPassword = useCallback( fn , dependencies);
  // It's a memoization concept where if any dependency is changed then only function's value is stored in cache.

  const randomPassword = useCallback(() => {
      let myPassword = "";
      let passwordBox = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if (numberAllowed) passwordBox += "0123456789";
      if (specialAllowed) passwordBox += "~`!@#$%^&*()_+-={}[]/.,<>?;:'|";

      while (myPassword.length < length) {
        myPassword += passwordBox[Math.floor(Math.random() * passwordBox.length)];
      }

      setPassword(myPassword);
    },[length, numberAllowed, specialAllowed, setPassword]);

  const passwordRef = useRef(null);

  const copyPassword = useCallback(() => {

    // Optional Selection is like Ternary Operator

    passwordRef.current?.select();
    // selects whole value with a blue filter, but not copies them. Just for UI

    passwordRef.current?.setSelectionRange(0, length);
    // shows that it has copied only that specific length. Just for UI

    window.navigator.clipboard.writeText(password);
  }, [password])

  // useEffect Hooke is mainly responsible for calling function whenever there is change in any dependency
  useEffect(() => {
    randomPassword();
  }, [length, numberAllowed, specialAllowed, randomPassword]);

  return (
    <>

      <div className='max-w-screen-md mx-auto my-6 p-4 rounded-2xl text-orange-600 bg-gray-700'>
        <h1 className='text-4xl text-center text-wrap text-orange-500 font-bold'>Password Generator</h1>
        <div className='overflow-hidden mt-4 flex flex-wrap gap-4 sm:gap-0 justify-center'>
          <input
            className='w-4/5 outline-none rounded-xl sm:rounded-l-xl sm:rounded-r-none p-4 placeholder:text-xl placeholder:text-slate-800'
            value={password}
            placeholder='Password'
            type="text"
            readOnly
            ref={passwordRef}
          />
          <button
            className='bg-green-600 rounded-xl sm:rounded-r-xl sm:rounded-l-none px-4 py-2 text-xl text-white'
            onClick={copyPassword}>Copy</button>
        </div>

        <div className='flex flex-wrap justify-between items-center px-8 mt-4 overflow-hidden'>

          <div className='flex gap-4'>
            <input
              className='cursor-pointer w-[150px]'
              id='passwordLength'
              type="range"
              min={6}
              max={50}
              value={length}
              onChange={(evt) => setLength(evt.target.value)} />
            <label className='text-xl font-semibold' htmlFor="passwordLength">Length ({length}) </label>
          </div>

          <div className='flex gap-x-2'>
            <input
              className='cursor-pointer h-6 w-6'
              id='numberAllowed'
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }} />
            <label className='text-xl font-semibold' htmlFor="numberAllowed">Numbers</label>
          </div>

          <div className='flex gap-x-2'>
            <input
              className='cursor-pointer h-6 w-6'
              id='specialAllowed'
              type="checkbox"
              defaultChecked={specialAllowed}
              onChange={() => {
                setSpecialAllowed((prev) => !prev);
              }} />
            <label className='text-xl font-semibold' htmlFor="specialAllowed">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
