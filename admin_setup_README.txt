PANEL ADMIN - SMP AL-MIFTAH TERPADU

Paket ini menambahkan folder /admin untuk Decap CMS.
PENTING: agar login/publish benar-benar berfungsi, website harus dihubungkan ke repository Git (GitHub/GitLab) dan backend autentikasi Decap dikonfigurasi.

Rekomendasi 2026:
- Hindari membuat konfigurasi Git Gateway baru sebagai fondasi utama karena Netlify menandainya deprecated.
- Gunakan Decap CMS dengan GitHub backend + autentikasi OAuth Netlify, atau Decap Turbo.

SEBELUM DEPLOY:
1. Buat repository GitHub untuk source website dan hubungkan project Netlify ke repo tersebut.
2. Buka admin/config.yml.
3. Ganti YOUR_GITHUB_USERNAME/YOUR_REPOSITORY dengan repo yang sebenarnya.
4. Atur OAuth GitHub pada Netlify sesuai dokumentasi resmi Decap/Netlify.
5. Deploy dari repository.
6. Buka https://domain-anda.netlify.app/admin/

Konten admin yang disiapkan:
- Berita & Kegiatan
- Prestasi
- Galeri
- Ekstrakurikuler
- Pengumuman / SPMB

Catatan: Website publik V2 tetap utuh. Integrasi rendering konten dinamis dari koleksi CMS ke halaman depan memerlukan build/generator atau JavaScript pembaca data; paket ini menyiapkan struktur admin dan data, bukan menyimpan password di HTML.
