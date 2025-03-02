import React, { type ReactNode } from 'react';

import cx from 'classnames';
import { CheckedState } from '@radix-ui/react-checkbox';

import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox';

interface IProps {
  disabled?: boolean;
  id?: string;
  onChange?: (val: CheckedState) => void;
  children?: ReactNode;
  isChecked?: boolean;
  className?: string;
}

const Checkbox = (props: IProps) => {
  const {
    disabled,
    children,
    id,
    onChange,
    isChecked = true,
    className = 'bg-primary',
  } = props;

  return (
    <div className="flex items-center space-x-2">
      <ShadcnCheckbox
        defaultChecked={isChecked}
        id={id}
        disabled={!!disabled}
        className={cx('w-[20px] h-[20px] border-neutral-400', className)}
        onCheckedChange={onChange}
        checked={isChecked}
      />
      {children && children}
    </div>
  );
};

export default Checkbox;
