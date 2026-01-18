import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import Icon from "@/components/icons";
import { useFormContext, useWatch } from "react-hook-form";

const InfoStep = () => {
  const { control } = useFormContext();
  const logo = useWatch({ control, name: "logo" });
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="space-y-6">
        <div className="w-full flex">
          <FormField
            control={control}
            name="logo"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem className="space-y-2 w-1/2">
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <div className="contents">
                    <Input
                      {...field}
                      placeholder="logo"
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                      ref={fileRef}
                      hidden
                    />
                    <Button
                      type="button"
                      className="relative flex items-center justify-center w-40 px-4 py-2 cursor-pointer bg-primary text-white"
                      onClick={() => fileRef.current?.click()}
                    >
                      {/* Icon always on the left */}
                      <span className="absolute left-3">
                        <Icon name="upload" className="w-5 h-5" />
                      </span>

                      {/* Text always centered */}
                      <span className="mx-auto">Upload</span>
                    </Button>
                    <small className="text-gray-500 block">
                      Supported: JPG, PNG files up to 2MB
                    </small>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-1/2">
            {logo && logo instanceof File && (
              <img
                src={URL.createObjectURL(logo)}
                alt="Organization Logo"
                className="w-30 h-30 object-contain"
              />
            )}
          </div>
        </div>

        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>
                Organization Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your organization name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="organizationName"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>
                Company name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="organizationUrl"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Organization URL</FormLabel>
              <FormControl>
                <Input placeholder="https://" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default InfoStep;
