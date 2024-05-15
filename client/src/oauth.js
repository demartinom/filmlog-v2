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
    options: {
      redirectTo: "/redirect",
    },
  });
  if (error) {
    console.error("Error signing in with Google:", error.message);
  }
};

export const signInWithGitHub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "/redirect",
    },
  });
  if (error) {
    console.error("Error signing in with GitHub:", error.message);
  }
};

export const signInAnonymous = async () => {
  const { error } = await supabase.auth.signInAnonymously();
  window.location.reload();
  if (error) {
    console.error(error);
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
export const fetchData = async () => {
  const { data } = await supabase.auth.getSession();
  return data;
};
