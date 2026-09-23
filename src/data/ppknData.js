/**
 * Data Resmi & Otentik Ruang PPKn Interaktif - Riska Puspita, S.Pd.
 * Didesain khusus untuk kurikulum Pendidikan Pancasila SMP (Fase D / Kelas 7, 8, 9).
 */

export const teacherProfile = {
  name: "Riska Puspita, S.Pd.",
  role: "Guru Mata Pelajaran PPKn SMP",
  school: "SMP Negeri Indonesia",
  motto: "“Pancasila bukan sekadar untaian kata untuk dihafal saat upacara, melainkan denyut nadi dan panduan budi pekerti kita setiap hari.”",
  bio: "Halo anak-anak hebat dan rekan pendidik! Saya Riska Puspita, mengajar mata pelajaran Pendidikan Pancasila dan Kewarganegaraan. Di ruang belajar digital ini, saya ingin mengajak kalian menjelajahi indahnya keberagaman Indonesia, memahami hak dan kewajiban warga negara, serta menumbuhkan karakter Pelajar Pancasila yang tangguh, adil, dan berintegritas.",
  stats: [
    { label: "Tahun Mengabdi", value: "7+ Tahun" },
    { label: "Siswa Terbimbing", value: "1.200+" },
    { label: "Proyek P5 Terselenggara", value: "14 Proyek" },
    { label: "Modul Ajar Kreatif", value: "25+ Modul" },
  ],
  badges: [
    "Guru Inovatif Kurikulum Merdeka",
    "Fasilitator Utama P5 Nusantara",
    "Pembina Sahabat Karakter SMP",
  ],
  socials: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
    email: "riska.puspita.ppkn@gmail.com",
    whatsapp: "https://wa.me/6281234567890"
  }
};

export const teacherTimeline = [
  {
    year: "2017",
    title: "Lulus Sarjana Pendidikan (S.Pd.) PPKn",
    subtitle: "Universitas Negeri Terkemuka",
    description: "Menyelesaikan studi dengan fokus riset pada metode pembelajaran kewarganegaraan berbasis kasus kontekstual (*Contextual Teaching and Learning*) untuk siswa tingkat remaja.",
    tag: "Akademik & Fondasi",
    icon: "GraduationCap"
  },
  {
    year: "2019",
    title: "Awal Pengabdian di Sekolah Menengah Pertama",
    subtitle: "Dedikasi Penuh untuk Karakter Remaja",
    description: "Mulai mengajar PPKn di jenjang SMP. Menggagas pojok 'Klinik Konstitusi Cilik' di mana siswa dapat berkonsultasi tentang tata tertib sekolah dan musyawarah kelas.",
    tag: "Pengabdian",
    icon: "HeartHandshake"
  },
  {
    year: "2021",
    title: "Pembina OSIS & Gerakan Sekolah Ramah Remaja",
    subtitle: "Kepemimpinan Demokrasi Siswa",
    description: "Mendampingi pemilihan ketua OSIS dengan sistem pemilu langsung yang mengadopsi prinsip Luber Jurdil, mengajarkan demokrasi langsung sejak usia SMP.",
    tag: "Kepemimpinan",
    icon: "Users"
  },
  {
    year: "2023",
    title: "Koordinator & Fasilitator Proyek P5",
    subtitle: "Implementasi Kurikulum Merdeka",
    description: "Memimpin proyek Profil Pelajar Pancasila tema 'Bhinneka Tunggal Ika' dan 'Suara Demokrasi', melibatkan lebih dari 300 siswa kelas 7 dan 8.",
    tag: "Inovasi Kurikulum",
    icon: "Award"
  },
  {
    year: "2024 - Sekarang",
    title: "Pelopor Portal Belajar PPKn Digital",
    subtitle: "Transformasi Pembelajaran Interaktif",
    description: "Mengembangkan media edukasi berbasis gamifikasi, kuis berwaktu, dan bank soal digital agar siswa SMP belajar konstitusi dengan antusias dan tanpa rasa jenuh.",
    tag: "Inovasi Masa Kini",
    icon: "Sparkles"
  }
];

export const questionBank = [
  {
    id: "q-7-1",
    grade: "7",
    topic: "Pancasila",
    question: "Dalam sidang BPUPKI pertama tanggal 1 Juni 1945, Ir. Soekarno menyampaikan gagasan tentang lima dasar negara yang kemudian dinamai Pancasila. Sikap para pendiri bangsa yang patut kita teladani saat proses perumusan tersebut adalah...",
    options: [
      "Mengutamakan kepentingan golongan masing-masing di atas segalanya",
      "Mengutamakan musyawarah untuk mufakat serta rela berkorban demi persatuan bangsa",
      "Memaksakan kehendak kelompok mayoritas agar keputusan cepat diambil",
      "Menolak pandangan anggota lain yang tidak sepaham"
    ],
    answer: 1,
    explanation: "Nilai luhur para pendiri bangsa saat merumuskan Pancasila adalah jiwa toleransi yang tinggi, mengutamakan musyawarah mufakat, dan mendahulukan persatuan bangsa di atas kepentingan pribadi atau golongan."
  },
  {
    id: "q-7-2",
    grade: "7",
    topic: "Norma & UUD 1945",
    question: "Di lingkungan sekolah, kamu melihat ada teman yang lupa mengembalikan buku perpustakaan padahal sudah lewat batas waktu. Norma yang paling relevan dengan situasi tersebut dan sanksi yang timbul adalah...",
    options: [
      "Norma agama dengan sanksi dikucilkan teman",
      "Norma kesopanan dengan sanksi hukuman penjara",
      "Norma hukum/aturan tata tertib sekolah dengan sanksi teguran atau denda keterlambatan",
      "Norma kesusilaan dengan sanksi pemanggilan oleh pihak kepolisian"
    ],
    answer: 2,
    explanation: "Tata tertib perpustakaan sekolah merupakan bagian dari norma hukum institusi/tata tertib yang memiliki aturan tertulis dan sanksi tegas berupa teguran atau denda sesuai ketentuan sekolah."
  },
  {
    id: "q-8-1",
    grade: "8",
    topic: "UUD NRI 1945",
    question: "Kedudukan Pembukaan UUD Negara Republik Indonesia Tahun 1945 memiliki sifat tetap dan tidak dapat diubah oleh siapapun, termasuk oleh MPR hasil pemilu, karena...",
    options: [
      "Memuat cita-cita luhur dan pokok kaidah fundamental berdirinya Negara Kesatuan Republik Indonesia",
      "Disusun dalam bahasa yang sangat sulit untuk diperbarui",
      "Tidak ada anggota dewan yang berani mengusulkan perubahannya",
      "Jumlah pasalnya terlalu sedikit dibandingkan batang tubuh UUD 1945"
    ],
    answer: 0,
    explanation: "Pembukaan UUD NRI 1945 memuat dasar filsafat negara (Pancasila), tujuan nasional, dan staatsfundamentalnorm (pokok kaidah negara yang fundamental). Mengubah Pembukaan berarti membubarkan negara proklamasi 17 Agustus 1945."
  },
  {
    id: "q-8-2",
    grade: "8",
    topic: "Bhinneka Tunggal Ika",
    question: "Sumpah Pemuda pada tanggal 28 Oktober 1928 menjadi tonggak bersejarah persatuan bangsa. Makna utama ikrar 'Menjunjung bahasa persatuan, bahasa Indonesia' bagi pelajar saat ini adalah...",
    options: [
      "Melarang penggunaan bahasa daerah sama sekali dalam pergaulan sehari-hari",
      "Menjadikan bahasa Indonesia sebagai alat pemersatu komunikasi antar suku tanpa melupakan bahasa daerah",
      "Hanya berkomunikasi menggunakan bahasa asing agar terlihat modern",
      "Menolak mempelajari bahasa internasional untuk menunjukkan nasionalisme"
    ],
    answer: 1,
    explanation: "Bahasa Indonesia adalah jembatan persatuan keberagaman suku di nusantara. Kita wajib bangga menggunakannya dengan baik dan benar, sekaligus tetap melestarikan bahasa daerah sebagai kekayaan budaya."
  },
  {
    id: "q-9-1",
    grade: "9",
    topic: "Pancasila",
    question: "Pancasila sebagai ideologi terbuka memiliki dimensi fleksibilitas, realitas, dan idealisme. Maksud dari dimensi fleksibilitas adalah...",
    options: [
      "Pancasila dapat diubah nilai-nilai dasarnya setiap pergantian presiden",
      "Pancasila mampu berinteraksi dan menyesuaikan diri dengan perkembangan zaman tanpa kehilangan nilai hakikinya",
      "Nilai-nilai Pancasila diambil seluruhnya dari ideologi negara-negara lain",
      "Pancasila boleh ditafsirkan bebas sesuai kepentingan pribadi masing-masing"
    ],
    answer: 1,
    explanation: "Dimensi fleksibilitas bermakna ideologi Pancasila memiliki keluwesan intelektual dan keterbukaan dalam menyerap inovasi kemajuan ilmu pengetahuan tanpa pernah mengubah nilai-nilai dasarnya yang abadi."
  },
  {
    id: "q-9-2",
    grade: "9",
    topic: "NKRI",
    question: "Upaya bela negara bukan hanya tugas TNI dan POLRI, melainkan hak dan kewajiban seluruh warga negara (Pasal 27 ayat 3 UUD NRI 1945). Wujud nyata bela negara yang paling tepat dilakukan oleh seorang pelajar SMP adalah...",
    options: [
      "Ikut serta dalam operasi militer perbatasan negara",
      "Belajar sungguh-sungguh, menaati tata tertib, dan menjaga kerukunan serta nama baik sekolah",
      "Membeli senjata mainan untuk berjaga-jaga di lingkungan rumah",
      "Mengabaikan tugas sekolah demi mengikuti aksi demonstrasi di jalanan"
    ],
    answer: 1,
    explanation: "Bagi pelajar, bentuk bela negara non-fisik diwujudkan melalui pengabdian sesuai profesi: tekun belajar, menjauhi narkoba, tidak terlibat perundungan (bullying), serta mengharumkan nama bangsa melalui prestasi."
  },
  {
    id: "q-9-3",
    grade: "9",
    topic: "Bhinneka Tunggal Ika",
    question: "Dalam masyarakat majemuk, sikap primordialisme dan etnosentrisme yang berlebihan dapat memicu disintegrasi bangsa. Cara paling efektif untuk menangkal sikap tersebut di sekolah adalah...",
    options: [
      "Hanya berteman akrab dengan kawan yang berasal dari satu daerah asal saja",
      "Mengadakan kegiatan kolaborasi antarseluruh siswa yang beragam serta membiasakan sikap empati lintas latar belakang",
      "Menghindari diskusi tentang kebudayaan daerah lain",
      "Membanding-bandingkan tarian daerah sendiri dengan tarian daerah kawan"
    ],
    answer: 1,
    explanation: "Kolaborasi positif dalam kegiatan belajar, proyek P5, dan interaksi sosial harian melatih siswa melihat keberagaman sebagai keindahan pelangi nusantara, bukan sebagai pemecah belah."
  }
];

export const timedQuizPool = [
  {
    id: "tq-1",
    question: "Siapakah tokoh yang mengusulkan rumusan dasar negara 'Peri Kebangsaan, Peri Kemanusiaan, Peri Ketuhanan, Peri Kerakyatan, dan Kesejahteraan Rakyat' pada 29 Mei 1945?",
    options: ["Mr. Soepomo", "Mr. Mohammad Yamin", "Ir. Soekarno", "Drs. Mohammad Hatta"],
    answer: 1,
    points: 20
  },
  {
    id: "tq-2",
    question: "Sila kedua Pancasila, 'Kemanusiaan yang Adil dan Beradab', dilambangkan dengan simbol...",
    options: ["Bintang Emas", "Pohon Beringin", "Rantai Emas Berbentuk Bulat dan Persegi", "Kepala Banteng"],
    answer: 2,
    points: 20
  },
  {
    id: "tq-3",
    question: "Pasal dalam UUD NRI 1945 yang menegaskan bahwa 'Negara Indonesia adalah negara hukum' termaktub dalam...",
    options: ["Pasal 1 ayat (1)", "Pasal 1 ayat (2)", "Pasal 1 ayat (3)", "Pasal 2 ayat (1)"],
    answer: 2,
    points: 20
  },
  {
    id: "tq-4",
    question: "Perilaku yang mencerminkan pengamalan sila ke-3 Pancasila 'Persatuan Indonesia' dalam kehidupan bertetangga adalah...",
    options: [
      "Mengadakan ronda malam bersama dan gotong royong membersihkan saluran air",
      "Membunyikan musik keras saat tetangga sedang beribadah",
      "Hanya menyapa tetangga yang memiliki status sosial sama",
      "Menolak ikut kerja bakti dengan alasan sibuk bermain game"
    ],
    answer: 0,
    points: 20
  },
  {
    id: "tq-5",
    question: "Prinsip utama dalam musyawarah untuk mufakat sesuai sila ke-4 Pancasila adalah...",
    options: [
      "Keputusan diambil berdasarkan siapa yang bicaranya paling lantang",
      "Mengutamakan kepentingan bersama dengan akal sehat dan hati nurani yang luhur",
      "Memaksakan pandangan pribadi sampai orang lain menyerah",
      "Menerima keputusan hanya jika sesuai dengan keinginan diri sendiri"
    ],
    answer: 1,
    points: 20
  }
];

export const pancasilaMatchingData = [
  {
    sila: 1,
    nama: "Ketuhanan Yang Maha Esa",
    simbol: "Bintang Emas",
    iconName: "Star",
    deskripsi: "Cahaya kerohanian yang dipancarkan Tuhan Yang Maha Esa kepada setiap insan manusia.",
    pengamalanSekolah: "Menghormati teman yang sedang beribadah atau berpuasa, tidak memaksakan keyakinan kepada orang lain."
  },
  {
    sila: 2,
    nama: "Kemanusiaan yang Adil dan Beradab",
    simbol: "Rantai Emas",
    iconName: "Link",
    deskripsi: "Mata rantai bulat (wanita) dan persegi (pria) yang saling bertautan melambangkan hubungan sesama manusia yang bersatu padu.",
    pengamalanSekolah: "Menolong teman yang terjatuh atau kesulitan, serta menjunjung tinggi sikap anti-perundungan (stop bullying)."
  },
  {
    sila: 3,
    nama: "Persatuan Indonesia",
    simbol: "Pohon Beringin",
    iconName: "TreePine",
    deskripsi: "Pohon besar berakar tunjang kuat tempat berteduh seluruh rakyat Indonesia yang majemuk dalam naungan satu bangsa.",
    pengamalanSekolah: "Berteman tanpa membeda-bedakan suku dan daerah, serta bangga menyanyikan lagu Indonesia Raya saat upacara."
  },
  {
    sila: 4,
    nama: "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan",
    simbol: "Kepala Banteng",
    iconName: "ShieldAlert",
    deskripsi: "Hewan sosial yang suka berkumpul, melambangkan budaya musyawarah saat mengambil keputusan bersama.",
    pengamalanSekolah: "Musyawarah pembagian jadwal piket kelas dan pemilihan pengurus kelas secara tertib dan sportif."
  },
  {
    sila: 5,
    nama: "Keadilan Sosial bagi Seluruh Rakyat Indonesia",
    simbol: "Padi dan Kapas",
    iconName: "Wheat",
    deskripsi: "Pangan (padi) dan sandang (kapas) sebagai kebutuhan pokok dasar demi terwujudnya kemakmuran merata.",
    pengamalanSekolah: "Menghargai hasil karya teman, gemar menabung, dan tidak bersikap boros maupun bergaya hidup pamer di sekolah."
  }
];

export const misiNusantaraCases = [
  {
    id: "misi-1",
    title: "Kasus Kantin: Membela Sahabat dari Diskriminasi",
    situation: "Saat jam istirahat di kantin, kamu mendengar sekelompok siswa menertawakan aksen bahasa daerah seorang siswa baru yang baru pindah dari daerah lain. Siswa baru tersebut terlihat sedih dan menunduk malu.",
    choices: [
      {
        text: "Ikut tertawa sebentar agar dianggap seru oleh teman-teman lain di kantin.",
        correct: false,
        scoreDelta: -10,
        feedback: "Tindakan ini menyakiti hati kawan dan melanggar prinsip kemanusiaan serta persatuan bangsa. Kita tidak boleh menjadi saksi pasif diskriminasi!"
      },
      {
        text: "Mendatangi siswa baru tersebut, mengajaknya duduk bersama dengan ramah, dan menegur teman-teman secara sopan bahwa keberagaman aksen adalah kekayaan nusantara.",
        correct: true,
        scoreDelta: 25,
        feedback: "Luar biasa! Kamu mengamalkan Sila ke-2 dan ke-3 secara nyata: memiliki empati tinggi dan menjaga martabat sesama anak bangsa."
      },
      {
        text: "Membiarkan saja karena merasa bukan urusan pribadi dan tidak ingin cari masalah.",
        correct: false,
        scoreDelta: 5,
        feedback: "Diam saat melihat ketidakadilan memang tidak menambah masalah langsung, namun Pelajar Pancasila sejati memiliki keberanian moral untuk peduli sesama."
      }
    ]
  },
  {
    id: "misi-2",
    title: "Dilema Ujian PPKn: Kertas Rahasia di Kolong Meja",
    situation: "Saat penilaian harian PPKn berlangsung, teman sebangkumu menyelipkan catatan sontekan ke atas mejamu dan memberi isyarat agar kamu ikut menyalinnya agar nilai kalian berdua sama-sama tinggi.",
    choices: [
      {
        text: "Segera menyalin jawaban agar nilai rapor aman dan tidak mengecewakan orang tua.",
        correct: false,
        scoreDelta: -15,
        feedback: "Nilai tinggi dari hasil ketidakjujuran tidak ada artinya. Integritas dan kejujuran adalah pilar utama seorang warga negara yang bermartabat!"
      },
      {
        text: "Menolak tawaran sontekan secara tegas namun tenang, mengembalikan kertasnya, dan tetap fokus mengerjakan soal sendiri dengan jujur.",
        correct: true,
        scoreDelta: 25,
        feedback: "Hebat! Kamu membuktikan integritas diri. Kejujuran saat ujian adalah latihan moral terpenting untuk mencegah korupsi di masa depan."
      },
      {
        text: "Menerima kertas sontekan tapi tidak dibaca, lalu ditaruh kembali saat guru melihat.",
        correct: false,
        scoreDelta: 0,
        feedback: "Sikap ragu-ragu dapat menimbulkan kesalahpahaman dan risiko ikut terseret tuduhan melanggar aturan ujian."
      }
    ]
  },
  {
    id: "misi-3",
    title: "Musyawarah P5: Perbedaan Pendapat Desain Stan",
    situation: "Kelompokmu sedang merancang stan Pameran Budaya P5. Terjadi perdebatan sengit antara dua anggota kelompok mengenai tema adat yang akan diangkat. Suasana mulai memanas dan keduanya enggan mengalah.",
    choices: [
      {
        text: "Mengajukan kompromi kreatif dengan menggabungkan elemen khas kedua budaya secara harmonis, lalu voting secara terbuka dan sportif jika diperlukan.",
        correct: true,
        scoreDelta: 25,
        feedback: "Tepat sekali! Jiwa musyawarah mufakat (Sila ke-4) mengutamakan solusi kolaboratif yang merangkul semua gagasan dengan kepala dingin."
      },
      {
        text: "Mendukung salah satu pihak yang paling kamu sukai agar pihak lawan kalah suara.",
        correct: false,
        scoreDelta: -5,
        feedback: "Memilih berdasarkan rasa suka pribadi bukan cerminan musyawarah yang bijaksana. Hendaknya keputusan didasarkan pada manfaat bersama."
      },
      {
        text: "Keluar dari kelompok dan meminta Bu Riska memindahkanmu ke kelompok lain.",
        correct: false,
        scoreDelta: -10,
        feedback: "Menghindari tantangan kerja sama tidak melatih kedewasaan. Masalah perbedaan pendapat harus diselesaikan bersama secara dewasa."
      }
    ]
  }
];

export const defaultLeaderboard = [
  { rank: 1, name: "Ahmad Farhan", grade: "Kelas 8B", score: 980, badge: "Pilar Negara", school: "SMPN 1" },
  { rank: 2, name: "Nayla Putri Kirana", grade: "Kelas 9A", score: 940, badge: "Ksatria Konstitusi", school: "SMPN 3" },
  { rank: 3, name: "Bima Arya Wijaya", grade: "Kelas 7C", score: 910, badge: "Duta Bhinneka", school: "SMPN 2" },
  { rank: 4, name: "Siti Rahmawati", grade: "Kelas 8A", score: 870, badge: "Siswa Teladan", school: "SMPN 1" },
  { rank: 5, name: "Kevin Jonathan", grade: "Kelas 9C", score: 850, badge: "Pelajar Pancasila", school: "SMPN 4" },
  { rank: 6, name: "Dewi Sekar Ayu", grade: "Kelas 7A", score: 820, badge: "Pelajar Pancasila", school: "SMPN 1" },
];

export const portfolioData = {
  p5Projects: [
    {
      id: "p5-1",
      title: "Gelar Karya Bhinneka: Festival Kuliner & Pakaian Adat Nusantara",
      theme: "Bhinneka Tunggal Ika",
      date: "Semester Ganjil 2023/2024",
      description: "Siswa kelas 7 dan 8 mengeksplorasi keanekaragaman budaya suku-suku di Indonesia melalui simulasi festival budaya mini, meracik kuliner tradisional dan menceritakan filosofi pakaian adat.",
      impact: "Meningkatkan penghargaan terhadap perbedaan budaya di kalangan 320 siswa SMP.",
      tag: "Proyek Kolaboratif"
    },
    {
      id: "p5-2",
      title: "Suara Demokrasi: Simulasi Pemilu OSIS Berbasis Asas Luber Jurdil",
      theme: "Suara Demokrasi",
      date: "Oktober 2023",
      description: "Edukasi proses pemilihan kepemimpinan sekolah lengkap dengan tahapan kampanye damai, debat visi-misi kandidat, hingga pemungutan suara berintegritas.",
      impact: "100% partisipasi pemilih pemula sekolah dengan pemahaman hak suara tanpa golput.",
      tag: "Pendidikan Politik Sehat"
    },
    {
      id: "p5-3",
      title: "Kearifan Lokal: Revitalisasi Permainan Tradisional Penguat Gotong Royong",
      theme: "Kearifan Lokal & Karakter",
      date: "Februari 2024",
      description: "Menghidupkan kembali permainan tradisional seperti Gobak Sodor, Bentengan, dan Egrang sebagai sarana melatih sportivitas dan interaksi tatap muka non-gadget.",
      impact: "Menurunkan kecanduan gawai saat jam istirahat dan merekatkan persahabatan antarkelas.",
      tag: "Pendidikan Karakter"
    }
  ],
  modules: [
    {
      id: "mod-1",
      title: "Modul Ajar PPKn Fase D: Meneladani Nilai Juang Perumus Pancasila",
      grade: "Kelas 7",
      format: "PDF (18 Halaman)",
      features: "Dilengkapi LKPD Berbasis Refleksi Cerita, Rubrik Penilaian Sikap, dan Rubrik Proyek Kelompok",
      downloadNote: "Dapat digunakan bebas oleh sesama rekan guru PPKn SMP se-Indonesia."
    },
    {
      id: "mod-2",
      title: "Modul Ajar: Menjunjung Kedaulatan Hukum & Tata Urutan Perundang-Undangan",
      grade: "Kelas 8",
      format: "PDF (22 Halaman)",
      features: "Studi Kasus Pelanggaran Norma Keseharian dan Simulasi Sidang Musyawarah Kelas",
      downloadNote: "Disusun sesuai capaian pembelajaran Kurikulum Merdeka terkini."
    },
    {
      id: "mod-3",
      title: "Panduan Penguatan Hak & Kewajiban Warga Negara Muda",
      grade: "Kelas 9",
      format: "PDF (16 Halaman)",
      features: "Bahan Literasi Konstitusi Digital & Lembar Analisis Berita Hoaks",
      downloadNote: "Membantu melatih nalar kritis siswa menghadapi arus informasi digital."
    }
  ],
  certificates: [
    "Sertifikat Pendidik Profesional Kemendikbudristek",
    "Pelatihan Fasilitator Pembelajaran Mendalam Kurikulum Merdeka",
    "Penghargaan Guru Inovator Konten Edukasi Interaktif Tingkat Kabupaten",
    "Bimtek Guru PPKn Penggerak Penguatan Karakter Profil Pelajar Pancasila"
  ]
};

// ==============================================================================
// HELPER STORAGE PERSISTENCE UNTUK ADMIN CMS
// ==============================================================================

export function getStoredQuestions() {
  if (typeof window === 'undefined') return questionBank;
  const raw = localStorage.getItem('admin_custom_questions');
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      // fallback
    }
  }
  return questionBank;
}

export function saveStoredQuestions(questions) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_custom_questions', JSON.stringify(questions));
  }
}

export function getStoredProfile() {
  if (typeof window === 'undefined') return teacherProfile;
  const raw = localStorage.getItem('admin_custom_profile');
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // fallback
    }
  }
  return teacherProfile;
}

export function saveStoredProfile(profile) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_custom_profile', JSON.stringify(profile));
  }
}

export function getStoredTimeline() {
  if (typeof window === 'undefined') return teacherTimeline;
  const raw = localStorage.getItem('admin_custom_timeline');
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      // fallback
    }
  }
  return teacherTimeline;
}

export function saveStoredTimeline(timeline) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_custom_timeline', JSON.stringify(timeline));
  }
}

export function getStoredPortfolio() {
  if (typeof window === 'undefined') return portfolioData;
  const raw = localStorage.getItem('admin_custom_portfolio');
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // fallback
    }
  }
  return portfolioData;
}

export function saveStoredPortfolio(portfolio) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_custom_portfolio', JSON.stringify(portfolio));
  }
}

export function getStoredConsultations() {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem('local_consultations');
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // fallback
    }
  }
  return [
    {
      id: "inq-1",
      student_name: "Rizky Ramadhan",
      grade: "Kelas 8",
      contact: "08123456789",
      message: "Bu Riska, untuk tugas proyek P5 tema suara demokrasi, apakah kami boleh membuat video simulasi debat pemilihan ketua OSIS?",
      status: "Belum Dibaca",
      created_at: new Date(Date.now() - 3600000 * 2).toISOString()
    },
    {
      id: "inq-2",
      student_name: "Alya Zahra",
      grade: "Kelas 7",
      contact: "alya.zahra@smp.sch.id",
      message: "Permisi Bu, perbedaan mendasar antara norma hukum dan norma kesopanan saat ulangan harian apa ya bu? Masih agak bingung.",
      status: "Dalam Proses",
      created_at: new Date(Date.now() - 3600000 * 24).toISOString()
    }
  ];
}

export function saveStoredConsultations(consultations) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('local_consultations', JSON.stringify(consultations));
  }
}

export function getStoredLeaderboard() {
  if (typeof window === 'undefined') return defaultLeaderboard;
  const raw = localStorage.getItem('local_leaderboard');
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      // fallback
    }
  }
  return defaultLeaderboard;
}

export function saveStoredLeaderboard(board) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('local_leaderboard', JSON.stringify(board));
  }
}

// ==============================================================================
// KATALOG BANK SOAL SIAP UNDUH GRATIS (MARKETPLACE STYLE)
// ==============================================================================

export const defaultBankSoalDownloads = [
  {
    id: "dl-1",
    title: "Paket Asesmen Sumatif Akhir Semester (SAS) PPKn Kelas 7 Kurikulum Merdeka",
    grade: "Kelas 7",
    semester: "Semester 1 & 2",
    format: "Word (.DOCX) + PDF",
    fileSize: "2.4 MB",
    downloadCount: 1420,
    rating: 4.9,
    reviews: 128,
    isFree: true,
    description: "Kumpulan soal Sumatif Akhir Semester (SAS) Kurikulum Merdeka Fase D lengkap dengan kisi-kisi penulisan soal, kartu soal, kunci jawaban objektif, dan pedoman penskoran rubrik esai.",
    topics: ["Sejarah Perumusan Pancasila", "Norma dan UUD NRI 1945", "Kesatuan Indonesia & Karakteristik Daerah"],
    curriculum: "Kurikulum Merdeka",
    downloadUrl: "#download"
  },
  {
    id: "dl-2",
    title: "Bank Soal Pilihan Ganda & Uraian Analisis Kasus PPKn Kelas 8 (Format Word Siap Edit)",
    grade: "Kelas 8",
    semester: "Semester Ganjil & Genap",
    format: "Word (.DOCX)",
    fileSize: "1.8 MB",
    downloadCount: 980,
    rating: 4.8,
    reviews: 94,
    isFree: true,
    description: "Koleksi butir soal bertingkat nalar tinggi (HOTS) berbasis studi kasus pelanggaran konstitusi dan dinamika norma hukum di Indonesia untuk ulangan harian dan PTS.",
    topics: ["Kedudukan & Fungsi Pancasila", "Bentuk & Kedaulatan Negara", "Tata Urutan Peraturan Perundang-Undangan"],
    curriculum: "Kurikulum Merdeka",
    downloadUrl: "#download"
  },
  {
    id: "dl-3",
    title: "Paket Latihan Ujian Sekolah & Asesmen Standarisasi Pendidikan Kelas 9 SMP",
    grade: "Kelas 9",
    semester: "Ujian Kelulusan",
    format: "Word (.DOCX) + PDF Kunci",
    fileSize: "3.1 MB",
    downloadCount: 2150,
    rating: 5.0,
    reviews: 210,
    isFree: true,
    description: "5 paket simulasi soal Ujian Akhir Sekolah PPKn SMP lengkap dengan lembar jawaban komputer (LJK) dan pembahasan detail butir per butir dari materi Kelas 7 sampai 9.",
    topics: ["Dinamika Penerapan Pancasila", "Pokok Pikiran Pembukaan UUD 1945", "Bhinneka Tunggal Ika & Bela Negara"],
    curriculum: "Fase D Lengkap",
    downloadUrl: "#download"
  },
  {
    id: "dl-4",
    title: "Kumpulan Lembar Kerja Peserta Didik (LKPD) & Soal Formatif Reflektif Fase D",
    grade: "Kelas 7, 8, 9",
    semester: "Semua Semester",
    format: "Word (.DOCX)",
    fileSize: "4.2 MB",
    downloadCount: 1680,
    rating: 4.9,
    reviews: 142,
    isFree: true,
    description: "Perangkat lembar kerja siswa untuk menguji pemahaman harian dengan model refleksi nilai karakter Pelajar Pancasila, tugas kelompok, dan diskusi studi kasus moral.",
    topics: ["Hak & Kewajiban Warga Negara", "Gotong Royong & Kerja Sama", "Literasi Konstitusi Digital"],
    curriculum: "Kurikulum Merdeka",
    downloadUrl: "#download"
  },
  {
    id: "dl-5",
    title: "Mega Bundle Soal Ulangan Harian (UH) 1 Tahun Penuh Seluruh Bab PPKn SMP",
    grade: "Kelas 7, 8, 9",
    semester: "Semester 1 & 2",
    format: "ZIP Archive (.DOCX)",
    fileSize: "8.5 MB",
    downloadCount: 3200,
    rating: 5.0,
    reviews: 350,
    isFree: true,
    description: "Arsip lengkap soal ulangan harian per bab Kurikulum Merdeka dari Bab 1 hingga Bab 6 untuk guru PPKn yang membutuhkan bank soal siap pakai dan mudah dimodifikasi.",
    topics: ["Pancasila", "UUD NRI 1945", "Bhinneka Tunggal Ika", "NKRI"],
    curriculum: "Kurikulum Merdeka",
    downloadUrl: "#download"
  }
];

export function getStoredBankSoalDownloads() {
  if (typeof window === 'undefined') return defaultBankSoalDownloads;
  const raw = localStorage.getItem('admin_bank_soal_downloads');
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      // fallback
    }
  }
  return defaultBankSoalDownloads;
}

export function saveStoredBankSoalDownloads(items) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_bank_soal_downloads', JSON.stringify(items));
  }
}

// ==============================================================================
// KATALOG PRODUK DIGITAL MARKETPLACE
// ==============================================================================

export const defaultDigitalProducts = [
  {
    id: "prod-1",
    title: "Paket Lengkap Modul Ajar PPKn Fase D 1 Tahun Penuh (Kelas 7, 8, 9)",
    category: "Modul Ajar",
    price: 49000,
    originalPrice: 99000,
    rating: 5.0,
    salesCount: 480,
    badge: "Best Seller",
    thumbnailText: "MODUL AJAR 1 TAHUN",
    color: "from-blue-600 to-indigo-700",
    description: "Dokumen administrasi guru PPKn Kurikulum Merdeka terlengkap mencakup Alur Tujuan Pembelajaran (ATP), Modul Ajar siap cetak/edit, LKPD siswa, bahan ajar, dan instrumen asesmen diagnostik, formatif, serta sumatif.",
    features: [
      "File Microsoft Word (.docx) 100% bisa diedit",
      "Sesuai Capaian Pembelajaran (CP) terbaru",
      "Bonus Alur Tujuan Pembelajaran (ATP) & Program Semester",
      "Dilengkapi Rubrik Penilaian & Lembar Observasi Karakter"
    ]
  },
  {
    id: "prod-2",
    title: "E-Book: Desain Pembelajaran PPKn Interaktif & Anti-Membosankan",
    category: "E-Book Guru",
    price: 35000,
    originalPrice: 65000,
    rating: 4.9,
    salesCount: 310,
    badge: "Rekomendasi",
    thumbnailText: "E-BOOK METODE MENGAJAR",
    color: "from-amber-500 to-gold-600",
    description: "Buku panduan praktis karya Riska Puspita, S.Pd. berisi 25 metode pembelajaran kreatif untuk mengubah persepsi belajar PPKn dari hafalan pasif menjadi eksplorasi kritis, studi kasus kelas, dan simulasi seru.",
    features: [
      "Format PDF Berkualitas Tinggi (140 Halaman)",
      "Langkah-langkah praktis simulasi sidang & pemilu kelas",
      "Teknik penilaian otentik tanpa pusing merekap",
      "Studi kasus nyata dinamika remaja SMP"
    ]
  },
  {
    id: "prod-3",
    title: "Bundle 35 Template Slide Canva & PPT Materi PPKn SMP Siap Mengajar",
    category: "Media Presentasi",
    price: 39000,
    originalPrice: 75000,
    rating: 4.9,
    salesCount: 420,
    badge: "Eksklusif Guru",
    thumbnailText: "35 SLIDE CANVA & PPT",
    color: "from-patriot-600 to-red-700",
    description: "Kumpulan template presentasi estetik, rapi, dan kaya visual bertema nasionalis modern untuk mengajar di kelas maupun presentasi supervisi kepala sekolah.",
    features: [
      "Link Template Canva Siap Duplikat & File .PPTX",
      "Animasi transisi halus dan ilustrasi profesional",
      "Mencakup seluruh bab Kelas 7, 8, dan 9",
      "Bisa diedit di HP, laptop, atau tablet"
    ]
  },
  {
    id: "prod-4",
    title: "Master Kit Modul Proyek P5 SMP (Bhinneka, Suara Demokrasi, Kearifan Lokal)",
    category: "Proyek P5",
    price: 29000,
    originalPrice: 59000,
    rating: 4.8,
    salesCount: 260,
    badge: "Praktis",
    thumbnailText: "MASTER KIT P5",
    color: "from-emerald-600 to-teal-700",
    description: "Panduan fasilitator proyek Penguatan Profil Pelajar Pancasila siap pakai, dilengkapi modul proyek rinci, jadwal aktivitas mingguan, lembar kerja siswa, dan rubrik penilaian rapor P5.",
    features: [
      "3 Tema P5 Lengkap untuk SMP",
      "Format Rapor & Rubrik Asesmen Siap Pakai",
      "Panduan Gelar Karya Siswa & Pameran Budaya",
      "File DOCX dan PDF"
    ]
  }
];

export function getStoredDigitalProducts() {
  if (typeof window === 'undefined') return defaultDigitalProducts;
  const raw = localStorage.getItem('admin_digital_products');
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      // fallback
    }
  }
  return defaultDigitalProducts;
}

export function saveStoredDigitalProducts(items) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_digital_products', JSON.stringify(items));
  }
}

// ==============================================================================
// PENGATURAN HALAMAN WEBSITE (PAGE SETTINGS)
// ==============================================================================

export const defaultPageSettings = {
  general: {
    siteName: "Ruang PPKn Interaktif",
    teacherName: "Riska Puspita, S.Pd.",
    teacherRole: "Pendidik Pendidikan Pancasila SMP",
    schoolLocation: "Jawa Barat, Indonesia"
  },
  contact: {
    title: "Hubungi & Konsultasi Bersama Bu Riska",
    subtitle: "Punya pertanyaan seputar materi PPKn, modul kurikulum merdeka, atau kerja sama pelatihan guru? Silakan hubungi melalui saluran komunikasi resmi berikut.",
    whatsappNumber: "6281234567890",
    whatsappDisplay: "+62 812-3456-7890",
    whatsappNote: "Respon cepat pada hari kerja (Senin - Jumat: 08.00 - 16.00 WIB)",
    email: "riska.puspita.ppkn@gmail.com",
    instagramUrl: "https://instagram.com",
    youtubeUrl: "https://youtube.com",
    tiktokUrl: "https://tiktok.com",
    location: "SMP Negeri Indonesia, Jawa Barat"
  },
  bankSoal: {
    heroTitle: "Katalog Bank Soal PPKn SMP (100% Gratis)",
    heroSubtitle: "Perangkat evaluasi dan paket soal sumatif, formatif, serta latihan ujian sekolah yang dapat diunduh bebas oleh seluruh guru PPKn se-Indonesia untuk kemajuan pendidikan anak bangsa."
  },
  products: {
    heroTitle: "Marketplace Produk Digital Guru PPKn",
    heroSubtitle: "Koleksi modul ajar 1 tahun lengkap, slide presentasi Canva siap pakai, dan e-book inovasi pembelajaran karya Riska Puspita, S.Pd. untuk mempermudah administrasi mengajar Anda."
  }
};

export function getStoredPageSettings() {
  if (typeof window === 'undefined') return defaultPageSettings;
  const raw = localStorage.getItem('admin_page_settings');
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      return { ...defaultPageSettings, ...parsed };
    } catch {
      // fallback
    }
  }
  return defaultPageSettings;
}

export function saveStoredPageSettings(settings) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_page_settings', JSON.stringify(settings));
  }
}


