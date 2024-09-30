import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';

const eula = `
Geodelic Inc. End User License Agreement (Updated 03/01/2023)

This End User License Agreement replaces all prior versions in their entirety.
1. How this Agreement Works
1.1 Acceptance of Terms.
BY INSTALLING THE SOFTWARE, USING ANY FUNCTIONALITY OF THE SOFTWARE AND/OR ACCESSING THE SOFTWARE, YOU ARE CONSENTING TO BE BOUND BY AND ARE BECOMING A PARTY TO THIS AGREEMENT. IF YOU DO NOT AGREE TO ANY OF THESE TERMS, YOU ARE NOT AUTHORIZED TO INSTALL, USE OR ACCESS THE SOFTWARE. YOUR USE OF THE SOFTWARE IS ENTIRELY AT YOUR OWN RISK.
This End User License Agreement (the “Agreement”) is made between you (the “User(s)” or “you”) and Geodelic Inc., a Maryland corporation (“Company”, “we” and “us”). This Agreement governs your use of the Company’s software and applications, their respective functionalities, any content contained within, or related to, the software and applications, including to images, scripts, instruction sets, and any related documentation (collectively, the “Software”). You are agreeing to the terms of this Agreement by installing, using and/or accessing the Software.

1.2 Binding on Employer. To the extent you are using the Software on behalf of your employer or any third party, or installing the Software on any electronic equipment owned by your employer or any third party, you represent and agree that you are authorized to bind your employer and/or the third party to this Agreement, and that you, as well as your employer and/or the third party are and shall be bound by this Agreement.

1.3 Collection of Data. You understand and agree that by using the Software, Company may collect and use certain information about you and your use of the Software. You further consent and agree that Company may collect, use, transmit, process and maintain information, including technical or diagnostic information, related to your use of the Software.

1.4 Privacy. The Company’s Privacy Policy (available at http://www.actualsoftware.com/privacy.html) governs any personal information you provide to us. By using the Software you agree to the terms of the Privacy Policy, as amended from time to time.

2. Modifications and Availability
2.1 Updates and Revisions. Company reserves the right to update and revise this Agreement and the Software at any time without prior notice. We will publish updates and revisions to this Agreement on our website with an updated date. As a User, you agree to review this Agreement before each use of the Software. You further understand and agree that your continued use of the Software after this Agreement has been updated or revised constitutes your acceptance of and agreement to be bound by the updated and revised terms. You are responsible for monitoring the updates and revisions. The terms and conditions of this Agreement, and your obligations under this Agreement, continue to apply to you even if you are no longer using the Software.

2.2 Additional Terms.
2.3 Availability. Availability of and access to the Software is not guaranteed. While web pages describing
the Software may be accessible worldwide, this does not mean the Software will be available or legal worldwide. It is your responsibility to make sure your use of the Software is legal where you use it. The Software may be modified, discontinued or unavailable to you, including by blocking access to certain features or user-generated content, at any time without notice.

3. Grant of License
3.1 Grant of License for Use. Based on your agreement to be bound by and comply with this Agreement, Company grants to you a revocable, personal, non-exclusive, non-transferable, non-assignable, non-sub- licensable, limited license for the use of the Software as it was provided to you by Company, on a single piece of electronic equipment.
Any unauthorized use of the Software or breach of this Agreement or terms, conditions, representations, or warranties contained herein, automatically terminates any permission or license granted by Company to you to use the Software. Company reserves all of its rights, including the ability to pursue all of its legal and equitable remedies for any unlawful infringement or use.

3.2 Pre-release Version. We may designate the Software as a pre-release, beta or similar type of version (each a “Pre-release Version”). A Pre-release Version does not represent the final product and may contain bugs that could cause system or other failure and data loss. You acknowledge that Pre-release Versions have such risks and by installing, using or accessing a Pre-release Version, you thereby assume those risks. We may choose not to commercially release the Pre-release Version. You must promptly cease using the Pre-release Version and destroy all copies of the Pre-release Version if we request you to do so, or if we release a commercial version of the Pre-release Version. Any separate agreement we enter into with you governing the Pre-release Version will supersede the provisions on Pre-release Version set out in this section.

4. User Conduct
4.1 Conditions of Use. The Software is intended for those who are of the age of majority and able to legally enter into binding contracts without any right of rescission. Accordingly, in using the Software, you represent, warrant, and agree that you are:
(a) of sound mind;
(b) at least eighteen (18) years or older;
(c) using the Software exclusively for lawful purposes;
(d) in compliance with all laws of the United States and any other applicable jurisdiction where you
reside or use the Software;
(e) in good standing and compliance with all obligations to Company that may exist in law, contract, or equity;
(f) in agreement and compliance with all terms of use, terms of service, and any other legal conditions of using the site(s) or network(s) in which you obtained access to the Software, including the App Kits’ terms, the Terms of Service of Google Play, Amazon’s AppStore, and Apple’s iTunes and Mac’s App Store; and
(g) in compliance with this Agreement and all representations, warranties, and conditions contained herein.

4.2 Code of Conduct and Limitations of Use. You shall not use the Software for any unlawful or otherwise prohibited means. Examples of some prohibited uses of the Software or information contained in the Software include:
(a) use of the Software in any manner that could damage, disable, overburden, or impair any of Company’s or a third party’s server(s), hardware or the network(s) connected to any Software server;

(b) disrupt, interfere with, or inhibit any other user from using or enjoying the Software (including by stalking, intimidating, or harassing others, inciting others to commit violence, or harming minors in any way) or engage in any activity that could result in a denial-of-service attack;
(c) upload content that is unlawful, harmful, threatening, abusive, tortuous, defamatory, libelous, vulgar, lewd, profane, invasive of another’s privacy, or hateful;
(d) attempt to gain unauthorized access to any information, website, server, electronic equipment, or other computer systems or networks connected to, or in use of, the Software;
(e) obtain or attempt to obtain any materials or information through any means not intentionally made available through the Software;
(f) access or attempt to access the Software by any means other than the interface we provided or authorized;
(g) circumvent any access or use restrictions put into place to prevent certain uses of the Software;
(h) use any data mining, robots, screen scraping, or similar data gathering and extraction tools on
the Software;
(i) impersonate or pretend to be any person other than yourself or falsely state or otherwise misrepresent your affiliation with a person or entity;
(j) attempt to copy, reverse engineer, hack, decompile, disassemble, host derivative works based on or otherwise modify, host, stream, sublicense, or resell the Software, or engage in any other malicious behavior related to the Software, including using contents of the Software for attempting to reverse engineer, imitate, reproduce, duplicate, or mimic any Company product, service, software, technology, or other item;
(k) use any metatags or any other “hidden text” utilizing Company’s name, service mark, trademarks or trade dress without the express written consent of Company;
(l) remove, obscure or modify any copyright, trademark or other proprietary rights notices, marks or labels contained on or within the Software;
(m) upload content that violates any third party’s intellectual property rights, including without limitation, any copyright, trademark, trade dress, patent, trade secret, unfair competition, right of privacy, right of publicity, and any other proprietary rights;
(n) use the Software if you are not able to form legally binding contracts;
(o) violate applicable law.
4.3 Intellectual Property. You shall not use, copy, or reproduce Company’s logo or marks, without express written consent from Company. All content within the Software is the property of Company or its licensors and is protected by United States and international copyright laws. Except as expressly authorized herein, or with express written consent of an officer of Company, you may not distribute, sell, resell, auction, decompile, reverse engineer, disassemble, modify, reproduce, duplicate, copy, create derivative works from, or otherwise exploit or reduce the Software or any portion thereof.
You agree that Company holds all right, title and interest in and to the Software and its contents. You acknowledge that no title or interest in such intellectual property rights is being, or has been, transferred to you. You further agree to make no claim of interest in the Software. By using the Software, you expressly waive your right to any such future claim.

4.4 Activity. You are responsible for all activity that occurs with your copy of the Software. You shall notify Company immediately if you become aware of any unauthorized use of your copy of the Software. The Software may include measures to control access to the Service, to prevent unauthorized copies, or otherwise attempt to prevent anyone from exceeding the limited rights and licenses granted under this Agreement. Only Software subject to a valid license can be used to access online resources, upload data, and download updates and patches. You may not interfere with such access control measures or attempt to disable or circumvent such security features. If you disable or otherwise tamper with the technical protection measures, the Software will not function properly and we may terminate your license without notice.
4.5 Investigations. You agree to cooperate in any governmental, police, or Company investigation regarding your use of the Software.
4.6 Reports of Abuse. If you have any reason to believe that the information within the Software violates any law or right of another, that any user of the Software is using the Software to violate the law or the right of another, or that any user is violating the Agreement, you shall notify Company in writing about the facts and circumstances of the alleged abuse or violations. Company may, but is not obligated to, conduct an investigation into the allegations.
4.7 Import and Export Limitations. This Agreement, the Software, your content and use of the same, may be subject to the import and export laws and regulations of the United States, other countries and other governing bodies. You represent and warrant you are in compliance with, and shall always be in compliance with, all applicable import and export laws and regulations. In particular, but without limitation, the Software may not be exported or distributed to individuals, entities, or agencies: (a) in any U.S. embargoed countries; (b) on the U.S. Treasury Department’s list of Specially Designated Nationals; or (c) on the U.S. Department of Commerce Denied Person’s List or Entity List. By using the Software, you represent and warrant that you: (i) are not located in any such country or on any such list; and (ii) will not use the Software for any purpose prohibited by United States law, including the development, design, manufacture or production of missiles, nuclear, chemical or biological weapons, or any other law of a jurisdiction which is applicable to you.

5. Your Content and Information
5.1 Ownership. You retain all ownership of your content. We do not claim any ownership rights to your
content.
5.2 Licenses to Your Content. We require certain licenses from you to your content to operate, enable and update the Software, enforce the provisions of this Agreement and provide related services to you. When you upload content to the Software, you grant us a perpetual, worldwide, royalty-free, non-exclusive, sub-licensable, assignable and transferrable license to use, reproduce, modify (so as to better transmit your content, for example), disclose, and translate the content as needed for the purposes of operating, enabling and updating the Software, including in response to user driven actions, enforcing the provisions of this Agreement and providing related services to you.
5.3 Our Access and Disclosure. We will not access, view, or listen to any of your content, except as reasonably necessary to operate, enable or update the Software, enforce provisions of this Agreement or address or provide related services to you. Such actions may include: (a) responding to support requests; and (b) detecting, preventing, or otherwise addressing fraud, security, unlawful acts, or technical issues. Furthermore, we may access or disclose information about you or your use of the Software, (i) when it is required by law (such as upon a request by a governmental agency or if we receive a subpoena or search warrant); (ii) to respond to your requests for customer service support; or (iii) when we, in our discretion, think it is necessary to protect the rights, property, or personal safety of us, you, other users, a third party, or the public.
5.4 Provision of Information. To the extent that you provide any personal information or other information to Company related to your use of the Software, you agree that all information you provide is true, current, complete and accurate. You also agree that you will update your information as needed to keep it true, current, complete and accurate. You shall notify Company within ten (10) days of any material change in information you provided to Company. You represent and warrant that you provided notice to, and obtained consent from, all third parties whose personal, business, or other data you have supplied, or will supply, to Company. You further represent and warrant that to the extent you provided such data about a third party to Company, you provided that third party with notice about this Agreement and procured that third party’s acceptance of this Agreement. You accept all liability resulting from your failure to provide notice to, or receive consent from, such third parties and for your provision of untrue, outdated, incomplete or inaccurate information to Company.
5.5 Security of Data Transmission and Storage. Electronic communications using the Software may not always be encrypted. You acknowledge that there is a risk that data, including personal data, may be accessed by unauthorized third parties when communicated between you and Company or when you share content with other applications.
6. Virtual Goods. Company may license to you certain virtual goods (“Virtual Goods”) to be used within the Software. Unless otherwise specified, these Virtual Goods shall be deemed an integral part of the Software. Any and all Virtual Goods are licensed to you on a revocable, limited, personal, non-assignable, non- transferable and non-sub-licensable basis. The Virtual Goods may be licensed both for a fee using “real world money” and without any separate fee, as applicable from time to time. Any payment for Virtual Goods or redemption of any third party virtual currency is always FINAL AND NON-REFUNDABLE.
 Company may manage, regulate, control, revalue, modify and eliminate Virtual Goods at any time, with or without notice. Company shall have no liability to you or any third party in the event that Company exercises any such rights.
If we discontinue the Software in its entirety, we will allow you to use, if possible, your Virtual Goods for one year.
YOU ACKNOWLEDGE AND AGREE THAT COMPANY IS NOT REQUIRED TO PROVIDE A REFUND FOR VIRTUAL GOODS FOR ANY REASON, AND THAT YOU WILL NOT RECEIVE MONEY OR OTHER COMPENSATION FOR UNUSED VIRTUAL GOODS, REGARDLESS OF WHETHER IT RESULTS FROM YOUR VOLUNTARY OR INVOLUNTARY LOSS OF LICENSE UNDER THIS AGREEMENT.
7. Termination
7.1 Termination by You. You may stop using the Software at any time; however, to terminate this Agreement with us, you must delete the Software and all copies thereof. If you stop using the Software or terminate this Agreement, you are not relieved of any obligation to pay any outstanding fees.
7.2 Termination by Us. We may terminate this Agreement (and access to the Software) with you in our discretion at any time and without notice, including upon the events listed below.
(a) You act in a manner that clearly shows you do not intend to, or are unable to, comply with this Agreement;
(b) You fail to make the timely payment of fees for the Software, if any;
(c) We are required to do so by law (for example, where the provision of the Software to you is, or
becomes, unlawful);
(d) We elect to discontinue the Software, in whole or in part (such as if it becomes impractical for us to continue offering the Software in your region due to change of law); or
1493924.v3
5

(e) There has been an extended period of inactivity of the Software.
In addition, this Agreement will terminate immediately and automatically without any notice to you if you breach any provision of this Agreement.
7.3 Effect of Termination; Survival. Upon termination, all rights grants to you under this Agreement will also terminate and you must cease all use and delete all copies of the Software. Termination will not limit any of Company’s rights or remedies at law or in equity. Furthermore, upon termination of this Agreement, any perpetual licenses you have granted, your indemnification obligations, our warranty disclaimers or limitations of liabilities, and the dispute resolution provisions stated in these terms will survive.

8. Indemnification. By using the Software, you shall and do hereby agree to defend, indemnify and hold harmless Company, its affiliates, subsidiaries, directors, officers, employees, agents, partners and licensors from and against all injuries, claims, demands, losses, damages, liabilities, actions, judgments, settlements, interest, awards, penalties, fines, costs or expenses of whatever kind, including reasonable attorneys’ fees, arising, directly or indirectly, out of or relating to your access to, or (mis)use of, the Software or any other information related to the Software, or breach of this Agreement. Such indemnity shall include Company’s attorneys’ fees, court costs, and expert fees. The provisions of this section are also intended to apply to any situation where you commence litigation against Company, for any reason, and fail to prevail on all aspects of your claims or where Company succeeds on one or more of its defenses to any claim you assert. Furthermore, you agree that Company assumes no responsibility for the content you submit or make available through the Software.
You agree that Company shall have the right to participate in the defense of any claim asserted against Company. You also agree that Company shall be entitled to retain legal counsel of Company’s own choosing at your cost and expense. You further agree to notify Company of your knowledge of any claim or potential (including if threatened) claim against Company. You agree to cooperate fully with Company during any proceeding against Company.

9. WARRANTIES. THE SOFTWARE IS PROVIDED “AS IS” AND WITH ALL FAULTS AND DEFECTS. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, WE, AND ON BEHALF OF OUR AFFILIATES, AND OUR RESPECTIVE LICENSORS AND SERVICE PROVIDERS, DISCLAIM ALL WARRANTIES WHETHER EXPRESS OR IMPLIED, STATUTORY OR OTHERWISE, INCLUDING ALL IMPLIED WARRANTIES OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY, AND FITNESS FOR A PARTICULAR PURPOSE, AND ANY WARRANTIES THAT MAY ARISE OUT OF COURSE OF DEALING, COURSE OF PERFORMANCE, OR USAGE OR TRADE PRACTICE. WE MAKE NO COMMITMENTS ABOUT THE CONTENT WITHIN THE SOFTWARE. WE FURTHER DISCLAIM ANY AND ALL WARRANTIES, EXPRESS OR IMPLIED, THAT (A) THE SOFTWARE WILL MEET YOUR REQUIREMENTS OR WILL BE CONSTANTLY AVAILABLE, UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE; (B) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SOFTWARE WILL BE EFFECTIVE, ACCURATE, OR RELIABLE; (C) THE QUALITY OF THE SOFTWARE WILL MEET YOUR EXPECTATIONS; (D) ANY ERRORS OR DEFECTS IN THE SOFTWARE WILL BE CORRECTED; OR (E) THE SOFTWARE WILL BE COMPATIBLE WITH ANY OTHER SOFTWARE, APPLICATIONS, SYSTEMS OR SERVICES.
WE SPECIFICALLY DISCLAIM ANY LIABILITY FOR ANY ACTIONS RESULTING FROM YOUR USE OF OR ACCESS TO THE SOFTWARE. YOU USE AND ACCESS THE SOFTWARE AT YOUR OWN DISCRETION AND RISK, AND YOU ARE SOLELY RESPONSIBLE FOR ANY DAMAGE TO ANY ELECTRONIC SYSTEM OR LOSS OF DATA THAT RESULTS FROM THE USE OF AND ACCESS TO THE SOFTWARE.
SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATIONS ON IMPLIED WARRANTIES OR THE LIMITATIONS ON THE APPLICABLE STATUTORY RIGHTS OF A CONSUMER, SO SOME OR ALL OF THE ABOVE EXCLUSIONS AND LIMITATIONS MAY NOT APPLY TO YOU.

10. LIMITATION OF LIABILITY. IN NO EVENT SHALL WE OR OUR AFFILIATES OR ANY OF OUR OR THEIR RESPECTIVE LICENSORS OR SERVICE PROVIDERS BE LIABLE TO YOU OR ANYONE ELSE, WHETHER OR NOT FORESEEABLE, FOR: (A) ANY LOSS OF USE, DATA, GOODWILL, OR PROFITS; (B) PERSONAL INJURY, PROPERTY DAMAGE, COST OF SUBSTITUTE GOODS, BUSINESS INTERRUPTION OR COMPUTER FAILURE OR MALFUNCTION; OR (C) ANY OTHER SPECIAL, INCIDENTAL, INDIRECT, CONSEQUENTIAL, EXEMPLARY OR PUNITIVE DAMAGES WHATSOEVER (EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF THESE DAMAGES), INCLUDING THOSE (W) THAT WERE FORESEEABLE OR FOR WHICH COMPANY WAS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, (X) RESULTING FROM LOSS OF USE, DATA, GOODWILL OR PROFITS, (Y) BASED ON ANY THEORY OF LIABILITY, INCLUDING BREACH OF CONTRACT OR WARRANTY, NEGLIGENCE OR OTHER TORTUOUS ACTION, OR (Z) ARISING FROM ANY OTHER CLAIM ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR ACCESS TO THE SOFTWARE. NOTHING IN THIS AGREEMENT LIMITS OR EXCLUDES OUR LIABILITY FOR GROSS NEGLIGENCE, FOR OUR (OR OUR EMPLOYEES’) INTENTIONAL MISCONDUCT.
OUR TOTAL LIABILITY IN ANY MATTER ARISING OUT OF OR RELATED TO THESE TERMS IS LIMITED TO THE AGGREGATE AMOUNT ACTUALLY PAID BY YOU FOR THE SOFTWARE DURING THE TWELVE-MONTH PERIOD PRECEDING THE EVENT GIVING RISE TO THE LIABILITY. THIS LIMITATION WILL APPLY EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF THE LIABILITY EXCEEDING THE AMOUNT AND NOTWITHSTANDING ANY FAILURE OF ESSENTIAL PURPOSE OF ANY LIMITED REMEDY.
YOU EXPRESSLY AGREE WE MAKE TAKE ANY LAWFUL ACTION TO ENFORCE THIS SECTION.
SOME JURISDICTIONS DO NOT ALLOW THE CERTAIN LIMITATIONS OF LIABILITY, SO SOME OR ALL OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU. THE LIMITATIONS AND EXCLUSIONS IN THIS SECTION APPLY TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW.

11. U.S. Government Rights. The Software is commercial computer software, as such term is defined in 48 C.F.R. § 2.101. Accordingly, if you are an agency of the U.S. Government or any contractor therefor, you receive only those rights with respect to the Software as are granted to all other end users under license, in accordance with (a) 48 C.F.R. § 227.7201 through 48 C.F.R. § 227.7204, with respect to the Department of Defense and its contractors, or (b) 48 C.F.R. § 12.212, with respect to all other U.S. Government licensees and their contractors.

12. Applicable Law, Venue and Dispute Resolution
12.1 Applicable Law. You agree that all matters relating to your access to or use of the Software, including all disputes, shall be governed by the laws of the United States and by the laws of the State of Maryland without regard to any conflict of law principals. You agree to the personal jurisdiction of, and venue in, the state and federal courts with jurisdiction in Annapolis, Maryland, and waive any objection to such jurisdiction or venue. To the extent you commence any action against Company in a jurisdiction other than those stated above, you agree that Company shall be able to transfer venue of the action at your cost and without your objection, to the venue listed above. You hereby waive any objection, claim, or defense related to the validity of jurisdiction or venue pursuant to this section. To the extent any provision of the venue section is invalidated by a court of competent jurisdiction then, unless waived by the Company, the parties will arbitrate the dispute via the National Arbitration Forum, or another suitable independent arbitration forum as selected by Company and located within the United States of America. The cost of the arbitration shall initially be borne by the plaintiff of the action and subject to reimbursement by the non-prevailing party.

12.2 Limitation on Statute of Limitations. Any claim you have, or any claim a party you are acting on behalf of has, related to the Software must be brought within six (6) months after the cause of action arises, or such claim or cause of action shall be barred and deemed invalid.
12.3 Waiver of Jury Trial. THE PARTIES HEREBY WAIVE ANY RIGHT TO A TRIAL BY JURY IN ANY ACTION OR PROCEEDING TO ENFORCE OR DEFEND ANY RIGHTS UNDER THIS AGREEMENT OR RELATED TO THE SOFTWARE. THE PARTIES ALSO HEREBY WAIVE ANY RIGHT TO A TRIAL BY JURY RELATED TO THE CALCULATION OR DETERMINATION OF ANY ATTORNEYS’ FEES TO BE AWARDED.
12.4 Dispute Resolution and Arbitration
(a) Process. For any concern or dispute you may have, you agree to first try to resolve the dispute informally by contacting us. If a dispute is not resolved, including by cure of an alleged breach by Company, within thirty (30) days of submission, you must resolve any claims relating to this Agreement or the Software through final and binding arbitration, unless arbitration is waived in writing by Company. Your submission must be in writing and pursuant to the terms of the notice provide in this Agreement.
(b) Rules. JAMS will administrate the arbitration in Hennepin County, Minnesota pursuant to its Comprehensive Arbitration Rules & Procedures. There will be one arbitrator that you and Company both select. If you and Company cannot agree upon an arbitrator within fifteen (15) days of a party initiating the selection process, within fifteen (15) days thereafter, you and Company shall each select and arbitrator and those arbitrators shall select a third arbitrator who will oversee the dispute. The arbitration will be conducted in the English language, but any witness whose native language is not English may give testimony in the witness’ native language, with simultaneous translation into English (at the expense of the party presenting the witness). Judgment upon the award rendered may be entered and will be enforceable in any court of competent jurisdiction having jurisdiction over the parties.
(c) No Class Actions. Except where prohibited by law, you may only resolve disputes with us on an individual basis, and may not bring a claim as a plaintiff or a class member in a class, consolidated, or representative action. This includes any and all disputes regarding our Privacy Policy.
(d) Injunctive Relief. Notwithstanding the foregoing, in the event of your or others’ unauthorized access to or use of the Software or any portion thereof in violation of this Agreement you agree that we are entitled to apply for injunctive remedies (or an equivalent type of urgent legal relief) in any jurisdiction.

13. Miscellaneous
13.1 Other Contracts. To the extent you have other contract(s) or agreement(s) with Company on any subject matter, related or unrelated to the Software, your breach of this Agreement shall constitute a non-curable default of your other contract(s) or agreement(s) with Company. This shall entitle Company, in addition to the relief available herein, to pursue all relief afforded to Company under the other contract(s) or agreement(s) with you. To the extent you breach this Agreement and a dispute arises over whether a default or breach of the other contract(s) or agreement(s) occurred by you or Company, the choice of law and venue provisions of this Agreement shall govern any such dispute.
13.2 Notices. You agree that we may provide legal notice to you by updating or revising this Agreement and/or posting any amended terms related to your use of the Software or any Company product or service on the website located at http://www.actualsoftware.com, and/or the site in which you downloaded or gained access to the application (e.g., App-Kits, Google’s Play Store, Apple Store). You further agree you may receive notice from Company through any avenue of written communication, including electronic communications (e.g., e- mail, text message, etc.), and in any medium of communication that have you used to contact Company or such

contact information as you have provided to Company. You may provide notice to Company exclusively via Certified United States Mail or Federal Express Overnight Delivery at:
Geodelic Inc.
Attn: Legal Notice
27 Rosemary Street, Annapolis, Md. 21401, United States of America
Notice shall be deemed given upon the other party’s receipt of the communication, or four (4) days after mailing via the United States Postal service Certified Mail with the correct address and proper postage.
13.3 Feedback. You have no obligation to provide us with ideas, suggestions, or proposals (“Feedback”). However, if you submit Feedback to us, then you grant us a non-exclusive, worldwide, royalty-free license that is sub-licensable and transferrable, to make, use, sell, have made, offer to sell, import, reproduce, publicly display, distribute, modify, publicly perform the Feedback and generally profit from the Feedback.
13.4 Non-Assignment. You shall not assign any of your rights related to the Software or this Agreement.
14. Third Party Accounts. The Software will require an internet connection to access the Software or its internet-based features, authenticate the Software, or perform other functions. In order for certain features of the Software to operate properly, you may be required to have and maintain (a) an adequate internet connection and/or (b) a valid and active account with an internet service provider. By using the Software, you acknowledge and agree that third party data transfer fees may apply depending on your data plan. Please consult your carrier or internet service provider for further information. If you do not maintain such accounts, then the Software or certain features of the Software may not operate or may cease to function properly, either in whole or in part.
15. Third Party Information. The Software may contain materials from, or references to (including hyperlinks), third parties (“Third Party Materials”). Company does not control such other third parties, make any endorsement, authorization or sponsorship of them or Third Party Materials, or make any representation concerning the content, accuracy, security or privacy of Third Party Materials. You acknowledge and agree that Company shall not be liable or responsible for Third Party Material or the damages you may suffer due to using relying on Third Party Materials.

16. Taxes and Third Party Fees. You must pay any applicable taxes, and any applicable third party fee (including, for example, telephone toll charges, mobile carrier fees, internet service provider charges, data plan charges, credit card fees, foreign exchange fees) incurred in accessing the Software. We are not responsible for these fees. We may take steps to collect the fees you owe us. You are responsible for all related collection costs and expenses.
16.1 Attorneys’ Fees. Notwithstanding anything to the contrary herein, if Company prevails in any action, suit, or proceeding, in any way, arising from or based upon enforcement of this Agreement, or in the defense of any claim, Company shall be entitled to recover its attorneys’ fees in connection therewith in addition to court costs and other fees and disbursement incurred in such action, suit, or proceeding.
16.2 Severability. This Agreement constitutes the entire agreement between you and Company and supersedes any prior agreements between you and Company relating to the Software. If any part of this Agreement is deemed invalid or unenforceable by a court of competent jurisdiction, that portion shall be construed in a manner consistent with applicable law to reflect, as nearly as possible, the original intentions of the parties, and the remaining portions of this Agreement shall remain in full force and effect.
16.3 Conflict. If any terms of this Agreement conflict with other terms of this Agreement or in other Agreements that Company may have with you, the parties agree that Company shall be entitled to the most expansive rights provided and that your rights shall be limited to the most restrictive rights provided.

16.4 Non-waiver. The failure of Company to exercise or enforce any right or provision of this Agreement shall not constitute a waiver of such right or provision unless Company’s President signs a written waiver and specifically references that this non-waiver section of the Agreement shall not apply.
16.5 Reasonableness of Terms. You understand and agree that the terms herein are necessary and reasonable based on the free or nominal cost of the Software as provided by Company to User, the availability of alternative Software, and any compensation paid to you through any direct or indirect use of the Software.
16.6 Construction. The term including and its derivatives shall mean “including, without limitation” and “including, but not limited to”.
16.7 Legal Advice. COMPANY DOES NOT OFFER LEGAL ADVICE OR SERVICES TO YOU. AS A USER OF THE SOFTWARE, YOU ARE ENCOURAGED TO OBTAIN YOUR OWN COUNSEL REGARDING YOUR RIGHTS AND RESPONSIBILITIES UNDER THIS AGREEMENT AND ANY
`;

const EulaScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.secContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.paragrapg}>{eula}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EulaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.aliceBlue,
  },
  secContainer: {
    backgroundColor: Colors.aliceBlue,
    paddingHorizontal: wp(5),
  },
  paragrapg: {
    ...Style.getTextStyle(16, 'Regular', Colors.accent),
    paddingVertical: hp(2),
  },
});
