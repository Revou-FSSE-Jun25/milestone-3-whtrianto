import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export default function Layout({ children }) {
  return (
    <>
      {/**
       * Komponen Layout membungkus setiap halaman dengan Navbar di atas dan Footer di bawah.
       * `children` adalah isi halaman yang spesifik.
       */}
      <Navbar />
      {children}
      <Footer />
    </>
  );
}


