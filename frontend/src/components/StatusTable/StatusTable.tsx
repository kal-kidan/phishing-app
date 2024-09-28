import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Attempt } from '@/pages/Home/Home'

interface AttemptProps {
  attempts: Attempt[]
}

export default function StatusTable({ attempts }: AttemptProps) {
  return (
    <Card className="max-w-full overflow-auto md:min-w-[500px] mx-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>emailContent</TableHead>
            <TableHead>status</TableHead>
            {/* <TableHead className="text-right mr-5">Status</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {attempts.map((attempt, index) => (
            <TableRow key={index}>
              <TableCell>{attempt.createdAt}</TableCell>
              <TableCell>{attempt.employeeId.userId.email}</TableCell>
              <TableCell>{attempt.employeeId.userId.name}</TableCell>
              <TableCell>{attempt.employeeId.department}</TableCell>
              <TableCell>{attempt.emailContent}</TableCell>
              <TableCell>{attempt.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
