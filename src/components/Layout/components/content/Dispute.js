import React from "react";
import { ContentLayout } from "./ContentLayout";

export const Dispute = () => {
  return (
    <ContentLayout>
      <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl my-8 text-center">
        Dispute Resolution Policy
      </h1>
      <div className="space-y-4">
        <h1 className="font-semibold">Introduction</h1>
        <p className="text-base">
          At the National Curriculum Development Center (NCDC), we are committed
          to providing quality services to our customers. However, if a dispute
          arises, we encourage you to contact us immediately to try and resolve
          the issue. If we are unable to reach a satisfactory resolution, we
          have a dispute resolution policy in place to ensure that any disputes
          are handled fairly and efficiently.
        </p>

        <ul className="text-base list-disc mx-4">
          <li>
            Mediation: In the event of a dispute, we encourage the parties
            involved to first attempt to resolve the dispute through mediation.
            Mediation will be conducted by a neutral third party mediator agreed
            upon by both parties.
          </li>
          <li>
            Arbitration: If mediation is not successful in resolving the
            dispute, the parties may proceed to binding arbitration. The
            arbitration will be conducted by a single arbitrator agreed upon by
            both parties or appointed by a competent court of law. The decision
            of the arbitrator will be final and binding on both parties.
          </li>
          <li>
            Court Proceedings: If neither mediation nor arbitration is
            successful in resolving the dispute, the parties may seek relief
            from the courts. Any legal proceedings arising out of or in
            connection with a dispute will be governed by the laws of Uganda and
            will be subject to the exclusive jurisdiction of the courts of
            Uganda.
          </li>
        </ul>

        <h1 className="font-semibold"> Conclusion</h1>
        <p className="text-base">
          At NCDC, we are committed to ensuring that any dispute is resolved in
          a fair and efficient manner, and we will make every effort to work
          with you to find a resolution.
        </p>
      </div>
    </ContentLayout>
  );
};
