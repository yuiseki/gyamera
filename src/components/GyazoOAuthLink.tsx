import { useLocalStorage } from "@/hooks/localStorage";
import { useEffect, useState } from "react";

const gyameraOauthClientId = "XVZ7yDs0ZSaO0Hey5eoclbBujB26571qcu0y1IqfAqc";

export const GyazoOAuthLink = () => {
  const [gyazoOauthState, setGyazoOauthState] = useLocalStorage(
    "gyamera-oauth-state",
    ""
  );

  const oauthCodeFromUrlParams = new URL(window.location.href).searchParams.get(
    "code"
  );
  const oauthStateFromUrlParams = new URL(
    window.location.href
  ).searchParams.get("state");

  const [gyazoOauthUrl, setGyazoOauthUrl] = useState<string | undefined>();

  useEffect(() => {
    if (gyazoOauthState.length === 0) {
      const randomString = (Math.random() + 1).toString(32).substring(2);
      console.info(randomString);
      setGyazoOauthState(randomString);
    }
  }, [gyazoOauthState, setGyazoOauthState]);

  useEffect(() => {
    const gyazoOAuthUrlToBuild = new URL(`https://gyazo.com/oauth/authorize`);
    gyazoOAuthUrlToBuild.searchParams.set("client_id", gyameraOauthClientId);
    gyazoOAuthUrlToBuild.searchParams.set("redirect_uri", window.location.href);
    gyazoOAuthUrlToBuild.searchParams.set("response_type", "code");
    gyazoOAuthUrlToBuild.searchParams.set("state", gyazoOauthState);
    setGyazoOauthUrl(gyazoOAuthUrlToBuild.href);
  }, [gyazoOauthState]);

  useEffect(() => {
    const getToken = async () => {
      if (oauthCodeFromUrlParams !== null && oauthStateFromUrlParams !== null) {
        const res = await fetch("/api/gyazo/oauth/token", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            code: oauthCodeFromUrlParams,
          }),
        });
        if (res.status === 200) {
          const json = await res.json();
          if ("access_token" in json) {
            document.cookie = `Gyamera_access_token=${json.access_token}`;
            location.href = "/";
          }
        } else {
          console.log(res.status);
          location.href = "/";
        }
      }
    };
    getToken();
  }, [oauthCodeFromUrlParams, oauthStateFromUrlParams]);

  if (
    gyazoOauthUrl &&
    oauthCodeFromUrlParams === null &&
    oauthStateFromUrlParams === null
  ) {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center" }}>
        <a href={gyazoOauthUrl}>
          <b>Login with Gyazo</b>
        </a>
      </div>
    );
  }

  if (oauthCodeFromUrlParams !== null && oauthStateFromUrlParams !== null) {
    return <div>Authorize now... Please wait...</div>;
  }

  return (
    <div>
      <span>Loading...</span>
    </div>
  );
};
