import { getToken } from "@/services/Api";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export function useToken() {
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (e) {
      return true;
    }
  };
  const navigate = useNavigate();
  const {
    data: token,
    isLoading: tokenLoading,
    error: tokenError,
  } = useQuery({
    queryKey: ["token"],
    queryFn: () => getToken(),
    onSuccess: (data) => {
      if (!data) {
        navigate("/login");
      } else {
        if (isTokenExpired(data)) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      }
    },
    onError: (error) => {
      console.log(error);
      navigate("/login");
    },
  });
  return { token, tokenLoading, tokenError };
}
