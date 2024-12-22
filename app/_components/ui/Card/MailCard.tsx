'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/lib/components/ui/input';
import { Button } from '@/lib/components/ui/button';
import { formSchema } from '@/schemas/mailSchema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/components/ui/form';
import type CardProps from '@/types/CardProps';
import { toast } from '@/lib/hooks/use-toast';
import { Textarea } from '@/lib/components/ui/textarea';
import { cnSpaceY } from '@/styles/boxModelStyles';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/lib/components/ui/select';

type FormSchema = z.infer<typeof formSchema>;

export const MailCard: React.FC<CardProps> = ({ mailto }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      mail: '',
      type: 'offer',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    const mailtoLink = `mailto:${mailto}?subject=${data.type}&body=${data.message}`;
    window.location.href = mailtoLink;
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='bg-background0 mt-2 w-[340px] rounded-md p-4'>
          <code className='text-foreground'>
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      ),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cnSpaceY}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='John Doe' {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='mail'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mail</FormLabel>
              <FormControl>
                <Input placeholder='you@mail.com' {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of mail...</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a type of email to display' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='offer'>offer</SelectItem>
                  <SelectItem value='collaboration'>collaboration</SelectItem>
                  <SelectItem value='question'>question</SelectItem>
                  <SelectItem value='other'>other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Tell me a little bit about your project...'
                  className='resize-none'
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};
