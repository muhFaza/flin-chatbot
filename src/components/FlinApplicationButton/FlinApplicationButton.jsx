import React, { useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const FlinApplicationButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'login', 'register', or 'leads'
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    loanType: 'personal'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleButtonClick = () => {
    if (isLoggedIn) {
      setModalType('leads');
      setShowModal(true);
    } else {
      setModalType('login');
      setAuthMode('login');
      setShowModal(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const endpoint = authMode === 'login' ? '/auth/login' : '/auth/register';
      
      const response = await api.post(endpoint, {
        email: formData.email,
        password: e.target.password.value
      });
      
      if (authMode === 'login') {
        localStorage.setItem('authToken', response.data.token);
        
        const username = formData.email.split('@')[0];
        localStorage.setItem('userName', username);
      }
      
      if (authMode === 'login') {
        setIsLoggedIn(true);
        setSuccess('Login berhasil!');
        
        e.target.password.value = '';
        
        setTimeout(() => {
          setModalType('leads');
          setSuccess('');
        }, 1000);
      } 
      else {
        setSuccess('Registrasi berhasil! Silakan login dengan akun baru Anda.');
        
        e.target.password.value = '';
        
        setTimeout(() => {
          setAuthMode('login');
          setSuccess('');
        }, 1500);
      }
    } catch (err) {
      console.error(`${authMode} error:`, err);
      setError(err.response?.data?.error || `${authMode === 'login' ? 'Login' : 'Registrasi'} gagal. Silakan coba lagi.`);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
    setError('');
    setSuccess('');
  };

  const handleLeadsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await api.post('/leads', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone.startsWith('0') ? formData.phone : `0${formData.phone}`,
        loan_type: formData.loanType
      });
      
      setSuccess('Aplikasi Anda telah berhasil dikirim. Tim kami akan menghubungi Anda segera.');
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        loanType: 'personal'
      });
      
      setTimeout(() => {
        setShowModal(false);
        setSuccess('');
      }, 3000);
    } catch (err) {
      console.error('Lead submission error:', err);
      setError(err.response?.data?.error || 'Gagal mengirim aplikasi. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setError('');
    setSuccess('');
  };

  return (
    <div>
      {/* Main Button */}
      <button 
        className="bg-[#4B7DBF] text-white px-4 py-2 rounded cursor-pointer transition-colors"
        onClick={handleButtonClick}
      >
        {isLoggedIn ? 'Ajukan Sekarang' : 'Login'}
      </button>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-[#00000099] flex items-center justify-center z-50">
          {/* Modal Content */}
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
            {/* Close Button */}
            <button 
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Login/Register Form */}
            {modalType === 'login' && (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center">
                  {authMode === 'login' ? 'Login' : 'Register'}
                </h2>
                {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
                {success && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{success}</div>}
                
                <form onSubmit={handleAuth}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contoh@email.com"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="password">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Masukkan password"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-[#4B7DBF] text-white py-2 rounded cursor-pointer transition-colors disabled:bg-blue-300"
                    disabled={loading}
                  >
                    {loading ? 'Memproses...' : (authMode === 'login' ? 'Masuk' : 'Daftar')}
                  </button>
                  
                  <p className="mt-4 text-sm text-center text-gray-600">
                    {authMode === 'login' ? 'Belum memiliki akun?' : 'Sudah memiliki akun?'} 
                    <a 
                      href="#" 
                      className="text-[#4B7DBF] hover:underline ml-1"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleAuthMode();
                      }}
                    >
                      {authMode === 'login' ? 'Daftar disini' : 'Login disini'}
                    </a>
                  </p>
                </form>
              </>
            )}

            {/* Leads Form */}
            {modalType === 'leads' && (
              <>
                <h2 className="text-2xl font-bold mb-1 text-center">Form Konsultasi</h2>
                <p className="text-center text-gray-600 mb-6">Informasi Pribadi</p>
                
                {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
                {success && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{success}</div>}
                
                <form onSubmit={handleLeadsSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="name">
                      Nama Lengkap Sesuai KTP <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nama Lengkap Sesuai KTP"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contoh@email.com"
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="phone">
                      No. Handphone <span className="text-red-500">*</span>
                    </label>
                    <div className="flex border rounded focus-within:ring-2 focus-within:ring-blue-500">
                      <div className="flex items-center px-3 bg-gray-100 border-r">
                        <span className="text-red-500 font-bold">+62</span>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="8xxxxxxxxxx"
                        className="w-full px-3 py-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="loanType">
                      Jenis Pinjaman <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="loanType"
                      name="loanType"
                      value={formData.loanType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="personal">Pinjaman Personal</option>
                      <option value="business">Pinjaman Bisnis</option>
                      <option value="mortgage">KPR</option>
                      <option value="creditCard">Kartu Kredit</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        className="mt-1 mr-2"
                        required
                      />
                      <span className="text-sm text-gray-700">
                        <strong>FLIN bukan pemberi pinjaman</strong> dan tidak menyediakan pinjaman baru, tetapi membantu penyelesaian <strong>pinjaman yang sudah ada</strong> dengan institusi keuangan atau pemberi pinjaman.
                      </span>
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-[#4B7DBF] text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 font-semibold"
                    disabled={loading}
                  >
                    {loading ? 'Mengirim...' : 'KIRIM APLIKASI'}
                  </button>
                  
                  <p className="mt-4 text-sm text-center text-gray-600">
                    Dengan mengirim aplikasi, Anda menyetujui 
                    <a href="#" className="text-[#4B7DBF] hover:underline"> Kebijakan Privasi </a> 
                    dan 
                    <a href="#" className="text-[#4B7DBF] hover:underline"> Syarat & Ketentuan </a> 
                    kami
                  </p>
                </form>
                
                <div className="mt-4 text-center">
                  <button 
                    onClick={handleLogout} 
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlinApplicationButton;