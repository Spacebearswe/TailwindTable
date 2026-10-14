import { useState } from "react"
import { Button } from "@/components/ui/button/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog/dialog"
import { Field, FieldGroup } from "@/components/ui/field/field"
import { Input } from "@/components/ui/input/input"
import { Label } from "@/components/ui/label/label"
import type { Payment } from "./columns"

type NewPayment = Omit<Payment, "id">

interface AddPaymentProps {
  onAddPayment: (payment: NewPayment) => void
}

const paymentStatuses: Payment["status"][] = [
  "pending",
  "processing",
  "success",
  "failed",
]

function isPaymentStatus(status: FormDataEntryValue | null): status is Payment["status"] {
  return (
    typeof status === "string" &&
    paymentStatuses.some((candidate) => candidate === status)
  )
}

export function AddPayment({ onAddPayment }: AddPaymentProps) {
  const [open, setOpen] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "").trim()
    const amount = Number(formData.get("amount"))
    const status = formData.get("status")

    if (
      !email ||
      !Number.isFinite(amount) ||
      amount <= 0 ||
      !isPaymentStatus(status)
    ) {
      return
    }

    onAddPayment({
      email,
      amount,
      status,
    })
    event.currentTarget.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline">Add Payment</Button>} />
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Payment</DialogTitle>
            <DialogDescription>
              Fill out the form below to add a new payment. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="payment-status">Status</Label>
              <select
                id="payment-status"
                name="status"
                defaultValue="pending"
                className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm"
              >
                {paymentStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </Field>
            <Field>
              <Label htmlFor="payment-email">Email</Label>
              <Input
                id="payment-email"
                name="email"
                type="email"
                placeholder="customer@example.com"
                autoComplete="email"
                required
              />
            </Field>
            <Field>
              <Label htmlFor="payment-amount">Amount</Label>
              <Input
                id="payment-amount"
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                required
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose
              render={<Button type="button" variant="outline">Cancel</Button>}
            />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface EditPaymentDialogProps {
  payment: Payment
  onOpenChange: (open: boolean) => void
  onSave: (payment: Payment) => void
}

export function EditPaymentDialog({
  payment,
  onOpenChange,
  onSave,
}: EditPaymentDialogProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "").trim()
    const amount = Number(formData.get("amount"))
    const status = formData.get("status")

    if (
      !email ||
      !Number.isFinite(amount) ||
      amount <= 0 ||
      !isPaymentStatus(status)
    ) {
      return
    }

    onSave({ ...payment, email, amount, status })
  }

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Payment</DialogTitle>
            <DialogDescription>
              Update the payment details, then save your changes.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="edit-payment-status">Status</Label>
              <select
                id="edit-payment-status"
                name="status"
                defaultValue={payment.status}
                className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm"
              >
                {paymentStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </Field>
            <Field>
              <Label htmlFor="edit-payment-email">Email</Label>
              <Input
                id="edit-payment-email"
                name="email"
                type="email"
                defaultValue={payment.email}
                autoComplete="email"
                required
              />
            </Field>
            <Field>
              <Label htmlFor="edit-payment-amount">Amount</Label>
              <Input
                id="edit-payment-amount"
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                defaultValue={payment.amount}
                required
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose
              render={<Button type="button" variant="outline">Cancel</Button>}
            />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
