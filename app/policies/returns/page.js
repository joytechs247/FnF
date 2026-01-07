import Link from 'next/link'
import { FiRefreshCw, FiPackage, FiDollarSign, FiClock } from 'react-icons/fi'

export default function ReturnsPage() {
  const returnSteps = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Contact our support team within 7 days of delivery',
      icon: '📧'
    },
    {
      step: 2,
      title: 'Get Return Label',
      description: 'We\'ll email you a prepaid return shipping label',
      icon: '🏷️'
    },
    {
      step: 3,
      title: 'Pack & Ship',
      description: 'Pack items with original tags and ship within 3 days',
      icon: '📦'
    },
    {
      step: 4,
      title: 'Receive Refund',
      description: 'Get refund within 5-7 business days after inspection',
      icon: '💸'
    }
  ]

  const conditions = [
    {
      title: 'Items must be',
      items: [
        'In original condition (unworn, unwashed)',
        'With original tags attached',
        'In original packaging',
        'Free of stains or odors'
      ],
      type: 'allowed'
    },
    {
      title: 'Items cannot be',
      items: [
        'Used or worn items',
        'Damaged or altered items',
        'Items without tags',
        'Personalized/custom items',
        'Sale/clearance items'
      ],
      type: 'not-allowed'
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Return & Refund Policy</h1>
          <p className="text-gray-600">
            Last updated: January 15, 2024
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
            <FiRefreshCw />
            <span className="text-sm font-medium">Easy returns within 7 days</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Quick Summary */}
          <div className="card p-8 mb-8 bg-gradient-to-r from-green-50 to-emerald-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Return Promise</h2>
            <p className="text-gray-700 mb-6">
              We want you to love your FibresNFools purchase! If you're not completely satisfied, you can return most items within 7 days of delivery for a full refund or exchange.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-xl">
                <div className="text-2xl mb-2">📅</div>
                <div className="font-bold text-gray-900">7 Days</div>
                <div className="text-sm text-gray-600">Return Window</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl">
                <div className="text-2xl mb-2">💸</div>
                <div className="font-bold text-gray-900">Full Refund</div>
                <div className="text-sm text-gray-600">Original Payment</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl">
                <div className="text-2xl mb-2">🚚</div>
                <div className="font-bold text-gray-900">Free Returns</div>
                <div className="text-sm text-gray-600">Prepaid Label</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl">
                <div className="text-2xl mb-2">⏱️</div>
                <div className="font-bold text-gray-900">5-7 Days</div>
                <div className="text-sm text-gray-600">Refund Process</div>
              </div>
            </div>
          </div>

          {/* Return Process */}
          <div className="card p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Simple 4-Step Return Process</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {returnSteps.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <div className="text-3xl mb-3">{step.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Return Conditions */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {conditions.map((condition, index) => (
              <div key={index} className="card p-8">
                <div className={`p-3 rounded-xl mb-6 ${
                  condition.type === 'allowed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  <h3 className="text-xl font-bold">{condition.title}</h3>
                </div>
                <ul className="space-y-3">
                  {condition.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        condition.type === 'allowed'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {condition.type === 'allowed' ? '✓' : '✗'}
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Refund Details */}
          <div className="card p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Refund Details</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <FiDollarSign className="text-2xl text-[var(--primary)] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Refund Amount</h4>
                  <p className="text-gray-700">
                    You'll receive a full refund of the item price, minus any shipping charges (unless the return is due to our error). Original shipping charges are non-refundable.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FiClock className="text-2xl text-[var(--primary)] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Refund Timeline</h4>
                  <p className="text-gray-700">
                    Once we receive and inspect your return, we'll process your refund within 5-7 business days. The refund will be issued to your original payment method. Bank processing times may vary.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FiPackage className="text-2xl text-[var(--primary)] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Exchanges</h4>
                  <p className="text-gray-700">
                    We currently offer size exchanges only. Contact our support team to initiate an exchange. If the desired size is unavailable, we'll issue a refund and notify you when it's back in stock.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Defective Items */}
          <div className="card p-8 bg-gradient-to-r from-blue-50 to-cyan-50">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Defective or Wrong Items</h3>
            <p className="text-gray-700 mb-4">
              If you receive a defective item or the wrong item, please contact us immediately. We'll arrange for a prepaid return label and expedite your replacement or refund.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="p-4 bg-white rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">Contact Window</h4>
                <p className="text-gray-600">Report within 48 hours of delivery</p>
              </div>
              <div className="p-4 bg-white rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">Required Evidence</h4>
                <p className="text-gray-600">Photos/video of the issue</p>
              </div>
            </div>
          </div>

          {/* Contact & Navigation */}
          <div className="mt-12">
            <div className="card p-8 mb-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help with a Return?</h3>
              <p className="text-gray-700 mb-6">
                Our support team is here to help! Contact us for any return-related questions.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="mailto:returns@fibresnfools.com"
                  className="px-6 py-3 bg-[var(--primary)] text-white rounded-full hover:opacity-90 transition-opacity"
                >
                  📧 Email Returns Team
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                >
                  💬 WhatsApp Support
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/policies/privacy"
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/policies/terms"
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-black transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}