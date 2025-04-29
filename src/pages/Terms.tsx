
import React from 'react';
import Layout from '@/components/layout/Layout';

const Terms: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
        
        <div className="bg-white border rounded-lg p-6 mb-6">
          <p className="text-gray-600 mb-6">
            Last updated: April 29, 2025
          </p>
          
          <p className="mb-6">
            Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the EcoShop website (the "Service") operated by EcoShop ("us", "we", or "our").
          </p>
          
          <p className="mb-6">
            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>
          
          <p className="mb-6">
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
          </p>
        </div>
        
        <div className="space-y-8 mb-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Accounts</h2>
            <div className="bg-white border rounded-lg p-6">
              <p className="mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
              
              <p className="mb-4">
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
              </p>
              
              <p>
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Purchases</h2>
            <div className="bg-white border rounded-lg p-6">
              <p className="mb-4">
                If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including your credit card number, the expiration date of your credit card, your billing address, and your shipping information.
              </p>
              
              <p className="mb-4">
                You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct, and complete.
              </p>
              
              <p>
                By submitting such information, you grant us the right to provide the information to third parties for purposes of facilitating the completion of Purchases.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Shipping and Delivery</h2>
            <div className="bg-white border rounded-lg p-6">
              <p className="mb-4">
                We will make every effort to ship your order according to the estimated delivery times provided at checkout. We cannot guarantee specific delivery times as this service is provided by third-party carriers.
              </p>
              
              <p>
                You agree to inspect all products upon arrival and report any issues within 48 hours of receipt.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Product Descriptions</h2>
            <div className="bg-white border rounded-lg p-6">
              <p className="mb-4">
                We strive to provide accurate descriptions of all products available through our Service. However, we do not warrant that product descriptions or other content of the Service is accurate, complete, reliable, current, or error-free.
              </p>
              
              <p>
                If a product offered by us is not as described, your sole remedy is to return it in unused condition.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Returns and Refunds</h2>
            <div className="bg-white border rounded-lg p-6">
              <p>
                Please refer to our Returns & Exchanges policy for information about returning products and receiving refunds.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <div className="bg-white border rounded-lg p-6">
              <p className="mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of EcoShop and its licensors. The Service is protected by copyright, trademark, and other laws of both Vietnam and foreign countries.
              </p>
              
              <p>
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of EcoShop.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
            <div className="bg-white border rounded-lg p-6">
              <p className="mb-4">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              
              <p className="mb-4">
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
              </p>
              
              <p>
                All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
            <div className="bg-white border rounded-lg p-6">
              <p className="mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
              </p>
              
              <p>
                By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
            <div className="bg-white border rounded-lg p-6">
              <p>
                These Terms shall be governed and construed in accordance with the laws of Vietnam, without regard to its conflict of law provisions.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <div className="bg-white border rounded-lg p-6">
              <p>
                If you have any questions about these Terms, please contact us at legal@ecoshop.com.
              </p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
