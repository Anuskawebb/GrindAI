-- RLS Policies for 'public.profiles'
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (TRUE);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);
-- Note: Deleting profiles is usually handled by auth.users CASCADE DELETE, or restricted.

-- RLS Policies for 'public.skills'
CREATE POLICY "Users can view their own skills." ON public.skills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own skills." ON public.skills FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own skills." ON public.skills FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own skills." ON public.skills FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for 'public.tasks'
CREATE POLICY "Users can view their own tasks." ON public.tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own tasks." ON public.tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own tasks." ON public.tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own tasks." ON public.tasks FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for 'public.notes'
CREATE POLICY "Users can view their own notes." ON public.notes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own notes." ON public.notes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own notes." ON public.notes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own notes." ON public.notes FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for 'public.notifications'
CREATE POLICY "Users can view their own notifications." ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own notifications." ON public.notifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications." ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own notifications." ON public.notifications FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for 'public.ai_quizzes'
CREATE POLICY "Users can view their own AI quizzes." ON public.ai_quizzes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own AI quizzes." ON public.ai_quizzes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own AI quizzes." ON public.ai_quizzes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own AI quizzes." ON public.ai_quizzes FOR DELETE USING (auth.uid() = user_id);
