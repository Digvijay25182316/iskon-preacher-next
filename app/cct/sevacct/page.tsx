import Seva from "@/components/ScreensCCT/SevaCCT";
import React from "react";
import data from "@/lib/Counselors.json";
function page() {
  console.log(
    typeof data[0].MatajiName,
    typeof data[0].MatajiPhone,
    typeof data[0].PrabhujiName,
    typeof data[0].PrabhujiPhone
  );
  return (
    <div>
      <Seva data={data} />
    </div>
  );
}

export default page;
