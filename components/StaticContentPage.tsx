"use client";
import { getStaticContentsAsync, selectStaticContents } from '@/lib/features/navigation/navigationSlice';
import { StaticContent } from '@/lib/features/types';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { customParser } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

interface StaticContentPageProps {
  contentPath: string;
}

export default function StaticContentPage({ contentPath }: StaticContentPageProps) {
  const staticContents = useAppSelector(selectStaticContents);
  const dispatch = useAppDispatch();
  const [content, setContent] = useState<StaticContent | null>(null);

  useEffect(() => {
    dispatch(getStaticContentsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (!staticContents) return;

    const foundContent = staticContents.find(item => item.path === contentPath);

    if (foundContent) {
      setContent(foundContent);
    }
  }, [staticContents, contentPath]);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`w-full mt-[2rem] lg:mt-[2.5rem] px-[1rem] h-full flex flex-col max-w-[90rem]`}>
      <h1 className='text-[2.8rem] font-[700]'>{content.title}</h1>

      <div className='mt-[2rem] lg:mt-[2.5rem]'>
        {content.sections && (
          <div className="w-full flex flex-col gap-y-4 mt-[1rem]">
            {content.sections.map((section, idx) => (
              <div key={idx} className="p-4">
                {section.title && (
                  <h2 className="font-[700] text-base my-[0.7rem]">{section.title}</h2>
                )}

                {section.paragraphs?.map((p, pIdx) => (
                  <div
                    key={pIdx}
                    className="text-[0.875rem] text-gray-800 mb-2 break-words"
                  >
                    {p.title && (
                      <h2 className="font-[700] text-base my-[0.7rem]">{p.title}</h2>
                    )}
                    {customParser(p.text)}
                  </div>
                ))}

                {section.images?.map((img, imgIdx) => (
                  <div key={imgIdx} className='flex flex-col gap-y-[0.5rem]'>
                    {img.image_url && (
                      <img
                        src={img.image_url}
                        alt={img.alt || `section-image-${imgIdx}`}
                        className="w-full h-auto object-cover rounded mt-2"
                      />
                    )}

                    <div className='border-l border-black pl-2'>
                      <p>{img.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
