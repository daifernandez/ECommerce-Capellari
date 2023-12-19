import CheckoutForm from "@/components/cart/checkoutForm";

export default function Checkout({ totalPrice }) {
  return (
    <div>
      <CheckoutForm totalPrice={totalPrice} />
    </div>
  );
}
