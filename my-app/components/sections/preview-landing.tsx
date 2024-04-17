import Image from "next/image";
import demoImage from "@/public/Demo.svg";

export function PreviewLanding() {
  return (
    <div className="pb-6 sm:pb-16">
      <div className="container max-w-7xl">
        <div className="rounded-xl bg-muted/30 p-4 ring-1 ring-inset ring-border">
          <div className="relative aspect-video overflow-hidden rounded-lg border">
            <Image
              className="size-full object-cover object-center"
              
              alt="preview of dashboard"
              priority={true}
              src={demoImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
