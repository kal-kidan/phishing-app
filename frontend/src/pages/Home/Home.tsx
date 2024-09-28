import { useSession } from '@/hooks'
import { api } from '@/services'
import { validateUserPermissions } from '@/utils'
import { useEffect, useState } from 'react'

export interface Employee {
  _id: string
  userId: {
    _id: string
    name: string
    email: string
  }
  phoneNumber: string
  department: string
  jobTitle: string
  __v: number
}

export interface Attempt {
  _id: string
  createdAt: string
  emailContent: string
  employeeId: string
  status: string
  uniqueLink: string
  __v: number
}

function Home() {
  const { user } = useSession()
  const { hasAllRoles } = validateUserPermissions({
    user,
    permissions: [],
    roles: ['admin']
  })
  const [employees, setEmployees] = useState<Employee[]>([])
  const [attempts, setAttempts] = useState<Attempt[]>([])

  async function getEmployees() {
    try {
      const response = await api.get('/employees')
      setEmployees(response.data)
    } catch (error) {
      console.error('Error fetching employees:', error)
    }
  }

  async function getAttempts() {
    try {
      const response = await api.get('/phishing/attempts')

      setAttempts(response.data)
    } catch (error) {
      console.error('Error fetching attempts:', error)
    }
  }

  useEffect(() => {
    if (hasAllRoles) {
      getEmployees()
      getAttempts()
    }
  }, [hasAllRoles])

  return (
    <div>
      {!hasAllRoles ? (
        <div className="flex justify-center">
          Please Login as Admin to get more info
        </div>
      ) : (
        <div className="flex flex-col items-center">
            Wellcome Home
        </div>
      )}
    </div>
  )
}

export default Home
