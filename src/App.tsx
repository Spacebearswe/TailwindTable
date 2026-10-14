import { useState } from 'react'
import PaymentStatusTable from './payments/page'
import './App.css'
import { AddPayment } from './payments/paymentdialog'
import type { Payment } from './payments/columns'
import { EditPaymentDialog } from './payments/paymentdialog'

const initialPayments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "123ed52f",
    amount: 500,
    status: "pending",
    email: "doe@payment.com",
  },
]

function App() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments)
  const [paymentToEdit, setPaymentToEdit] = useState<Payment | null>(null)

  function handleDeletePayment(payment: Payment) {
    if (!window.confirm(`Delete payment ${payment.id}?`)) {
      return
    }

    setPayments((currentPayments) =>
      currentPayments.filter((currentPayment) => currentPayment.id !== payment.id)
    )
  }

  return (
    <main className="container mx-auto py-10">
      <div className="flex items-center justify-between gap-4 pb-4">
        <h1 className="text-3xl font-bold">Payment status table</h1>
        {/* <h5 className="text-lg font-medium">React Tailwind Shadcn</h5> */}
        <AddPayment
          onAddPayment={(payment) =>
            setPayments((currentPayments) => [
              ...currentPayments,
              { ...payment, id: crypto.randomUUID() },
            ])
          }
        />
      </div>
      <PaymentStatusTable
        data={payments}
        onEditPayment={setPaymentToEdit}
        onDeletePayment={handleDeletePayment}
      />
      {paymentToEdit && (
        <EditPaymentDialog
          payment={paymentToEdit}
          onOpenChange={(open) => {
            if (!open) setPaymentToEdit(null)
          }}
          onSave={(updatedPayment) => {
            setPayments((currentPayments) =>
              currentPayments.map((payment) =>
                payment.id === updatedPayment.id ? updatedPayment : payment
              )
            )
            setPaymentToEdit(null)
          }}
        />
      )}
    </main>
  )
}

export default App
