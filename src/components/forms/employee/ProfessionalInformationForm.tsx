'use client';

import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { Form, FormField } from '@/components/ui/form';

import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import { FormDatePicker } from '@/components/FormDate';
import FormSelect from '@/components/FormSelect';
import { professionalInformationSchema } from '@/schema/employee/professionalInformation';

const ProfessionalInformationForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof professionalInformationSchema>>({
    resolver: zodResolver(professionalInformationSchema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (
    values: z.infer<typeof professionalInformationSchema>,
  ) => {
    setLoading(true);
    try {
      console.log('Personal Information Form', values);
    } catch (error) {
      // TODO: show toast
    } finally {
      setLoading(false);
    }
  };

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  // State to hold the selected value
  const [selectedOption, setSelectedOption] = useState('');

  // Handle changes
  const handleSelected = (value: string) => {
    setSelectedOption(value);
    console.log('Selected Value:', value);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit, (err) => {
            console.log('error is', err);
          })}
          className="flex flex-col space-y-8"
        >
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={control}
              name="employeeId"
              render={({ field }) => (
                <FormInput
                  required
                  error={errors.employeeId}
                  placeholder="Employee ID"
                  containerClass=""
                  {...field}
                  className="w-full"
                />
              )}
            />
            <FormField
              control={control}
              name="userName"
              render={({ field }) => (
                <FormInput
                  required
                  error={errors.userName}
                  placeholder="User Name"
                  containerClass=""
                  {...field}
                  className="w-full"
                />
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={control}
              name="employeeType"
              render={({ field }) => (
                <FormSelect
                  label=""
                  error={errors.employeeType}
                  placeholder="Employee Type"
                  containerClass=""
                  selectData={options}
                  onChange={handleSelected}
                  className="w-full h-[54px] border border-neutral-400 font-extralight text-sm text-neutral-400 rounded-[8px] bg-white focus:outline-none"
                  {...field}
                />
              )}
            />
            <FormField
              control={control}
              name="role"
              render={({ field }) => (
                <FormSelect
                  label=""
                  error={errors.role}
                  placeholder="Role"
                  containerClass=""
                  selectData={options}
                  onChange={handleSelected}
                  className="w-full h-[54px] border border-neutral-400 font-extralight text-sm text-neutral-400 rounded-[8px] bg-white focus:outline-none"
                  {...field}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={control}
              name="department"
              render={({ field }) => (
                <FormSelect
                  label=""
                  error={errors.department}
                  placeholder="Department"
                  containerClass=""
                  selectData={options}
                  onChange={handleSelected}
                  className="w-full h-[54px] border border-neutral-400 font-extralight text-sm text-neutral-400 rounded-[8px] bg-white focus:outline-none"
                  {...field}
                />
              )}
            />
            <FormField
              control={control}
              name="workingHours"
              render={({ field }) => (
                <FormSelect
                  label=""
                  error={errors.workingHours}
                  placeholder="Working Hours"
                  containerClass=""
                  selectData={options}
                  onChange={handleSelected}
                  className="w-full h-[54px] border border-neutral-400 font-extralight text-sm text-neutral-400 rounded-[8px] bg-white focus:outline-none"
                  {...field}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={control}
              name="officeLocation"
              render={({ field }) => (
                <FormSelect
                  label=""
                  error={errors.officeLocation}
                  placeholder="Office Location"
                  containerClass=""
                  selectData={options}
                  onChange={handleSelected}
                  className="w-full h-[54px] border border-neutral-400 font-extralight text-sm text-neutral-400 rounded-[8px] bg-white focus:outline-none"
                  {...field}
                />
              )}
            />
            <FormField
              control={control}
              name="joiningDate"
              render={({ field }) => (
                <FormDatePicker
                  label=""
                  error={errors.joiningDate}
                  placeholder="Joining Date"
                  containerClass="space-y-0"
                  className="w-full"
                  classButton="h-[54px] border border-neutral-400 font-extralight text-sm text-neutral-400 rounded-[8px] bg-white"
                  useIcon={true}
                  {...field}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-end flex-wrap lg:space-x-3 xl:space-y-0 space-y-3">
            <Button
              label="Cancel"
              className="w-full xl:w-[92px]"
              loading={loading}
              variant="outline"
            />
            <Button
              label="Next"
              className="w-full xl:w-[92px]"
              loading={loading}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfessionalInformationForm;
