import { FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { api } from '@/services'
import { Attempt, Employee } from '@/pages/Home/Home'

interface InvitationFormProps {
  employees: Employee[]
  getAttempts: () => Promise<void>
}

export default function InvitationForm({
  employees,
  getAttempts
}: InvitationFormProps) {
  const [selectedEmail, setSelectedEmail] = useState<string>('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    api
      .post('/phishing/send-email', { email: selectedEmail })
      .then(() => {
        getAttempts()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="my-1">Select a user to send a spam email to</h1>
      <Select onValueChange={setSelectedEmail}>
        <SelectTrigger>
          <SelectValue placeholder="Email" />
        </SelectTrigger>
        <SelectContent>
          {employees.map((user) => (
            <SelectItem key={user._id} value={user.userId.email}>
              {user.userId.email}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button size="sm" className="my-3" type="submit">
        Send
      </Button>
    </form>
  )
}
