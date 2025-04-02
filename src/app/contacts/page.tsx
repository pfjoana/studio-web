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
    <div className="container mx-auto max-w-7xl py-16 px-4">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h1 className="heading text-center mb-10">Contacts</h1>
          <p className="text-charcoal  text-lg leading-relaxed max-w-2xl mr-4 ml-10">
            For questions about artworks featured in the gallery or to discuss personalized commissions, feel free to send a message.
            <br />Your vision and curiosity are always welcome.
            <br />You can use the contact form, send an email, or reach out via Instagram.
          </p>

          <div className="flex space-x-6 items-center ml-10">
            <Link
              href="mailto:jopfstudio@gmail.com"
              className="contacts-link"
              >
              <div className="flex items-center justify-center rounded-full bg-navy">
                <Mail className="w-5 h-5 m-1.5 text-gray-200" />
              </div>
              <span className="font-medium">jopfstudio@gmail.com</span>
            </Link>

            <Link
              href="https://www.instagram.com/jopf_art/"
              target="_blank"
              className="contacts-link"
            >
              <div className="flex items-center justify-center rounded-full bg-navy">
                <Instagram className="w-5 h-5 m-1.5 text-gray-200" />
              </div>
              <span className="font-medium">jopf_art</span>
            </Link>
          </div>
        </div>

        <div className="bg-stone mt-8 ">
          <Form
            action={formAction}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="form-input"
              />
            </div>

            <button
              type="submit"
              className="form-button"
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
