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
      redirectTo: "http://localhost:5173/redirect",
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
      redirectTo: "http://localhost:5173/redirect",
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
async function fetchData() {
  const { data } = await supabase.auth.getSession();
  return data
}

export const data =fetchData();