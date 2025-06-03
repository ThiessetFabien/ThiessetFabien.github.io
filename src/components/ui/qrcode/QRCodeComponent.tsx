'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@lib/utils';
import { cnFlexCenterY, cnFlexCol } from '@src/styles';
import { capitalizeFirstLetterOfEachWord } from '@src/utils/formatText.util';

interface QRCodeComponentProps {
  /**
   * Value to encode in the QR Code (URL, text, etc.)
   */
  value: string;

  /**
   * Title or description of the QR Code
   */
  title: string;

  /**
   * QR Code size in pixels
   */
  size?: number;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Primary color (foreground)
   */
  primaryColor?: string;

  /**
   * Dots color
   */
  dotsColor?: string;

  /**
   * Dots type (square, rounded, etc.)
   */
  dotsType?:
    | 'rounded'
    | 'dots'
    | 'classy'
    | 'classy-rounded'
    | 'square'
    | 'extra-rounded';

  /**
   * Corners color
   */
  cornersColor?: string;

  /**
   * Corners type (square, rounded, etc.)
   */
  cornersType?: 'dot' | 'square';

  /**
   * Center image of QR code
   */
  imageUrl?: string;
}

/**
 * Custom styled QR Code component with advanced options
 *
 * @param {QRCodeComponentProps} props - Component properties
 * @returns {JSX.Element} The QR Code component
 */
export const QRCodeComponent: React.FC<QRCodeComponentProps> = ({
  value,
  title,
  size = 150,
  className,
  primaryColor = '#000000',
  dotsColor,
  dotsType = 'classy-rounded',
  cornersColor,
  cornersType = 'dot',
  imageUrl,
}) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrCodeInstance, setQrCodeInstance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    import('qr-code-styling').then((QRCodeModule) => {
      if (!qrRef.current) return;

      const QRCodeClass = QRCodeModule.default;
      const qrCodeObj = new QRCodeClass({
        width: size,
        height: size,
        data: value,
        margin: 0,
        qrOptions: {
          typeNumber: 0,
          mode: 'Byte',
          errorCorrectionLevel: 'Q',
        },
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.3,
          margin: 0,
        },
        dotsOptions: {
          type: dotsType,
          color: dotsColor || primaryColor,
        },
        cornersSquareOptions: {
          type: cornersType,
          color: cornersColor || primaryColor,
        },
        backgroundOptions: {
          color: 'transparent',
        },
        image: imageUrl,
      });

      setQrCodeInstance(qrCodeObj);
      setIsLoading(false);
    });
  }, [
    value,
    size,
    dotsType,
    dotsColor,
    primaryColor,
    cornersType,
    cornersColor,
    imageUrl,
  ]);

  useEffect(() => {
    if (qrCodeInstance && qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCodeInstance.append(qrRef.current);
    }
  }, [qrCodeInstance]);

  return (
    <div className='group relative'>
      <div
        className={cn('group max-w-md', className)}
        role='img'
        aria-label={`Code QR pour ${title} - Scanner ou cliquer pour accéder`}
      >
        {/* Container for QR code */}
        <div ref={qrRef} className={cn(cnFlexCol, cnFlexCenterY, 'w-full')}>
          {/* Skeleton pendant le chargement */}
          {isLoading && (
            <div
              className='flex animate-pulse items-center justify-center rounded-none'
              style={{ width: size, height: size }}
              aria-label={`Chargement du code QR pour ${title}`}
            >
              <div>
                <svg
                  className='h-8 w-8 animate-pulse'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path d='M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13-2h2v2h-2v-2zm0 4h2v2h-2v-2zm-2-4h2v2h-2v-2zm0 4h2v2h-2v-2zm2-8h2v2h-2V9zm-4 0h2v2h-2V9zm2-4h2v2h-2V5z' />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Title/label below the QR code */}
        {title && (
          <h3 className='translate-y-1 transform text-xs font-semibold text-card-foreground/70 opacity-75 transition-all duration-300 group-hover:translate-y-0 group-hover:text-foreground/80 group-hover:opacity-100 sm:text-sm md:text-base lg:text-lg'>
            {capitalizeFirstLetterOfEachWord(title)}
          </h3>
        )}
      </div>
    </div>
  );
};

export default QRCodeComponent;
