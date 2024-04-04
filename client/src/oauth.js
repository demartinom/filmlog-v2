import { createClient } from "@supabase/supabase-js";

//Supabase client information
const supabaseUrl = "https://naexczynafocityunkwu.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Create client for using OAuth login
export const supabase = createClient(supabaseUrl, supabaseKey);

// Methods to sign in with various providers
export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.error("Error signing in with Google:", error.message);
  }
};

export const signInWithGitHub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
  if (error) {
    console.error("Error signing in with GitHub:", error.message);
  }
};

// Sign out of current session/account
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  }
};

// Get session information
export const { data } = await supabase.auth.getSession();
