'use client';
import React, { ReactNode, useMemo } from 'react';
import Image from 'next/image';

import { useDropzone } from 'react-dropzone';

const baseStyle = (
  borderColor: string,
  borderStyle: string,
  borderWidth: number,
  color: string,
) => ({
  flex: 1,
  display: 'flex',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flexDirection: 'column' as any,
  alignItems: 'center',
  justifyContent: 'center',
  padding: '15px',
  borderWidth,
  borderRadius: 4,
  borderColor,
  borderStyle,
  backgroundColor: '#fafafa',
  color,
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  textAlign: 'center' as any,
  height: '100%',
  minHeight: '150px',
});

const focusedStyle = {
  borderColor: '#269984',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

interface FileUploadProps {
  containerClass?: string;
  borderColor?: string;
  borderStyle?: 'solid' | 'dashed';
  uploadIcon?: string;
  uploadLabel?: string;
  uploadRestrictionText?: string;
  borderWidth?: number;
  color?: string;
  setFile?: (file: File | null) => void;
  accept?: any; // should be mime types
  children?: ReactNode; // Incase you want a custom component for the input
}

const FileUpload = ({
  containerClass,
  borderColor = '#8930be',
  borderStyle = 'dashed',
  uploadIcon,
  uploadLabel = 'drag and drop to upload your resume',
  uploadRestrictionText = 'pdf, doc, docx',
  color = '#7C8493',
  borderWidth = 2,
  setFile = () => {},
  accept = { 'image/*': [] },
  children,
}: FileUploadProps) => {
  const {
    getRootProps,
    getInputProps,
    // isDragActive,
    // acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
    // isFileDialogActive,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      acceptedFiles.map((file: File) => {
        setFile(file);
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      });
    },
    accept,
    maxFiles: 1,
  });

  const style = useMemo(
    () => ({
      ...baseStyle(borderColor, borderStyle, borderWidth, color),
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  return (
    <div className={containerClass}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {children ? (
          <>{children}</>
        ) : (
          <>
            {uploadIcon && (
              <Image alt="upload icon" src={uploadIcon} className="w-10 h-10" />
            )}
            <p
              dangerouslySetInnerHTML={{ __html: uploadLabel }}
              className="text-base font-medium leading-[25.6px] font-epilogue"
            />
            <p className="text-base font-medium leading-[25.6px] font-epilogue">
              {uploadRestrictionText}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
