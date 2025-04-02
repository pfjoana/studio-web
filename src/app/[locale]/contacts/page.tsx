'use client'

import { useToast } from '@/hooks/use-toast';
import { useActionState, useEffect } from 'react'
import { submitContactForm } from '@/src/app/actions/contact';
import Form from 'next/form';
import Link from 'next/link';
import { Mail, Instagram } from 'lucide-react';
import {useTranslations} from 'next-intl'



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

  const tContacts = useTranslations("contacts");

  return (
    <div className="container mx-auto max-w-7xl py-16 px-4">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h1 className="heading text-center mb-10">{tContacts("heading")}</h1>
          <p className="text-charcoal text-base leading-relaxed max-w-2xl mr-4 ml-10">
          {tContacts("text1")}
          <br />
          {tContacts("text2")}
          </p>

          <div className="flex space-x-6 items-center ml-10">
            <Link
              href="mailto:jopfstudio@gmail.com"
              className="contacts-link"
              >
              <div className="flex items-center justify-center rounded-full bg-navy">
                <Mail className="w-5 h-5 m-1.5 text-gray-200" />
              </div>
              <span className="font-medium">{tContacts("email")}</span>
            </Link>

            <Link
              href="https://www.instagram.com/jopf_art/"
              target="_blank"
              className="contacts-link"
            >
              <div className="flex items-center justify-center rounded-full bg-navy">
                <Instagram className="w-5 h-5 m-1.5 text-gray-200" />
              </div>
              <span className="font-medium">{tContacts("instagram")}</span>
            </Link>
          </div>
        </div>

        <div className="bg-stone mt-8 ">
          <Form
            action={formAction}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="form-label">{tContacts("namelabel")}</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label">{tContacts("emailLabel")}</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="message" className="form-label">{tContacts("messagelabel")}</label>
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
              {tContacts("buttonsend")}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;
