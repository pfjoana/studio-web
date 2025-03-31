'use client'

import { useToast } from '@/hooks/use-toast';
import { useActionState, useEffect } from 'react'
import { submitContactForm } from '@/src/app/actions/contact';

import Form from 'next/form';
import Link from 'next/link';
import { Mail, Instagram } from 'lucide-react';


const ContactPage = () => {

  const { toast } = useToast();
  const [state, formAction] = useActionState (submitContactForm, {});

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Success",
        description: state.message,
        variant: "default",
        className: "toast-success"
      });
    } else if (state?.error) {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
        className: "toast-error"

      });
    }
  }, [state, toast])

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-serif text-center font-bold text-navy mb-10">Contacts</h1>
          <p className="text-charcoal  text-lg leading-relaxed max-w-2xl mr-4 ml-10">
            For questions about artworks featured in the gallery or to discuss personalized commissions, feel free to send a message.
            <br />Your vision and curiosity are always welcome.
            <br />You can use the contact form, send an email, or reach out via Instagram.
          </p>

          <div className="flex space-x-6 items-center ml-10">
            <Link
              href="mailto:jopfstudio@gmail.com"
              className="flex items-center space-x-2 text-navy hover:text-terracotta transition-colors"
              >
              <Mail className="w-6 h-6" />
              <span className="font-medium">jopfstudio@gmail.com</span>
            </Link>

            <Link
              href="https://www.instagram.com/jopf_art/"
              target="_blank"
              className="flex items-center space-x-2 text-navy hover:text-terracotta transition-colors"
            >
              <Instagram className="w-6 h-6" />
              <span className="font-medium">jopf_art</span>
            </Link>
          </div>
        </div>

        <div className="bg-stone/50 mt-8 ">
          <Form
            action={formAction}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-navy font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 border border-navy/20 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta/50"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-navy font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-navy/20 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta/50"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-navy font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-2 border border-navy/20 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta/50"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-terracotta text-white py-3 rounded-md hover:bg-terracotta/90 transition-colors duration-300 font-medium"
            >
              Send Message
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;
