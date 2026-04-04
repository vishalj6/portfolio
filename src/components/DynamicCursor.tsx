import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("./CustomCursor"));

export default function DynamicCursor() {
  return <CustomCursor />;
}
