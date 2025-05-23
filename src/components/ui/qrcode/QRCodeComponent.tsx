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
        className={cn(
          'group max-w-md rounded-xl p-4',
          'bg-card/60 backdrop-blur-sm',
          className
        )}
      >
        {/* Container for QR code */}
        <div ref={qrRef} className={cn(cnFlexCol, cnFlexCenterY, 'w-full')} />

        {/* Title/label below the QR code */}
        {title && (
          <p className='mt-4 text-center text-sm text-muted-foreground/90 transition-colors group-hover:text-muted-foreground'>
            {capitalizeFirstLetterOfEachWord(title)}
          </p>
        )}
      </div>
    </div>
  );
};

export default QRCodeComponent;
