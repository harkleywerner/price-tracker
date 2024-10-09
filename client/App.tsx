import './App.css'
import { ResponsiveComponent, createBreakpoints } from "responsive-component"
import {isFunction} from "my-utilities"


const promise1 = Promise.resolve(1);
const promise2 = Promise.reject(new Error("Error en la promesa 2"));
const promise3 = Promise.resolve(3);

const t = Promise.all([promise1, promise2, promise3])
t.then(r => console.log(r))
t.catch(r => console.log(r))

function App() {

  const breakPointDefault = {
    "xs": 440,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "2xl": 1536,
  }

  const breakpoints = createBreakpoints(breakPointDefault)
  return (
    <>
      <ResponsiveComponent  
      
      breakpoints = {breakpoints}>
        asdsd
      </ResponsiveComponent>
    </>
  )
}

export default App

