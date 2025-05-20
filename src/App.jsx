import logo from './assets/flin-logo.png'
import family from './assets/flin-family.png'
import komdigi from './assets/komdigi.png'
import FlinApplicationButton from './components/FlinApplicationButton/FlinApplicationButton'

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-white px-30">
        <header className="py-4 px-6 border-b">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
                <img src={logo} alt="logo" loading="lazy" width='160px' height='45px' />
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-black hover:text-[#4B7DBF]">Program Dana Talangan</a>
              <a href="#" className="text-black hover:text-[#4B7DBF]">Kolaborasi Perusahaan</a>
              <a href="#" className="text-black hover:text-[#4B7DBF]">Sumber</a>
              <a href="#" className="text-black hover:text-[#4B7DBF]">Tentang</a>
              {/* <button className="bg-[#4B7DBF] text-white px-4 py-2 rounded cursor-pointer">
                Ajukan Sekarang
              </button> */}
              <FlinApplicationButton/>
              <div className="ml-4">
                <span>Bahasa Indonesia</span>
              </div>
            </nav>
          </div>
        </header>

        <section className="py-16 px-6">
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl font-bold mb-2">
                Hidup Bebas Utang,
              </h1>
              <h2 className="text-4xl font-bold text-[#4B7DBF] mb-6">
                Raih Masa Depan Cemerlang
              </h2>
              <p className="text-gray-700 mb-8">
                #AturUtangHidupmu dan bebaskan diri dari lilitan hutang bersama jasa melunasi hutang terpercaya di Indonesia.
              </p>
              <button className="bg-[#4B7DBF] text-white font-medium px-8 py-3 rounded hover:bg-blue-600">
                Konsultasi Gratis
              </button>

              <div className='flex gap-2'>
                <div className="mt-16 p-2 border-[2px] border-[#D2E4F8] rounded-lg flex items-start">
                  <div className="mr-4 bg-blue-100 p-3 rounded-full">
                    <div className="w-10 h-10 flex items-center justify-center text-[#4B7DBF]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-700 mb-2">
                      Menjamin keamanan, melindungi data pribadi, serta memastikan sistem elektronik telah lolos uji kelayakan—semuanya dilakukan sesuai dengan peraturan perundang-undangan yang berlaku.
                    </p>
                    <p className="text-xs text-gray-500">
                      Nomor TDPSE: 017446.01/DJAI.PSE/03/2025
                    </p>
                  </div>
                </div>

                <div className="mt-16 p-2 px-4 border-[2px] border-[#D2E4F8] rounded-lg flex-col items-center justify-center">
                  <div className="mr-2 text-xs text-center">Terdaftar di:</div>
                  <div className="">
                    <img src={komdigi} loading="lazy" width='74px' height='74px' alt="KOMDIGI Logo" className="h-auto" />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <img src={family} alt="Happy Family" loading="lazy" width='640px' height='556px' className="rounded-lg h-auto" />
            </div>
          </div>
        </section>

        <section className="py-12 px-6 bg-gray-50">
          <div className="container mx-auto text-center">
            <p className="mb-8 max-w-4xl mx-auto">
              <strong>2 dari 10 peminjam</strong> di Indonesia merasa resah dengan hutang yang tinggi dan beban cicilan yang berat setiap bulan. Berhenti menambah beban kesehatan mental dan keuangan yang tidak perlu.
            </p>

            <p className="text-lg mb-4">
              Kurangi beban hutangmu dan konsolidasikan beragam pinjaman jadi satu.
            </p>

            <p className="text-lg">
              FLIN memberikan produk, teknologi, dan layanan yang tepat. Minimalkan <strong>hutang personal</strong> dan <strong>konsolidasikan</strong> menjadi satu.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}

export default App
