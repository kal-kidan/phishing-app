import { FormEvent, useEffect, useState } from 'react'
import { useSession } from '@/hooks'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { ClosedEye, OpenedEye } from '@/components/Icons'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isloading, setIsLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const { signIn } = useSession()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    setIsLoading(true)

    try {
      await signIn({ email, password })
    } catch (error) {
      console.log('error', error)

      /**
       * an error handler can be added here
       */
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // clean the function to prevent memory leak
    return () => setIsLoading(false)
  }, [])

  return (
    <Card className="mx-auto max-w-sm mt-5">
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                required
                placeholder="Enter Password"
                value={password}
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
            type="submit"
            className="w-full"
            onClick={handleSubmit}
            disabled={isloading}
          >
            {isloading ? 'Loading' : 'Login'}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?
          <Link to="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
export default Login
