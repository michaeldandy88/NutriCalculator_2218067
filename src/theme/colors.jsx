const colors = {
    primaryGreen: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,       // Warna utama - hijau sehat
    secondaryBlue: (opacity = 1) => `rgba(100, 181, 246, ${opacity})`,    // Warna sekunder - biru lembut
    background: (opacity = 1) => `rgba(250, 250, 250, ${opacity})`,       // Latar belakang terang
    card: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,             // Warna kartu putih
    textPrimary: (opacity = 1) => `rgba(33, 33, 33, ${opacity})`,         // Warna teks utama
    textSecondary: (opacity = 1) => `rgba(117, 117, 117, ${opacity})`,    // Warna teks sekunder
    warning: (opacity = 1) => `rgba(255, 193, 7, ${opacity})`,            // Warna peringatan (kuning)
    error: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`,              // Warna kesalahan (merah)
    success: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,            // Warna sukses (sama dengan primary)
};

export default colors;
