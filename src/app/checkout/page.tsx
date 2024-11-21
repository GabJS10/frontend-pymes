import { CheckOutForm } from "@/components/CheckOutForm";
import { OrderSummary } from "@/components/OrderSummary";
export default function CheckoutPage() {
  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Información de contacto y entrega */}
      <div className="md:col-span-2">
        <CheckOutForm />
      </div>

      {/* Resumen de pedido */}
      <div>
        <OrderSummary />
      </div>
    </div>
  );
}
