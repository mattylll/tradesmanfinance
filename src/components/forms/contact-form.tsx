"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/registry/new-york-v4/ui/card";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Input } from "@/registry/new-york-v4/ui/input";
import { Textarea } from "@/registry/new-york-v4/ui/textarea";
import { Label } from "@/registry/new-york-v4/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select";
import { Loader2, Send, CheckCircle, Phone, Mail, MessageSquare } from "lucide-react";
import { cn } from "@/registry/new-york-v4/lib/utils";
import { submitToWebhook, getUTMParams, getPageUrl } from "@/lib/webhook";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const SUBJECT_OPTIONS = [
  { value: "general", label: "General Enquiry" },
  { value: "quote", label: "Request a Quote" },
  { value: "equipment", label: "Equipment Finance" },
  { value: "van", label: "Van Finance" },
  { value: "business-loan", label: "Business Loan" },
  { value: "support", label: "Application Support" },
  { value: "other", label: "Other" },
];

interface ContactFormProps {
  className?: string;
  compact?: boolean;
}

export function ContactForm({ className, compact = false }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const subject = watch("subject");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitToWebhook({
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        formType: 'contact',
        subject: SUBJECT_OPTIONS.find((s) => s.value === data.subject)?.label || data.subject,
        message: data.message,
        pageUrl: getPageUrl(),
        ...getUTMParams(),
        submittedAt: new Date().toISOString(),
      });

      if (!result.success) {
        throw new Error(result.error || 'Submission failed');
      }

      setIsSuccess(true);
      reset();
    } catch (err) {
      console.error("Form submission error:", err);
      setError("Failed to submit form. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className={className}>
        <CardContent className="p-8 text-center space-y-4">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
          <h3 className="text-xl font-bold">Message Sent!</h3>
          <p className="text-muted-foreground">
            Thanks for getting in touch. We'll respond within 24 hours.
          </p>
          <Button
            variant="outline"
            onClick={() => setIsSuccess(false)}
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              {...register("name")}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="How can we help?"
            {...register("message")}
            className={cn("min-h-[80px]", errors.message ? "border-destructive" : "")}
          />
          {errors.message && (
            <p className="text-xs text-destructive">{errors.message.message}</p>
          )}
        </div>

        <input type="hidden" {...register("subject")} value="general" />

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </form>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Contact Us
        </CardTitle>
        <CardDescription>
          Fill in the form below and we'll get back to you within 24 hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="John Smith"
                {...register("name")}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  className={cn("pl-9", errors.email ? "border-destructive" : "")}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="07XXX XXXXXX"
                  className="pl-9"
                  {...register("phone")}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">
                Subject <span className="text-destructive">*</span>
              </Label>
              <Select
                value={subject}
                onValueChange={(value) => setValue("subject", value)}
              >
                <SelectTrigger className={errors.subject ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.subject && (
                <p className="text-sm text-destructive">{errors.subject.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Message <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us about your finance needs, the equipment you're looking for, or any questions you have..."
              {...register("message")}
              className={cn("min-h-[150px]", errors.message ? "border-destructive" : "")}
            />
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message.message}</p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <p className="text-xs text-muted-foreground">
              By submitting this form, you agree to our{" "}
              <a href="/privacy-policy" className="underline hover:text-primary">
                Privacy Policy
              </a>
            </p>
            <Button type="submit" disabled={isSubmitting} size="lg">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ContactForm;
