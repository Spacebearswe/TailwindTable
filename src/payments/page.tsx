import type { Payment } from "./columns"
import { createPaymentColumns } from "./columns"
import { DataTable } from "./data-table"

interface PaymentStatusTableProps {
  data: Payment[]
  onEditPayment: (payment: Payment) => void
  onDeletePayment: (payment: Payment) => void
}

export default function PaymentStatusTable({
  data,
  onEditPayment,
  onDeletePayment,
}: PaymentStatusTableProps) {
  return (
    <DataTable
      columns={createPaymentColumns({ onEditPayment, onDeletePayment })}
      data={data}
    />
  )
}