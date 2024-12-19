import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import WeatherDashboard from "./pages/WeatherDashboard"
import CityPages from "./pages/CityPages"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from "./context/themeprovider"

const App = () => {

  const queryClient= new QueryClient({
    defaultOptions:{
      queries:{
        staleTime:5*60*1000, // 5 minuates;
        gcTime:10*60*1000,//10 minuates;
        retry:false,
        refetchOnWindowFocus:false,
        
      }
    }
  });
  return (


    <QueryClientProvider client={queryClient}>

    <BrowserRouter>
    <ThemeProvider defaultTheme="dark">
    <Layout>

      <Routes>
        <Route path='/' element={<WeatherDashboard/>}/>
        <Route path='/city/:cityName' element={<CityPages/>}/>
      </Routes>

    </Layout>

    </ThemeProvider>

    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />

    </QueryClientProvider>


  )
}

export default App