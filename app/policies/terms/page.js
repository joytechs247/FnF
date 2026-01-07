import Link from 'next/link'
import { FiFileText, FiShoppingBag, FiCreditCard, FiAlertCircle } from 'react-icons/fi'

export default function TermsPage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: <FiFileText />,
      content: `By accessing and using the FibresNFools website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website or services.

These terms apply to all visitors, users, and others who access or use the service.`
    },
    {
      title: 'Account Registration',
      icon: <FiShoppingBag />,
      content: `To access certain features, you may be required to register for an account. You agree to:
      • Provide accurate and complete information
      • Maintain the security of your password
      • Accept responsibility for all activities under your account
      • Notify us immediately of any unauthorized use

We reserve the right to refuse service, terminate accounts, or cancel orders at our discretion.`
    },
    {
      title: 'Products & Pricing',
      icon: <FiCreditCard />,
      content: `All products are subject to availability. We reserve the right to discontinue any product at any time.

Prices are subject to change without notice. We are not responsible for typographical errors in pricing.

Colors may vary slightly from what appears on your screen due to monitor calibration differences.`
    },
    {
      title: 'Intellectual Property',
      icon: <FiAlertCircle />,
      content: `All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of FibresNFools and is protected by copyright and other intellectual property laws.

You may not reproduce, distribute, modify, or create derivative works without our prior written consent.

The FibresNFools name, logo, and all related names, logos, and designs are trademarks of FibresNFools.`
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-gray-600">
            Last updated: January 15, 2024
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full">
            <FiFileText />
            <span className="text-sm font-medium">Please read these terms carefully</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Introduction */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to FibresNFools</h2>
            <p className="text-gray-700">
              These Terms and Conditions govern your use of the FibresNFools website and the purchase of products from us. By placing an order or using our website, you agree to these terms.
            </p>
          </div>

          {/* Main Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="card p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-xl">
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                </div>
                <div className="text-gray-700 whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* Order & Shipping */}
          <div className="card p-8 mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ordering & Shipping</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Order Confirmation</h4>
                <p className="text-gray-700">
                  After placing an order, you will receive an order confirmation email. This email does not constitute acceptance of your order, only confirmation that we have received it.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Shipping Times</h4>
                <p className="text-gray-700">
                  We aim to process and ship orders within 2-3 business days. Shipping times vary based on your location and the shipping method selected. Estimated delivery times are provided during checkout but are not guaranteed.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">International Orders</h4>
                <p className="text-gray-700">
                  International orders may be subject to customs duties and taxes, which are the responsibility of the recipient. We are not responsible for any delays caused by customs clearance.
                </p>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="card p-8 mt-8 bg-gradient-to-r from-red-50 to-pink-50">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h3>
            <p className="text-gray-700 mb-4">
              To the fullest extent permitted by law, FibresNFools shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from:
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>• Your use or inability to use the service</li>
              <li>• Any unauthorized access to or use of our servers</li>
              <li>• Any interruption or cessation of transmission to or from our service</li>
              <li>• Any bugs, viruses, or other harmful code</li>
              <li>• Any errors or omissions in any content</li>
            </ul>
          </div>

          {/* Governing Law */}
          <div className="card p-8 mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Governing Law & Changes</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Governing Law</h4>
                <p className="text-gray-700">
                  These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Changes to Terms</h4>
                <p className="text-gray-700">
                  We reserve the right to modify these terms at any time. We will provide notice of significant changes by posting the new terms on this site. Your continued use of the service constitutes acceptance of the modified terms.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <Link
              href="/policies/privacy"
              className="px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-black transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/policies/returns"
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
            >
              Return & Refund Policy
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}