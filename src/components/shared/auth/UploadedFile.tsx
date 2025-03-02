import Image from 'next/image';

import authAssets from '@/lib/assets/auth';
import { bytesToKB } from '@/lib/utils';

interface IUploadedFileProps {
  isResumeUploaded?: File;
  onDeleteFile?: () => void;
  deleteIcon?: string;
}

const UploadedFile = (props: IUploadedFileProps) => {
  const {
    isResumeUploaded,
    onDeleteFile = () => {
      ('');
    },
    deleteIcon,
  } = props;
  return (
    <div className="border-grey-100 flex justify-between py-6 px-[42px] bg-primary-600">
      <div className="flex gap-[15px]">
        <span className="flex flex-col gap-1">
          <p className="text-tertiary-150 font-normal text-base leading-[19.36px]">
            {isResumeUploaded?.name || 'noname.pdf'}
          </p>
          <p className="font-normal text-xs leading-[14.52px] text-neutral-850">
            {bytesToKB(isResumeUploaded?.size) || '0kb'}
          </p>
        </span>
      </div>
    </div>
  );
};

export default UploadedFile;
