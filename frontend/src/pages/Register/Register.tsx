import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/services'
import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ClosedEye, OpenedEye } from '@/components/Icons'

export default function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handleSubmit = (e: FormEvent) => {
    console.log({
      name,
      email,
      password
    })

    e.preventDefault()
    setIsLoading(true)
    api
      .post('/auth/register', {
        name,
        email,
        password
      })
      .then(() => {
        setName('')
        setEmail('')
        setPassword('')
        setErrors({})
        setIsLoading(false)
        navigate('/')
      })
      .catch((err) => {
        console.log(err)

        const globalMessage = err.response?.data?.message

        const tempErrors = {}

        if (globalMessage) {
          const errorMessages = globalMessage.split(', ')

          errorMessages.forEach((error) => {
            const match = error.match(/"([^"]+)" is (.*)/)
            if (match) {
              const fieldName = match[1]
              const errorDetail = match[2]
              tempErrors[fieldName] = errorDetail
            }
          })
        }

        console.log('tempErrors', tempErrors)

        setErrors({ ...tempErrors, global: '' })
        setIsLoading(false)
      })
  }

  return (
    <Card className="mx-auto max-w-sm mt-5">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            {errors.name && (
              <div className="text-red-600 text-xs">{errors.name}</div>
            )}
            <Input
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            {errors.email && (
              <div className="text-red-600 text-xs">{errors.email}</div>
            )}
            <Input
              id="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            {errors.password && (
              <div className="text-red-600 text-xs">{errors.password}</div>
            )}
            <div className="relative">
              <Input
                id="password"
                type="password"
                value={password}
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <div
                className="absolute top-3 right-2"
                onClick={() => {
                  togglePasswordVisibility()
                }}
              >
                {passwordVisible ? <ClosedEye /> : <OpenedEye />}
              </div>
            </div>
          </div>
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Loading' : 'Create an account'}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
