/* eslint-disable @next/next/no-img-element */
import useSWR from "swr";
import { swrFetcher } from "@/lib/swrFetcher";
import React, { useCallback } from "react";

type GyazoCollection = {
  id: string;
  url: string;
  name: string;
  is_editable: boolean;
  list_updated_at: string;
  owned_by_current_user: boolean;
  total_image_count: number;
};

export const GyazoCollectionSelector: React.FC<{
  lastCollectionId: string;
  onChangeCollection?: (collectionId: string) => void;
}> = ({ lastCollectionId, onChangeCollection }) => {
  const { data } = useSWR("/api/gyazo/collections", swrFetcher);

  const onChange = useCallback(
    (e: React.FormEvent<HTMLSelectElement>) => {
      console.log(e.currentTarget.value);
      onChangeCollection && onChangeCollection(e.currentTarget.value);
    },
    [onChangeCollection]
  );

  return (
    <div style={{ maxWidth: "100vw", textAlign: "center" }}>
      {data ? (
        <select
          className="gyazoCollectionSelect"
          onChange={onChange}
          defaultValue={lastCollectionId}
          required
          style={{
            fontSize: "1.1em",
            lineHeight: "2em",
            height: "2em",
            maxWidth: "100%",
          }}
        >
          <option value="">Select Gyazo collection</option>
          {data.collections &&
            data.collections.map((collection: GyazoCollection) => {
              return (
                <option key={collection.id} value={collection.id}>
                  {collection.name} ({collection.total_image_count} images)
                </option>
              );
            })}
        </select>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};
