import { useEffect,useState } from 'react'

import './App.css'
import { Details } from './components/details';
import { inject } from '@vercel/analytics';
  
function App() {
  inject()
  type Dummy ={ 
    Name :string[],
    LastName: string[],
    Email: string[]
  }
  
  const [Fetchresponse, SetFetch] = useState<Dummy | null>(() => {
    const response = localStorage.getItem("response");
    return response ? JSON.parse(response) : null;

  });
  const fetchData = async () =>{
    try{
      // const data = await fetch("http://localhost:8080/user/1?limit=5",{
      const data = await fetch("https://gorest.up.railway.app/user/1?limit=5",{
        method: "GET"
      })
      console.log(data)
      const response = await data.json()
      SetFetch(response)
      localStorage.setItem("response",JSON.stringify(response))
      console.log(Fetchresponse)
      
    }catch(err){
      console.log("Error on Get Request",err)
    }
     
  }
  
  const UserApi = [
    "API query '?limit': if set to ?limit=0 will default to return all values.",
    "There are 3 pages that can be sifted through.",
    "All responses are random every time."
  ];
  const FunFactApi = [
    "funfacts/1?limit=0: limit set to 0 then 50 will be sent, needs a limit",
    "There are 2 pages that can be sifted through",
    "Random By Default",
]
useEffect(() => {
  const item = localStorage.getItem("response");
  if (item === null || item === undefined) {
    fetchData();
  } else {
    SetFetch(JSON.parse(item));
    // Update your state or do something with the item from localStorage
  }
}, []);

  if (!Fetchresponse) {
    return <div className='flex justify-center mt-5'>Loading...</div>;
  }

  
  return (
    <div>
      {/* <Nav /> */}
      
      <div className="flex justify-between items-center px-4 pt-4">
  <img src="/DummyGocrop2.png" alt="GoLogo" className=" w-24" />
  <a href="https://github.com/soleq1/GoApi-Frontend">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 fill-white text-gray-800" viewBox="0 0 16 16">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
    </svg>
  </a>
</div>


      <div className="mt-5 flex flex-col items-center">
        <pre className="text-3xl font-bold mb-4">Users Api</pre>
        <div className="bg-gray-800 text-white p-4 rounded-md font-mono text-sm mb-4">
          <pre>
            <code>
              {`$ await fetch("https://gorest.up.railway.app/user/1?limit=5")\n`}
              {`  .then(response => response.json())\n`}
              {`  .then(data => console.log(data));`}
            </code>
          </pre>
        </div>
        <div className="bg-gray-200 text-black p-4 rounded-md font-mono text-sm  max-w-2xl">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-bold">Response Example: (random)</h1>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={fetchData}
            >
              Refresh
            </button>
          </div>
          <pre>
            <code>
              {JSON.stringify(Fetchresponse, null, 2)}
            </code>
          </pre>
        </div>
        

          <Details input={UserApi}/>
        
      </div>
    <div>
      <div className='flex flex-col items-center my-2'>
      <pre className="text-3xl font-bold mb-4">Fun Facts Api</pre>

      <div className="bg-gray-800 text-white p-4 rounded-md font-mono text-sm mb-4">
        <pre>
          <code>{`const response = await fetch("https://gorest.up.railway.app/funfacts/1?limit=2")`}</code>
        </pre>
</div>
      <div className=" bg-gray-200 text-black p-4 rounded-md font-mono text-sm ">
      <pre>
      <h1 className="text-xl font-bold mb-2">Response Example:</h1>   
    <code>
      
      {`[{
    "id": 1,
    "fact": "A sneeze travels about 100 miles per hour."
  },
  {
    "id": 2,
    "fact": "Rubber bands last longer when refrigerated."
  },]`}
    </code>
  </pre>
      </div>
      <Details input={FunFactApi} />
    </div>
      </div>

      <div className='flex justify-center m-2'>
        <a className='bg-gray-800 p-2 rounded-md font-mono text-sm ' href='https://github.com/soleq1/'>Built By Edward</a>
      </div>
    </div>

    
  );
}

export default App
