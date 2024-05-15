import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// When user logs in or logs out, they are redirected to this page by SupaBase. This page redirects them to the proper home page URL
export default function Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null; // Since this component only handles redirection, it doesn't render anything
}
