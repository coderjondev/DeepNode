import { LineShadowText } from "@/components/ui/line-shadow-text";

const page = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="uppercase text-5xl leading-none font-semibold tracking-tighter text-balance sm:text-6xl md:text-7xl lg:text-8xl">
        Coming <LineShadowText className="italic">Soon</LineShadowText>
      </h1>
    </div>
  );
};

export default page;
