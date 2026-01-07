import Link from 'next/link'
import { FiShield, FiEye, FiLock, FiMail } from 'react-icons/fi'

export default function PrivacyPolicyPage() {
  const lastUpdated = 'January 15, 2024'

  const sections = [
    {
      title: 'Information We Collect',
      icon: <FiEye />,
      content: `We collect information that you provide directly to us, including when you create an account, place an order, or contact us for support. This may include:
      • Personal information (name, email address, phone number)
      • Shipping and billing addresses
      • Payment information (processed securely by our payment partners)
      • Communications you send to us
      • Your style preferences and purchase history`
    },
    {
      title: 'How We Use Your Information',
      icon: <FiShield />,
      content: `We use the information we collect to:
      • Process and fulfill your orders
      • Communicate with you about orders, products, and promotions
      • Improve our website and product offerings
      • Prevent fraud and enhance security
      • Comply with legal obligations
      • Personalize your shopping experience`
    },
    {
      title: 'Information Sharing',
      icon: <FiLock />,
      content: `We do not sell your personal information. We may share your information only in the following circumstances:
      • With shipping carriers to deliver your orders
      • With payment processors to complete transactions
      • When required by law or to protect our rights
      • With your consent for specific purposes
      
      All third-party service providers are contractually obligated to protect your data.`
    },
    {
      title: 'Your Rights & Choices',
      icon: <FiMail />,
      content: `You have the right to:
      • Access and update your personal information
      • Request deletion of your account and data
      • Opt-out of marketing communications
      • Lodge complaints with data protection authorities
      
      To exercise these rights, contact us at privacy@fibresnfools.com`
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">
            Last updated: {lastUpdated}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
            <FiShield />
            <span className="text-sm font-medium">Your privacy matters to us</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Introduction */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-gray-700 mb-4">
              At FibresNFools, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your information when you use our website and services.
            </p>
            <p className="text-gray-700">
              By using FibresNFools, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>

          {/* Main Content */}
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

          {/* Data Security */}
          <div className="card p-8 mt-8 bg-gradient-to-r from-blue-50 to-cyan-50">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h3>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="text-gray-700 space-y-2 mb-6">
              <li>• SSL encryption for data transmission</li>
              <li>• Secure payment processing</li>
              <li>• Regular security assessments</li>
              <li>• Restricted access to personal data</li>
              <li>• Employee privacy training</li>
            </ul>
            <p className="text-gray-700">
              While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
          </div>

          {/* Contact & Updates */}
          <div className="card p-8 mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact & Updates</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Contact Us</h4>
                <p className="text-gray-700 mb-2">
                  If you have questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>📧 Email: privacy@fibresnfools.com</li>
                  <li>📞 Phone: +91 98765 43210</li>
                  <li>📍 Address: 123 Street, City, State 123456</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Policy Updates</h4>
                <p className="text-gray-700 mb-2">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
                <p className="text-gray-700">
                  We encourage you to review this Privacy Policy periodically for any changes.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <Link
              href="/policies/terms"
              className="px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-black transition-colors"
            >
              Terms & Conditions
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