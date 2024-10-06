import './App.css'
import { ResponsiveComponent, createBreakpoints } from "responsive-component"



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

