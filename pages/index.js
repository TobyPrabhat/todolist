import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useContext } from "react"
import {CredentialsContext} from "./_app";
const handleError = async (response)=>{
  if(!response.ok){
    const {message} = await response.json();
    throw Error(message);
  }
  return response.json();
}
export default function Home() {
  const router = useRouter();
  // const [entry, setEntry] = useState("/");
    const [error, setError] = useState("");
    const [, setCredentails] = useContext(CredentialsContext)
    const checking = (e)=>{
      e.preventDefault();
      const usern = document.getElementById("UserName").value;
      const email = document.getElementById("email-address").value;
      const pass = document.getElementById("password").value;
      const ng = "@gmail.com"
      if(usern.length>0 && email.includes(ng) && pass.length>=8){
        fetch("http://localhost:3001/login", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          usern,
          email,
          pass
        })
      })
      .then((handleError))
      .then(()=>{
        setCredentails({
          usern,
          email,
          pass
        })
        router.replace("/usertodo");
      })
      .catch((error)=>{
        setError(error.message);
      })
      }
      else{
        if(usern.length==0){
          setError("Please Enter Your Username");
        }
        else if(!email.includes(ng)){
          setError("Email Should Contain @gmail.com");
        }
        else if(pass.length<8){
          setError("Password atleast Contains 8 digits");
        }
        else{
          setError("Please Enter Correct Credentials");
        }
      }
    }


    return (
      <div className="bg-gray-100 h-screen w-screen">
        <Head>
          <title>Todo List - Login</title>
          <meta content='Make Your Future Secure By Making Todo - List' />
        </Head>
        <div className="lg:flex h-full w-full">
          <div className="lg:w-3/5 sm:h-full bg-center h-3/4 bg-[url('/bg.jpg')] bg-cover">
            <h1 className='text-white font-bold text-2xl drop-shadow-2xl animate-pulse'>Todo <span className='text-yellow-200'>List</span></h1>
            <div className="flex flex-col w-2/3 mx-auto text-center mt-10 place-items-center">
              <h1 className="text-white font-bold text-4xl w-full mb-4 animate-transo">Todo List</h1>
              <p className="text-white font-bold text-1xl w-full mb-4 animate-opo ">Secure Your Future Plan Today By Creating Todo List!</p>
              <Link href="/registor"><button
                type="submit"
                className="group relative w-1/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
              >
                Registor Here
              </button></Link>
            </div>
            <div className='flex justify-between'>
            <img src="/football.png" className='w-1/6 animate-bounce'alt = "football"/>
            <img src="/football.png" className='w-1/6 animate-bounce'alt = "football"/></div>
            <div className='flex justify-between'>
            <img src="/football.png" className='w-1/6 animate-bounce'alt = "football"/>
            <img src="/football.png" className='w-1/6 animate-bounce'alt = "football"/></div>
            {/* <div className='flex justify-between'>
            <img src="/football.png" className='w-1/6' alt = "football"/>
            <img src="/football.png" className='w-1/6'alt = "football"/></div> */}
          </div>
          <div className='lg:w-2/5 sm:h-full bg-white h-3/4'>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8 border-2 py-12 px-3 shadow-2xl">
                <div>
                  <img
                    className="mx-auto h-14 w-auto animate-pulse"
                    src="https://images.vexels.com/media/users/3/224233/isolated/lists/d5ee0e9c87bb54cf867d7fb89c4570b8-online-education-logo.png"
                    alt="Study Today"
                  />
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to your account</h2>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Join us Today
                    </a>
                  </p>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST" onClick={checking}>
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                <label htmlFor="UserName" className="sr-only">
                  UserName
                </label>
                <input
                  id="UserName"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="UserName"
                />
              </div>
                    <div>
                      <label htmlFor="email-address" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                      />
                    </div>
                  </div>
  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>
  
                    <div className="text-sm">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                      </a>
                    </div>
                  </div>
  
                  <div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
                    >
                      Login
                    </button>
                    <span className='text-red-500'>{error}</span>
                  </div>
                </form>
              </div>
            </div></div>
        </div>
      </div>
  )
}
