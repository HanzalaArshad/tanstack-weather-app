import type { PropsWithChildren } from 'react'
import Header from './Header'

const Layout = ({children}: PropsWithChildren) => {
  return (
    <div className='bg-gradient-to-br from background to-muted '>
      <Header/>

      <main className='min-h-screen container mx-auto px-4 py-8'>   
       {children}
     </main>
      <footer className='border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/90 '>
        <div className='container mx-auto text-center text-gray-200 '>
          Made with Struggle by Hanzala Arshad 
        </div>
      </footer>
      
      </div>
  )
}

export default Layout