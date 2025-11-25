export const dynamic = 'force-static';

const faqs = [
  {
    question: 'Apakah RevoShop memiliki kebijakan pengembalian barang?',
    answer: 'Ya, Anda dapat mengembalikan barang dalam 14 hari setelah penerimaan dengan bukti pembayaran.',
  },
  {
    question: 'Berapa lama waktu pengiriman?',
    answer: 'Pengiriman reguler memakan waktu 2-5 hari kerja tergantung lokasi Anda.',
  },
  {
    question: 'Metode pembayaran apa saja yang tersedia?',
    answer: 'Kami menerima kartu kredit/debit, transfer bank, dan e-wallet populer.',
  },
];

export default function FAQPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Pertanyaan yang Sering Diajukan</h1>
      <p className="mt-2 text-gray-600">
        Halaman ini dibangkitkan secara statis (SSG) sehingga dapat dimuat dengan sangat cepat.
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

