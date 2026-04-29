-- PadelData V3 — Supabase/PostgreSQL schema inicial

create extension if not exists "uuid-ossp";

create table clubs (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  city text,
  province text,
  website_url text,
  created_at timestamptz default now()
);

create table sources (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  source_type text not null check (source_type in ('official','club','social','manual','private_platform')),
  url text,
  captured_at timestamptz default now(),
  notes text
);

create table players (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  full_name text not null,
  gender text check (gender in ('Masculino','Femenino','Mixto','Desconocido')) default 'Desconocido',
  city text,
  province text,
  bio text,
  photo_url text,
  ranking_points integer default 1500,
  created_at timestamptz default now()
);

create table player_aliases (
  id uuid primary key default uuid_generate_v4(),
  player_id uuid references players(id) on delete cascade,
  alias text not null,
  source_id uuid references sources(id),
  created_at timestamptz default now()
);

create table tournaments (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  province text,
  city text,
  club_id uuid references clubs(id),
  category text,
  start_date date,
  end_date date,
  source_id uuid references sources(id),
  source_url text,
  verification_status text check (verification_status in ('Verificado','Verificado parcialmente','Pendiente','Rechazado')) default 'Pendiente',
  created_at timestamptz default now()
);

create table matches (
  id uuid primary key default uuid_generate_v4(),
  tournament_id uuid references tournaments(id) on delete cascade,
  round text,
  player1_id uuid references players(id),
  player2_id uuid references players(id),
  player3_id uuid references players(id),
  player4_id uuid references players(id),
  winner_pair integer check (winner_pair in (1,2)),
  score text,
  set1_pair1 integer,
  set1_pair2 integer,
  set2_pair1 integer,
  set2_pair2 integer,
  set3_pair1 integer,
  set3_pair2 integer,
  confidence_level text check (confidence_level in ('Alta','Media','Pendiente')) default 'Pendiente',
  source_id uuid references sources(id),
  created_at timestamptz default now()
);

create table ratings_history (
  id uuid primary key default uuid_generate_v4(),
  player_id uuid references players(id) on delete cascade,
  match_id uuid references matches(id) on delete set null,
  old_rating integer,
  new_rating integer,
  delta integer,
  reason text,
  created_at timestamptz default now()
);

create table submissions (
  id uuid primary key default uuid_generate_v4(),
  tournament_name text,
  submitted_data text not null,
  source_url text,
  submitter_email text,
  status text check (status in ('new','reviewing','approved','rejected')) default 'new',
  admin_notes text,
  created_at timestamptz default now()
);

create index idx_players_slug on players(slug);
create index idx_players_full_name on players using gin (to_tsvector('simple', full_name));
create index idx_tournaments_slug on tournaments(slug);
create index idx_matches_tournament on matches(tournament_id);
create index idx_matches_player1 on matches(player1_id);
create index idx_matches_player2 on matches(player2_id);
create index idx_matches_player3 on matches(player3_id);
create index idx_matches_player4 on matches(player4_id);
create index idx_submissions_status on submissions(status);
