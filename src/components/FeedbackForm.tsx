
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  feedbackType: z.string().min(1, { message: "Please select a feedback type" }),
  rating: z.string().min(1, { message: "Please provide a rating" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }).max(500, {
    message: "Message must not be longer than 500 characters",
  }),
  email: z.string().email({ message: "Invalid email address" }).optional().or(z.literal("")),
});

type FeedbackFormValues = z.infer<typeof formSchema>;

const FeedbackForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedbackType: "",
      rating: "",
      message: "",
      email: "",
    },
  });
  
  const onSubmit = async (values: FeedbackFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
      });
    }, 1500);
  };
  
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card rounded-xl p-8 text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-safespeak-green/20 p-4 rounded-full">
            <CheckCircle className="h-12 w-12 text-safespeak-green" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
        <p className="text-white/70 mb-6">
          Your feedback has been submitted successfully. We appreciate your input as it helps us improve SafeSpeak.
        </p>
        <Button 
          onClick={() => {
            setIsSubmitted(false);
            form.reset();
          }}
        >
          Submit Another Feedback
        </Button>
      </motion.div>
    );
  }
  
  return (
    <div className="glass-card rounded-xl p-6 md:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="feedbackType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Feedback Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select feedback type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="general">General Feedback</SelectItem>
                    <SelectItem value="bug">Report a Bug</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="usability">Usability Feedback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>How would you rate your experience?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex justify-between space-x-1"
                  >
                    <FormItem className="flex flex-col items-center space-y-1">
                      <FormControl>
                        <RadioGroupItem value="1" className="sr-only" />
                      </FormControl>
                      <label
                        htmlFor={`${field.name}-1`}
                        className={`cursor-pointer p-2 rounded-full ${
                          field.value === "1" 
                            ? "bg-red-500/20 text-red-500" 
                            : "bg-white/5 text-white/50 hover:bg-white/10"
                        }`}
                        onClick={() => field.onChange("1")}
                      >
                        😞
                      </label>
                      <FormLabel className="text-xs">Poor</FormLabel>
                    </FormItem>
                    <FormItem className="flex flex-col items-center space-y-1">
                      <FormControl>
                        <RadioGroupItem value="2" className="sr-only" />
                      </FormControl>
                      <label
                        htmlFor={`${field.name}-2`}
                        className={`cursor-pointer p-2 rounded-full ${
                          field.value === "2" 
                            ? "bg-orange-500/20 text-orange-500" 
                            : "bg-white/5 text-white/50 hover:bg-white/10"
                        }`}
                        onClick={() => field.onChange("2")}
                      >
                        😐
                      </label>
                      <FormLabel className="text-xs">Fair</FormLabel>
                    </FormItem>
                    <FormItem className="flex flex-col items-center space-y-1">
                      <FormControl>
                        <RadioGroupItem value="3" className="sr-only" />
                      </FormControl>
                      <label
                        htmlFor={`${field.name}-3`}
                        className={`cursor-pointer p-2 rounded-full ${
                          field.value === "3" 
                            ? "bg-amber-500/20 text-amber-500" 
                            : "bg-white/5 text-white/50 hover:bg-white/10"
                        }`}
                        onClick={() => field.onChange("3")}
                      >
                        🙂
                      </label>
                      <FormLabel className="text-xs">Good</FormLabel>
                    </FormItem>
                    <FormItem className="flex flex-col items-center space-y-1">
                      <FormControl>
                        <RadioGroupItem value="4" className="sr-only" />
                      </FormControl>
                      <label
                        htmlFor={`${field.name}-4`}
                        className={`cursor-pointer p-2 rounded-full ${
                          field.value === "4" 
                            ? "bg-lime-500/20 text-lime-500" 
                            : "bg-white/5 text-white/50 hover:bg-white/10"
                        }`}
                        onClick={() => field.onChange("4")}
                      >
                        😊
                      </label>
                      <FormLabel className="text-xs">Great</FormLabel>
                    </FormItem>
                    <FormItem className="flex flex-col items-center space-y-1">
                      <FormControl>
                        <RadioGroupItem value="5" className="sr-only" />
                      </FormControl>
                      <label
                        htmlFor={`${field.name}-5`}
                        className={`cursor-pointer p-2 rounded-full ${
                          field.value === "5" 
                            ? "bg-safespeak-green/20 text-safespeak-green" 
                            : "bg-white/5 text-white/50 hover:bg-white/10"
                        }`}
                        onClick={() => field.onChange("5")}
                      >
                        😁
                      </label>
                      <FormLabel className="text-xs">Excellent</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Feedback</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Please share your thoughts, suggestions, or report any issues..." 
                    className="min-h-[150px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormMessage />
                  <div className="text-xs text-white/60">
                    {field.value.length}/500
                  </div>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="If you'd like us to follow up (not required)" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-white/60 mt-1">
                  We respect your privacy. Providing an email is completely optional.
                </p>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <MessageSquare className="mr-2 h-4 w-4" />
                Submit Feedback
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FeedbackForm;
