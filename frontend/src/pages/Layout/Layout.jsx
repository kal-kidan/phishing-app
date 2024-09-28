import { Outlet } from 'react-router-dom'
import { useSession } from '@/hooks'
import { NavBar } from '@/components'
const Layout = () => {
  const { isAuthenticated, loadingUserData } = useSession()

  if (loadingUserData) {
    return null
  }

  return (
    <div className="flex w-full flex-col  ">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {isAuthenticated && (
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 mb-1">
            <NavBar />
          </header>
        )}
        <Outlet />
      </div>
      {isAuthenticated && (
        <footer>
          <div className="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-center">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024{' '}
              <a href="#" className="hover:underline">
                Name
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </footer>
      )}
    </div>
  )
}

export default Layout
