import { useRoutePaths, useSession } from '@/hooks'
import { Link, NavLink } from 'react-router-dom'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { CircleUser } from 'lucide-react'

import { Button } from '@/components/ui/button'
function NavBar() {
  const { signOut, user } = useSession()
  const { ROOT_PATH } = useRoutePaths()

  return (
    <>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Link
          to={ROOT_PATH}
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <p>Logo</p>
          <span className="sr-only">Dashboard</span>
        </Link>
        <div className="ml-auto flex-1 sm:flex-initial"></div>
        <div>
          <p>{user?.email}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Profile</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button onClick={signOut}>Logout</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}

export default NavBar
