import Seva from "@/components/ScreensCCT/SevaCCT";
import React from "react";
import data from "@/lib/Counselors.json";
function page({ searchParams }: { searchParams: { query: string | number } }) {
  const results = data.filter((item: any) => {
    for (const key in item) {
      const value = item[key];
      if (typeof value === "string") {
        if (
          value
            .toLowerCase()
            .includes(searchParams.query?.toString().toLowerCase())
        ) {
          return true;
        }
      } else if (typeof value === "number") {
        if (
          value
            .toString()
            .toLowerCase()
            .includes(searchParams.query?.toString().toLowerCase())
        ) {
          return true;
        }
      }
    }
    return false;
  });
  return (
    <div>
      <Seva data={results.length > 0 ? results : data} />
    </div>
  );
}

export default page;
