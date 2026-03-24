import React from "react";
import { ContentLayout } from "./ContentLayout";

export const TC = () => {
  return (
    <ContentLayout>
      <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl my-8 text-center">
        Terms and Conditions
      </h1>
      <div className="space-y-4">
        <p className="text-base">
          Welcome to the National Curriculum Development Center website. The
          following terms and conditions ("Terms") govern your access to and use
          of the website, including any content, functionality, and services
          offered on or through the website.
        </p>

        <h2 className="font-semibold">ACCEPTANCE OF TERMS</h2>
        <p className="text-base">
          By accessing or using this website, you agree to be bound by these
          Terms, as well as any additional terms and conditions that may apply
          to specific areas or services of the website. If you do not agree to
          these Terms, you may not access or use this website.
        </p>

        <h2 className="font-semibold">MODIFICATIONS</h2>
        <p className="text-base">
          We may revise and update these Terms from time to time in our sole
          discretion. All changes are effective immediately when we post them,
          and apply to all access to and use of the website thereafter. Your
          continued use of the website following the posting of revised Terms
          means that you accept and agree to the changes. It is your
          responsibility to check this page regularly for changes to the Terms.
        </p>

        <h2 className="font-semibold">INTELLECTUAL PROPERTY RIGHTS</h2>
        <p className="text-base">
          The website and its entire contents, features, and functionality,
          including but not limited to all text, graphics, logos, images, and
          software, are the property of the National Curriculum Development
          Center or its licensors and are protected by Ugandan and international
          copyright, trademark, patent, trade secret, and other intellectual
          property or proprietary rights laws.
        </p>

        <h2 className="font-semibold">LICENSE AND WEBSITE ACCESS</h2>
        <p className="text-base">
          The National Curriculum Development Center grants you a limited
          license to access and use this website for personal use only. You may
          not download (other than page caching) or modify the website or any
          portion of it, without our express written consent. This license does
          not include any resale or commercial use of this website or its
          contents; any derivative use of this website or its contents; or any
          use of data mining, robots, or similar data gathering and extraction
          tools.
        </p>

        <h2 className="font-semibold">USER CONTENT</h2>
        <p className="text-base">
          The website may allow you to submit content, including but not limited
          to text, photographs, videos, and other materials ("User Content"). By
          submitting User Content, you grant us a non-exclusive, transferable,
          sub-licensable, royalty-free, worldwide license to use, store,
          display, reproduce, modify, create derivative works, perform, and
          distribute your User Content on this website and on any other website
          or platform owned or operated by the National Curriculum Development
          Center.
        </p>

        <h2 className="font-semibold">DISCLAIMER OF WARRANTIES</h2>
        <p className="text-base">
          The website is provided "as is" and without warranties of any kind,
          either express or implied. We do not warrant that the website or any
          of its functions will be uninterrupted or error-free, that defects
          will be corrected, or that the website is free of viruses or other
          harmful components.
        </p>

        <h2 className="font-semibold">LIMITATION OF LIABILITY</h2>
        <p className="text-base">
          In no event shall the National Curriculum Development Center be liable
          for any direct, indirect, special, incidental, consequential or
          punitive damages arising out of or in connection with the use or
          inability to use the website or any content or services provided
          through the website.
        </p>

        <h2 className="font-semibold">GOVERNING LAW AND JURISDICTION</h2>
        <p className="text-base">
          These Terms and your use of the website shall be governed by and
          construed in accordance with the laws of Uganda. Any legal action or
          proceeding relating to your access to, or use of, the website shall be
          instituted in the courts of Uganda.
        </p>

        <h2 className="font-semibold">CONTACT INFORMATION</h2>
        <p className="text-base">
          If you have any questions about these Terms, please contact us at
          info@ncdc.go.ug.
        </p>
      </div>
    </ContentLayout>
  );
};
