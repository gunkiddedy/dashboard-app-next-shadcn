import { FormSearchInput } from "@/components/FormSearch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { departmentItems, typeItems } from "@/lib/constants/filterItems";
import { employeeFilterSchema } from "@/schema/employee/employeeFilter";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";

type EmployeeFilterFormProps = {
  onCancel?: () => void;
};

// filter form
const EmployeeFilterForm = ({ onCancel }: EmployeeFilterFormProps) => {
  // const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof employeeFilterSchema>>({
    resolver: zodResolver(employeeFilterSchema),
    defaultValues: {
      searchValue: "",
      departments: [],
      typeOfWork: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (values: z.infer<typeof employeeFilterSchema>) => {
    // setLoading(true);
    try {
      console.log("Employee Filter Form", values);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit, (err) => {
          console.log("error is", err);
        })}
        className="space-y-5"
      >
        <FormField
          control={control}
          name="searchValue"
          render={({ field }) => (
            <FormSearchInput {...field} error={errors.searchValue} />
          )}
        />
        <p className="text-base font-medium text-[#131313] my-5">Department</p>
        {/* Department Items goes here */}
        <FormField
          control={control}
          name="departments"
          render={() => (
            <FormItem>
              <div className="grid grid-cols-2 gap-4">
                {departmentItems.map((item) => (
                  <FormField
                    key={item.id}
                    control={control}
                    name="departments"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex items-center space-x-2"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id,
                                      ),
                                    );
                              }}
                              className={clsx(
                                field.value?.includes(item.id)
                                  ? "bg-primary"
                                  : "bg-white",
                                "w-[20px] h-[20px] border-neutral-400",
                              )}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        {/* type of work goes here */}
        <p className="text-base font-medium text-[#131313] my-5">Select Type</p>
        <FormField
          control={form.control}
          name="typeOfWork"
          render={({ field }) => (
            <FormItem className="">
              <RadioGroup
                defaultValue={field.value}
                onValueChange={field.onChange}
                className={`flex items-center space-x-2`}
              >
                {typeItems.map((item, index) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <RadioGroupItem value={item} id={`radio-${index}`} />
                    <Label
                      htmlFor={`radio-${index}`}
                      className="text-base text-[#131313] font-normal leading-none"
                    >
                      {item}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <div className="w-full grid grid-cols-2 gap-2">
          <Button
            variant={"outline"}
            className="w-full px-5 py-6 rounded-[10px]"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </Button>
          <Button className="w-full px-5 py-6 rounded-[10px] bg-primary">
            Apply
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EmployeeFilterForm;
