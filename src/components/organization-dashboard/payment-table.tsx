import { Button } from "@/components/ui/button"

// Mock data for payments
const paymentData = [
  {
    amount: "+$50,000.00",
    description: "Success",
    date: "May 31, 2024",
    status: "success",
  },
  {
    amount: "-$10,000.00",
    description: "Pending",
    date: "May 31, 2024",
    status: "pending",
  },
  {
    amount: "-$18,000.00",
    description: "Pending",
    date: "Apr 31, 2024",
    status: "pending",
  },
]

export function PaymentTable() {
  return (
    <div className="relative rounded-lg overflow-hidden" style={{ backgroundColor: "#131313A6" }}>
      {/* Multiple glow effects */}
      <div
        className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-xl"
        style={{ background: "radial-gradient(circle, #F3A42C 0%, transparent 70%)" }}
      ></div>
      <div
        className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full blur-xl"
        style={{ background: "radial-gradient(circle, #F3A42C 0%, transparent 70%)" }}
      ></div>
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-xl"
        style={{ background: "radial-gradient(circle, #F3A42C 0%, transparent 70%)" }}
      ></div>

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-6 pb-4 mb-6 border-b border-gray-700">
          <div className="text-white font-medium text-sm uppercase tracking-wider">Amount</div>
          <div className="text-white font-medium text-sm uppercase tracking-wider">Description</div>
          <div className="text-white font-medium text-sm uppercase tracking-wider">Date Of Payment</div>
          <div className="text-white font-medium text-sm uppercase tracking-wider">Action</div>
        </div>

        {/* Table Data */}
        <div className="space-y-4">
          {paymentData.map((payment, index) => (
            <div key={index} className="grid grid-cols-4 gap-6 py-4">
              <div
                className={`text-lg font-bold ${payment.amount.startsWith("+") ? "text-green-500" : "text-red-500"}`}
              >
                {payment.amount}
              </div>
              <div className="text-white">{payment.description}</div>
              <div className="text-white">{payment.date}</div>
              <div>
                <Button variant="ghost" className="text-white hover:text-gray-300 p-0 h-auto font-normal">
                  View Receipt
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
