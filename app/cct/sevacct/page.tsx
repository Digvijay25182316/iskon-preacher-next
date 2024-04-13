import Seva from "@/components/ScreensCCT/SevaCCT";
import React from "react";
import data from "@/lib/Counselors.json";
function page() {
  return (
    <div>
      <Seva data={data} />
    </div>
  );
}

export default page;
