export const dynamic = 'force-static';

const faqs = [
  {
    question: 'Does RevoShop have a return policy?',
    answer: 'Yes, you can return items within 14 days of receiving them with proof of purchase.',
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 2–5 business days depending on your location.',
  },
  {
    question: 'What payment methods are available?',
    answer: 'We accept credit/debit cards, bank transfers, and popular e-wallets.',
  },
];

export default function FAQPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
      <p className="mt-2 text-gray-600">
        This page is statically generated (SSG), allowing it to load extremely quickly.
      </p>

      <div className="mt-8 space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        {faqs.map(item => (
          <article key={item.question}>
            <h2 className="text-xl font-semibold text-gray-900">{item.question}</h2>
            <p className="mt-2 text-gray-600">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
