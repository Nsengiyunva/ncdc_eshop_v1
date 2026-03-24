import React from "react";
import { ContentLayout } from "./ContentLayout";

export const IPR = () => {
  return (
    <ContentLayout>
      <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl my-8 text-center">
        IPR Protection Policy
      </h1>
      <div className="space-y-4">
        <h1 className="font-semibold">Introduction</h1>
        <p className="text-base">
          National Curriculum Development Center (NCDC) is committed to the
          protection of intellectual property rights (IPR) in all its
          operations. NCDC has established this IPR Protection Policy to
          safeguard the rights of creators, innovators, and inventors, and to
          promote a culture of respect for IPR within the organization and its
          stakeholders.
        </p>

        <h2 className="font-semibold">Scope</h2>
        <p className="text-base">
          This policy applies to all NCDC employees, consultants, partners, and
          stakeholders involved in the development, sale, and distribution of
          NCDC’s products, including curriculum materials, books, and any other
          materials or resources developed by NCDC.
        </p>

        <h2 className="font-semibold">Policy Statement</h2>
        <ul className="text-base list-disc mx-4">
          <li>
            NCDC recognizes and respects the intellectual property rights of all
            creators, innovators, and inventors, including patents, trademarks,
            copyrights, and trade secrets.
          </li>
          <li>
            NCDC will take all necessary measures to protect its intellectual
            property rights, including but not limited to registering patents,
            trademarks, and copyrights, and maintaining trade secrets.
          </li>
          <li>
            NCDC will not tolerate any unauthorized use or infringement of its
            intellectual property rights by any person or entity, and will take
            all necessary legal action to protect its rights.
          </li>
          <li>
            NCDC employees, consultants, partners, and stakeholders involved in
            the development, sale, and distribution of NCDC’s products must
            respect and protect the intellectual property rights of others, and
            must obtain all necessary licenses and permissions before using any
            third-party intellectual property.
          </li>
          <li>
            NCDC employees, consultants, partners, and stakeholders must report
            any suspected infringement or violation of NCDC’s or any
            third-party’s intellectual property rights to the appropriate NCDC
            authorities.
          </li>
          <li>
            NCDC will ensure that all its products are marked with appropriate
            copyright notices and trademarks, and that all materials distributed
            by NCDC are accompanied by appropriate licensing agreements and
            terms of use.
          </li>
          <li>
            NCDC will provide training and awareness-raising activities to its
            employees, consultants, partners, and stakeholders to ensure that
            they understand the importance of IPR protection and are able to
            comply with this policy.
          </li>
        </ul>

        <h1 className="font-semibold"> Conclusion</h1>
        <p className="text-base">
          NCDC is committed to upholding the highest standards of IPR protection
          in all its operations, and to promoting a culture of respect for IPR
          among its stakeholders. NCDC will continuously review and update this
          policy to ensure that it remains current and effective in protecting
          the intellectual property rights of NCDC and its stakeholders.
        </p>
      </div>
    </ContentLayout>
  );
};
