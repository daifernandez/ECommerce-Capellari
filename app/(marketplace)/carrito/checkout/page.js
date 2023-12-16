import CheckoutForm from "@/components/ui/checkoutForm";

export default function Checkout({ totalPrice }) {
  return (
    <div>
      <CheckoutForm totalPrice={totalPrice} />
      {console.log(`recibo ${totalPrice}`)}
    </div>
  );
}
