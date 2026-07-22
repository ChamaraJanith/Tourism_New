"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/store";
import { setCredentials, logOut, setInitialized } from "@/store/slices/authSlice";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        dispatch(setInitialized(true));
        return;
      }

      try {
        const res = await fetch(`/api/auth/me`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            dispatch(
              setCredentials({
                user: {
                  id: data.user.id,
                  email: data.user.email,
                  name: data.user.name,
                  profileId: data.user.profileId,
                  avatarUrl: data.user.avatarUrl,
                },
                token,
              })
            );
          } else {
            dispatch(logOut());
          }
        } else {
          // Token is invalid/expired
          dispatch(logOut());
        }
      } catch (error) {
        console.error("Failed to authenticate session:", error);
        // Do not logOut on network error, but we can't authenticate them right now.
      } finally {
        dispatch(setInitialized(true));
      }
    };

    initializeAuth();
  }, [dispatch]);

  return <>{children}</>;
}
