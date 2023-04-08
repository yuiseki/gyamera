/* eslint-disable @next/next/no-img-element */
import useSWR from "swr";
import { swrFetcher } from "@/lib/swrFetcher";

export const GyazoUserInfo: React.FC = () => {
  const { data } = useSWR("/api/gyazo/me", swrFetcher);
  return (
    <div>
      {data ? (
        <>
          <span>
            Logged in Gyazo as{" "}
            <img
              width={20}
              height={20}
              src={data.user.profile_image}
              alt="Profile image of Gyazo"
              title={`${data.user.name} ({data.user.email})`}
            />
          </span>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};
