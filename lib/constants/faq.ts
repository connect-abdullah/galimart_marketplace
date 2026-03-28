export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "delivery",
    question: "Where do you deliver?",
    answer:
      "We currently serve Islamabad and nearby sectors. Enter your address at checkout to confirm slot availability for your area.",
  },
  {
    id: "slots",
    question: "How do delivery slots work?",
    answer:
      "Choose a same-day or next-day window when you check out. You will get a confirmation with an estimated arrival time. Someone should be available to receive perishables.",
  },
  {
    id: "payment",
    question: "Which payment methods do you accept?",
    answer:
      "This prototype shows cash on delivery, JazzCash, EasyPaisa, and cards. In a live store, your team would connect real payment gateways.",
  },
  {
    id: "returns",
    question: "What if an item is wrong or damaged?",
    answer:
      "Contact us within 24 hours with your order ID and a photo if possible. We will arrange a replacement or refund for eligible items.",
  },
  {
    id: "promo",
    question: "How do I use a promo code?",
    answer:
      "Add items to your cart, open the cart page, enter your code in the promo field, and tap Apply. Valid codes show a discount on your subtotal before checkout.",
  },
  {
    id: "fresh",
    question: "How fresh are fish and dairy?",
    answer:
      "Product pages list storage and use-by guidance. Fish and dairy are packed for cold chain where applicable; consume within the timeframe on the pack.",
  },
];
