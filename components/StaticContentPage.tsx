"use client";
import Image from 'next/image';
import { getStaticContentsAsync, selectStaticContents } from '@/lib/features/navigation/navigationSlice';
import { StaticContent } from '@/lib/features/types';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { customParser } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import "react-quill-new/dist/quill.snow.css";
import Navigation from './Navigation';
import CustomBreadcrumb from './CustomBreadcrumb';

import LoadingIndicator from './LoadingIndicator';

// Custom styles for static page content to support Quill alignment and image wrapping
const staticPageStyles = `
  .static-content-container .ql-align-center {
    text-align: center;
  }
  .static-content-container .ql-align-right {
    text-align: right;
  }
  .static-content-container .ql-align-justify {
    text-align: justify;
  }
  .static-content-container img.ql-align-left {
    float: left;
    margin: 0 1rem 1rem 0;
    max-width: 100%;
  }
  .static-content-container img.ql-align-right {
    float: right;
    margin: 0 0 1rem 1rem;
    max-width: 100%;
  }
  .static-content-container img.ql-align-center {
    display: block;
    margin: 0 auto 1rem auto;
    max-width: 100%;
  }
  .static-content-container img {
    height: auto; /* Allow the height to be set by the resize handle or be auto */
  }
  .static-content-container .clearfix::after {
    content: "";
    clear: both;
    display: table;
  }
`;

interface StaticContentPageProps {
  contentPath: string;
}

export default function StaticContentPage({ contentPath }: Readonly<StaticContentPageProps>) {
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
    return (
      <Navigation>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <LoadingIndicator size="lg" text="Loading content..." />
        </div>
      </Navigation>
    );
  }

  return (
    <Navigation>
      <style>{staticPageStyles}</style>
      <div className={`w-full mt-[2rem] lg:mt-[2.5rem] px-[1rem] h-full flex flex-col max-w-[90rem] static-content-container mx-auto`}>
        <div className="mb-4">
          <CustomBreadcrumb crumbs={[{ name: content?.title || "", link: `#` }]} />
        </div>
        <h1 className='text-[2.8rem] font-[700]'>{content.title}</h1>
        {content.content ? (
          <div className='text-[1rem] mt-[1.5rem] clearfix'>
            {customParser(content.content)}
          </div>
        ) : (
          <>
            {content?.description && (
              <div className='text-[1.125rem] mt-[1.5rem] clearfix'>
                {customParser(content.description)}
              </div>
            )}

            {content.sections && (
              <div className="w-full flex flex-col gap-y-4 mt-[1rem]">
                {content.sections.map((section, idx) => (
                  <div key={section.title || (section.position !== undefined ? `section-${section.position}` : `section-${idx}`)} className="py-4 clearfix">
                    {section.title && (
                      <h2 className="font-[700] text-2xl my-[0.7rem]">{section.title}</h2>
                    )}

                    {section.paragraphs?.map((p, pIdx) => (
                      <div
                        key={p.title || p.text || `paragraph-${pIdx}`}
                        className="text-[1rem] text-gray-800 mb-2 break-words leading-relaxed clearfix"
                      >
                        {p.title && (
                          <h3 className="font-[700] text-xl my-[0.7rem]">{p.title}</h3>
                        )}
                        {customParser(p.text)}
                      </div>
                    ))}

                    {section.images?.map((img, imgIdx) => (
                      <div key={img.image_url || img.alt || img.caption || `image-${imgIdx}`} className='flex flex-col gap-y-[0.5rem] my-4 clearfix'>
                        {img.image_url && (
                          <Image
                            src={img.image_url}
                            alt={img.alt || `section-image-${imgIdx}`}
                            width={800}
                            height={500}
                            unoptimized
                            className="max-w-full h-auto object-cover rounded mt-2"
                          />
                        )}

                        {img.caption && (
                          <div className='border-l-4 border-black pl-3 py-1 bg-gray-50'>
                            <p className='text-sm text-gray-600 italic'>{img.caption}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Navigation>
  );
}
