import { useEffect } from "react";
import { useRouter } from "next/router";
import { hasAccessToken } from "./utility";

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    if (!hasAccessToken()) {
      router.push("/login"); // Redirigir a la página de inicio de sesión si falta accessToken
    }
  }, []);
};

export const noAuth = () => {
  const router = useRouter();

  useEffect(() => {
    if (hasAccessToken()) {
      router.push("/"); // Redirigir a la página incial si existe accessToken
    }
  }, []);
};