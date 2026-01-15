'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiMail, FiPhone, FiMapPin, FiMessageSquare, FiClock, FiSend, FiCheckCircle } from 'react-icons/fi'
import emailjs from '@emailjs/browser'


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const contactInfo = [
    {
      icon: <FiMail />,
      title: 'Email',
      details: 'fibresnfools@gmail.com',
      color: 'text-blue-500'
    },
    // {
    //   icon: <FiPhone />,
    //   title: 'Phone',
    //   details: ['+91 98765 43210', 'Mon-Sat: 10 AM - 7 PM'],
    //   color: 'text-green-500'
    // },
    // {
    //   icon: <FiMapPin />,
    //   title: 'Address',
    //   details: ['123 Fashion Street', 'City, State 123456', 'India'],
    //   color: 'text-red-500'
    // },
    {
      icon: <FiMessageSquare />,
      title: 'Live Chat',
      details: ['WhatsApp: +91 96517 43565', 'Response within 30 mins'],
      color: 'text-purple-500'
    }
  ]

  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'We process orders within 2-3 business days. Standard shipping takes 5-7 business days within India.'
    },
    {
      question: 'What is your return policy?',
      answer: 'You can return unworn items with original tags within 7 days of delivery for a full refund.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes! We ship worldwide. International shipping takes 10-20 business days depending on location.'
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking link via email and SMS.'
    }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          category: formData.category,
          subject: formData.subject,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general',
      })

      setTimeout(() => setSuccess(false), 5000)
    } catch (error) {
      console.error('EmailJS Error:', error)
      alert('Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch! </h1>
          <p className="text-gray-600 text-lg">
            We're here to help with any questions about orders, products, or just to chat about fashion!
          </p>
        </div>

        <div className="max-w-6xl mx-auto place-items-center">
          {/* Contact Information Cards */}
          {/* <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 place-items-center">
            {contactInfo.map((info, index) => (
              <div key={index} className="card p-6 text-center hover:scale-[1.02] transition-transform w-full max-w-xs">
                <div className={`text-3xl mb-4 ${info.color}`}>{info.icon}</div>
                <h3 className="font-bold text-gray-900 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-sm text-gray-600">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div> */}

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <FiSend className="text-2xl text-[var(--primary)]" />
                <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
              </div>

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                  <FiCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-700 font-medium">Message sent successfully!</p>
                    <p className="text-green-600 text-sm mt-1">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="return">Return & Exchange</option>
                    <option value="product">Product Question</option>
                    <option value="business">Business Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="input-field resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  We typically respond within 24 hours during business days.
                </p>
              </form>


            </div>



            {/* FAQ & Additional Info */}
            <div className="space-y-8">
              {/* FAQ */}
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                      <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href="/policies/returns"
                    className="text-[var(--primary)] hover:underline font-medium"
                  >
                    View all FAQs →
                  </Link>
                </div>
              </div>

              {/* Business Hours */}
              <div className="card p-8 bg-gradient-to-r from-blue-50 to-cyan-50">
                <div className="flex items-center gap-3 mb-6">
                  <FiClock className="text-2xl text-[var(--primary)]" />
                  <h3 className="text-2xl font-bold text-gray-900">Business Hours</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">Monday - Friday</span>
                    <span className="text-gray-600">10 AM - 7 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">Saturday</span>
                    <span className="text-gray-600">10 AM - 6 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">Sunday</span>
                    <span className="text-gray-600">12 PM - 5 PM</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white rounded-lg">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Note:</span> Response times may be longer during sale periods and holidays.
                  </p>
                </div>
              </div>

              {/* Quick WhatsApp Contact */}
              <div className="card p-8 bg-gradient-to-r from-green-50 to-emerald-50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick WhatsApp Chat</h3>
                <p className="text-gray-700 mb-6">
                  Prefer instant messaging? Chat with our support team on WhatsApp for quick answers.
                </p>
                <a
                  href="https://wa.me/919651743565"
                  target="_blank"
                  className="w-full inline-flex items-center justify-center gap-3 bg-green-500 text-white px-6 py-4 rounded-full font-semibold hover:bg-green-600 transition-colors"
                >
                  <FiMessageSquare className="text-xl" />
                  Chat on WhatsApp
                </a>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Average response time: 15-30 minutes
                </p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          {/* <div className="mt-12 card p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Follow us on social media for style inspiration, new drops, and exclusive offers!
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: 'Instagram', icon: '📸', color: 'from-pink-500 to-purple-500' },
                { name: 'Twitter', icon: '🐦', color: 'from-blue-400 to-cyan-400' },
                { name: 'Facebook', icon: '📘', color: 'from-blue-600 to-blue-800' },
                { name: 'YouTube', icon: '🎥', color: 'from-red-500 to-red-700' },
                { name: 'TikTok', icon: '🎵', color: 'from-black to-gray-800' },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="flex flex-col items-center group"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${social.color} flex items-center justify-center text-white text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                    {social.icon}
                  </div>
                  <span className="font-medium text-gray-700">{social.name}</span>
                </a>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}