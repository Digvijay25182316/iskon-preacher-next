import Seva from "@/components/ScreensCCT/SevaCCT";
import React from "react";
import data from "@/lib/Counselors.json";
function page() {
  const sorted = [...data].sort((a, b) => {
    if (a.PrabhujiName && b.PrabhujiName) {
      return a.PrabhujiName.localeCompare(b.PrabhujiName);
    } else if (!a.PrabhujiName && !b.PrabhujiName) {
      return a.MatajiName.localeCompare(b.MatajiName);
    } else if (!a.PrabhujiName) {
      return a.MatajiName.localeCompare(b.PrabhujiName || b.MatajiName);
    } else {
      return a.PrabhujiName.localeCompare(b.MatajiName || b.PrabhujiName);
    }
  });
  return (
    <div>
      <Seva data={sorted} />
    </div>
  );
}

export default page;
