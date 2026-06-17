alter table profiles enable row level security;
alter table vehicles enable row level security;
alter table user_settings enable row level security;

drop policy if exists "profiles_select_own" on profiles;
drop policy if exists "profiles_insert_own" on profiles;
drop policy if exists "profiles_update_own" on profiles;

create policy "profiles_select_own"
  on profiles
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "profiles_insert_own"
  on profiles
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "profiles_update_own"
  on profiles
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "vehicles_select_own" on vehicles;
drop policy if exists "vehicles_insert_own" on vehicles;
drop policy if exists "vehicles_update_own" on vehicles;

create policy "vehicles_select_own"
  on vehicles
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "vehicles_insert_own"
  on vehicles
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "vehicles_update_own"
  on vehicles
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "user_settings_select_own" on user_settings;
drop policy if exists "user_settings_insert_own" on user_settings;
drop policy if exists "user_settings_update_own" on user_settings;

create policy "user_settings_select_own"
  on user_settings
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "user_settings_insert_own"
  on user_settings
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "user_settings_update_own"
  on user_settings
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);