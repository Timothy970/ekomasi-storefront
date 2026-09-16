"use client";
import { ProductFeature } from "@/lib/features/types";
import { customParser } from "@/lib/utils";
import Image from "next/image";
import NoImage from "./NoImage";

export function FeaturePreview({ feature }: Readonly<{ feature: ProductFeature }>) {
    const {
        header,
        description,
        image_position = "Left",
        product_specifications = [],
        top_section = [],
        image,
    } = feature;

    const getImageSrc = (img: string | File | undefined): string | undefined => {
        if (!img) return undefined;
        if (typeof img === "string") return img;
        if (img instanceof File) return URL.createObjectURL(img);
        return undefined;
    };

    const src = getImageSrc(image);

    if (feature.design_type === "top-section") {
        return (
            <div className="mb-[2rem] lg:mb-[2.5rem] flex items-center justify-center flex-col w-full mx-auto text-center">
                <h2 className="text-[2rem] lg:text-[3rem] font-[700] mb-[1.5rem]">{header}</h2>

                {product_specifications.length > 0 && (
                    <div className="flex flex-col items-center justify-center mb-[2.5rem]">
                        {product_specifications.map((spec, idx) => (
                            <span key={`${spec}-${idx}`} className="text-[1.125rem] font-[400]">
                                -{spec}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex flex-col lg:flex-row w-full gap-x-[1rem] mt-[2.5rem] lg:mt-[5rem]">
                    <div className="flex flex-col items-center gap-y-[4rem] w-full max-w-lg lg:max-w-[20rem] text-center">
                        {top_section.slice(0, 2).map((sec, idx) => (
                            <SectionCard key={`${sec.title}-${idx}`} title={sec.title} description={sec.description} />
                        ))}
                    </div>

                    <div className="flex flex-col items-center gap-y-[4rem] w-full max-w-lg lg:max-w-[20rem] text-center">
                        {top_section.slice(2, 4).map((sec, idx) => (
                            <SectionCard key={`${sec.title}-${idx + 2}`} title={sec.title} description={sec.description} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`w-full flex flex-col gap-y-[1.5rem] lg:flex-row mt-[2rem] lg:mt-[3rem] gap-x-[5rem] items-center ${(image_position?.toLowerCase() === "right" ? "lg:flex-row" : "lg:flex-row-reverse")} mx-auto`}>
            <div className="w-full flex justify-center text-center lg:text-start gap-y-[2rem] flex-col max-w-lg lg:max-w-full">
                <h2 className="text-[2.25rem] font-[700]">{header}</h2>
                <div className="font-[400]">{customParser(description)}</div>
            </div>

            {src ? (
                <div className="relative h-[40rem] w-full">
                    <Image
                        src={src}
                        alt={header || ""}
                        fill
                        priority
                        unoptimized
                        className="object-cover h-full w-full mx-auto"
                    />
                </div>
            ) : (
                <NoImage />
            )}
        </div>
    );
}

function SectionCard({ title, description }: Readonly<{ title: string; description: string }>) {
    return (
        <div className="p-4 border rounded-md bg-white shadow-sm">
            <h4 className="font-semibold mb-2">{title}</h4>
            <p>{description}</p>
        </div>
    );
}
