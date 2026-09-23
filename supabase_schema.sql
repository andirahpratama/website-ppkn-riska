-- ==============================================================================
-- SKEMA DATABASE SUPABASE: RUANG PPKN INTERAKTIF - RISKA PUSPITA, S.Pd.
-- Salin dan jalankan seluruh isi skrip ini di SQL Editor dashboard Supabase Anda.
-- ==============================================================================

-- 1. Buat Tabel Bank Soal PPKn
CREATE TABLE IF NOT EXISTS public.questions (
    id TEXT PRIMARY KEY,
    grade VARCHAR(10) NOT NULL,
    topic VARCHAR(100) NOT NULL,
    question TEXT NOT NULL,
    options JSONB NOT NULL,
    answer INTEGER NOT NULL,
    explanation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Buat Tabel Leaderboard Real-Time
CREATE TABLE IF NOT EXISTS public.leaderboard (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    grade VARCHAR(50) NOT NULL,
    school VARCHAR(150) DEFAULT 'SMP',
    score INTEGER NOT NULL,
    badge VARCHAR(100) DEFAULT 'Pelajar Pancasila',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Buat Tabel Pojok Konsultasi "Sapa Bu Riska"
CREATE TABLE IF NOT EXISTS public.consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name VARCHAR(150) NOT NULL,
    grade VARCHAR(50) NOT NULL,
    contact VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Menunggu Balasan',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Buat Tabel Portofolio & Proyek P5
CREATE TABLE IF NOT EXISTS public.portfolio_p5 (
    id TEXT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    theme VARCHAR(100) NOT NULL,
    date_info VARCHAR(100),
    description TEXT NOT NULL,
    impact TEXT,
    tag VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Aktifkan Row Level Security (RLS)
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_p5 ENABLE ROW LEVEL SECURITY;

-- Policy: Publik dapat membaca pertanyaan dan portofolio
CREATE POLICY "Public Read Questions" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Public Read Portfolio" ON public.portfolio_p5 FOR SELECT USING (true);

-- Policy: Publik dapat membaca dan menambah skor leaderboard
CREATE POLICY "Public Read Leaderboard" ON public.leaderboard FOR SELECT USING (true);
CREATE POLICY "Public Insert Leaderboard" ON public.leaderboard FOR INSERT WITH CHECK (true);

-- Policy: Publik dapat mengirimkan pesan konsultasi sapa Bu Riska
CREATE POLICY "Public Insert Consultation" ON public.consultations FOR INSERT WITH CHECK (true);

-- Aktifkan Supabase Realtime untuk tabel leaderboard
ALTER PUBLICATION supabase_realtime ADD TABLE public.leaderboard;

-- ==============================================================================
-- DATA AWAL (SEED DATA)
-- ==============================================================================

INSERT INTO public.leaderboard (name, grade, school, score, badge) VALUES
('Ahmad Farhan', 'Kelas 8B', 'SMPN 1', 980, 'Pilar Negara'),
('Nayla Putri Kirana', 'Kelas 9A', 'SMPN 3', 940, 'Ksatria Konstitusi'),
('Bima Arya Wijaya', 'Kelas 7C', 'SMPN 2', 910, 'Duta Bhinneka'),
('Siti Rahmawati', 'Kelas 8A', 'SMPN 1', 870, 'Siswa Teladan'),
('Kevin Jonathan', 'Kelas 9C', 'SMPN 4', 850, 'Pelajar Pancasila')
ON CONFLICT DO NOTHING;
