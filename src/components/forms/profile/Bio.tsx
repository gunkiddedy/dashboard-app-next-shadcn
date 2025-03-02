import React, { useEffect } from "react";

import { useForm } from "react-hook-form";

import { Button, FileUploadV1, FormTextarea, UploadedFile } from "@/components";
import authAssets from "@/lib/assets/Auth";
import { Form, FormField } from "@/components/ui/form";
import {
  TProfileBio,
  profileBioSchema,
} from "@/schema/profileSettings/ProfileBio";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import profile from "@/lib/assets/profile";
import FileUploadV2 from "@/components/FileUpload/FileUploadV2";
import { useProfileRead } from "@/services/queries/profile";
import { useBioPost } from "@/services/queries/bio";

const ProfileBio = () => {
  const { mutate, isPending } = useBioPost();
  const { data } = useProfileRead();
  const form = useForm<TProfileBio>({
    resolver: zodResolver(profileBioSchema),
    defaultValues: {},
  });

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;

  console.log("errors", errors);

  const isResumeUploaded = watch("resume_url");

  const onSubmit = (values: TProfileBio) => {
    mutate({
      data: {
        profile: {
          bio: values.bio,
          resume_url: "",
        },
      },
    });
  };

  useEffect(() => {
    if (data) {
      setValue("bio", data.bio);
    }
  }, [data]);

  return (
    <div className="max-w-[560px]">
      <Form {...form}>
        <form
          className="Profiling-form w-full mx-auto pb-5 mt-0 md:mt-5 "
          onSubmit={handleSubmit(onSubmit, (err) => {
            console.log("error is", err);
          })}
        >
          <FormField
            control={control}
            name="bio"
            render={({ field }) => (
              <FormTextarea
                label="Company Bio"
                error={errors.bio}
                placeholder="Enter your bio here"
                containerClass=""
                className=""
                {...field}
              />
            )}
          />
          <div className="mt-4 mb-8">
            <Label className="font-medium text-sm">My resume</Label>
            <div className="pt-1">
              {isResumeUploaded ? (
                <>
                  <UploadedFile
                    deleteIcon={profile.fileDelete}
                    {...{ isResumeUploaded }}
                    onDeleteFile={() => {
                      setValue("resume_url", null);
                    }}
                  />
                  <div className="mt-4">
                    <FormField
                      control={control}
                      name="resume_url"
                      render={({ field }) => (
                        <FileUploadV2
                          setFile={(e) => {
                            console.log("set file");
                            field.onChange(e);
                          }}
                          buttonText="Upload your resume"
                          error={errors?.resume_url}
                          accept={[
                            "application/pdf",
                            "application/msword",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                          ]}
                        />
                      )}
                    />
                  </div>
                </>
              ) : (
                <>
                  <FormField
                    control={control}
                    name="resume_url"
                    render={({ field }) => (
                      <FileUploadV1
                        containerClass="mb-3"
                        uploadIcon={authAssets.UploadIcon}
                        setFile={(e) => {
                          field.onChange(e);
                        }}
                        accept={{
                          "application/pdf": [".pdf"],
                          "application/msword": [".doc"],
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                            [".docx"],
                        }}
                        // error={errors.resume}
                      />
                    )}
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex gap-10">
            <Button
              disabled={false}
              type="button"
              variant="neutral"
              label="Cancel"
              className="w-[108px] rounded-xl h-[54px]"
            />
            <Button
              loading={isPending}
              disabled={false}
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

export default ProfileBio;
