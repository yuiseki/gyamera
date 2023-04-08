/* eslint-disable @next/next/no-img-element */
import useSWR from "swr";
import { swrFetcher } from "@/lib/swrFetcher";

type CollectionImage = {
  alias_id: string;
  image_id: string;
  url: string;
  grid_thumbs: {
    large_url: string;
    medium_url: string;
  };
};

export const GyazoCollectionImages: React.FC<{ collectionId: string }> = ({
  collectionId,
}) => {
  const { data } = useSWR(
    collectionId
      ? `https://gyazo.com/collections/${collectionId}.json`
      : undefined,
    swrFetcher
  );

  return (
    <>
      {data ? (
        <div style={{ textAlign: "center" }}>
          {data.images ? (
            data.images.map((image: CollectionImage) => {
              return (
                <img
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "contain",
                    textAlign: "center",
                  }}
                  key={image.alias_id}
                  src={image.grid_thumbs.medium_url}
                  alt="Image from selected Gyazo collection"
                />
              );
            })
          ) : (
            <span>No images</span>
          )}
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
};
