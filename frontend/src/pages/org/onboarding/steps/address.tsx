import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { COUNTRIES } from "@/constants/countries";
import { useFormContext } from "react-hook-form";

const AddressStep = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      {/* Email field */}
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="john@email.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Phone field */}
      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>
              Phone number <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="+234 xxx xxx xxxx" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Address field */}
      <FormField
        control={control}
        name="address.address"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>
              Office Address <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your complete office address"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Country field */}
      <FormField
        control={control}
        name="address.country"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>
              Country <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country.value} value={country.label}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* City and State fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          control={control}
          name="address.city"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>
                City <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your city" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="address.state"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>
                State <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your state" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="address.zip"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>
                Zip <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter zip code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AddressStep;
