import React, { useEffect } from "react";

import { useForm } from "react-hook-form";

import { Button, Checkbox, FormInput } from "@/components";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TProfileRatesSchema,
  profileRatesSchema,
} from "@/schema/profileSettings/profileRates";
import { useRatesPost, useRatesRead } from "@/services/queries/rates";

const locationCheck = [
  {
    id: "commercial",
    label: "Commercial",
  },
  {
    id: "government",
    label: "Government",
  },
  {
    id: "residential",
    label: "Residential",
  },
  {
    id: "education",
    label: "Education",
  },
];

const ProfileRates = () => {
  const { data } = useRatesRead();
  const { mutate, isPending } = useRatesPost(data?.rates_and_location_id);
  const form = useForm<TProfileRatesSchema>({
    resolver: zodResolver(profileRatesSchema),
    defaultValues: {
      location: [],
      max_travel_distance: 0,
      onsite_hourly_rate: 0,
      virtual_hourly_rate: 0,
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = form;

  const onSubmit = (values: TProfileRatesSchema) => {
    console.log(values);
    const sendValues = {
      max_travel_distance: values.max_travel_distance,
      onsite_hourly_rate: values.onsite_hourly_rate,
      virtual_hourly_rate: values.virtual_hourly_rate,
      location: {
        commercial: true,
        residential: false,
        government: true,
        education: false,
      },
    };
    values.location.forEach((val) => {
      sendValues.location[val as keyof typeof sendValues.location] = true;
    });
    mutate({ data: sendValues });
  };

  useEffect(() => {
    if (data) {
      setValue("onsite_hourly_rate", data.onsite_hourly_rate);
      setValue("virtual_hourly_rate", data.virtual_hourly_rate);
      setValue("max_travel_distance", data.max_travel_distance);
      const entries = Object.entries(data.location);
      const final: string[] = [];

      entries.forEach((val) => {
        if (val[1]) final.push(val[0]);
      });
      setValue("location", final);
    }
  }, [data]);

  return (
    <div className="max-w-[600px]">
      <Form {...form}>
        <form
          className="Profiling-form w-full mx-auto pb-5 mt-0 md:mt-5 "
          onSubmit={handleSubmit(onSubmit, (err) => {
            console.log("error is", err);
          })}
        >
          <div className="flex gap-4">
            <FormField
              control={control}
              name="onsite_hourly_rate"
              render={({ field }) => {
                return (
                  <FormInput
                    label="Onsite hourly rate"
                    error={errors.onsite_hourly_rate}
                    placeholder="$0.00"
                    containerClass="flex-1"
                    className=""
                    {...field}
                  />
                );
              }}
            />
            <FormField
              control={control}
              name="virtual_hourly_rate"
              render={({ field }) => (
                <FormInput
                  label="Virtual hourly rate"
                  error={errors.virtual_hourly_rate}
                  placeholder="$0.00"
                  containerClass="flex-1"
                  className=""
                  {...field}
                />
              )}
            />
          </div>
          <h3 className="pt-4 pb-1 font-medium text-base">Location</h3>
          <div className="flex flex-wrap pb-7">
            {locationCheck.map((item, i) => (
              <div key={i} className="w-6/12 py-3">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex justify-start gap-3 items-center"
                      >
                        <FormControl>
                          <Checkbox
                            isChecked={field.value?.includes(item.id)}
                            onChange={(checked) => {
                              checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-medium text-neutral-600 !mt-0">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center pb-8 gap-4">
            <FormField
              control={control}
              name="max_travel_distance"
              render={({ field }) => (
                <FormInput
                  label="Maximum travel distance"
                  error={errors.max_travel_distance}
                  placeholder="$0.00"
                  containerClass="flex-1"
                  className=""
                  details="miles from my zip code"
                  {...field}
                />
              )}
            />
          </div>
          <div className="flex gap-10">
            <Button
              disabled={false}
              type="button"
              variant="neutral"
              label="Cancel"
              className="w-[108px] rounded-xl h-[54px] border-primary-500"
            />
            <Button
              disabled={false}
              loading={isPending}
              type="submit"
              label="Save Changes"
              className="w-[165px] rounded-xl h-[54px]"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileRates;
