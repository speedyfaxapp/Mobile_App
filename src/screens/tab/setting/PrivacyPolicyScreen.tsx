import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../../theme/Colors';
import {wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';
import { WebView } from 'react-native-webview';

const PrivacyPolicyScreen = () => {
  return (
    <View style={{ flex: 1 }}>
    <WebView
      source={{ uri: 'https://speedyfaxapp.com/Privacy.pdf' }}
      style={{ flex: 1 }}
    />
  </View>
//     <SafeAreaView style={styles.container}>
//       <View style={styles.secContainer}>
//         <ScrollView showsVerticalScrollIndicator={true}>
//           <View>
//             <Text style={styles.header}>Types of Data collected</Text>
//             <Text
//               style={
//                 styles.paragrapg
//               }>{`Among the types of Personal Data that this Application collects, by itself or through third parties, there are: Cookies, Usage Data, unique device identifiers for advertising from geographic position, email address and first name. \n \n Complete details on each type of Personal Data collected are provided in the dedicated sections of this privacy policy or by specific explanation texts displayed prior to the Data collection.
// Personal Data may be freely provided by the User, or, in case of Usage Data, collected automatically when using this Application. \n Unless specified otherwise, all Data requested by this Application is mandatory and failure to provide this Data may make it impossible for this Application to provide its services. In cases where this Application specifically states that some Data is not mandatory, Users are free not to communicate this Data without consequences to the availability or the functioning of the Service.
// Users who are uncertain about which Personal Data is mandatory are welcome to contact the Owner.
// Any use of Cookies – or of other tracking tools – by this Application or by the owners of third-party services used by this Application serves the purpose of providing the Service required by the User, in addition to any other purposes described in the present document and in the Cookie Policy, if available.
// Users are responsible for any third-party Personal Data obtained, published or shared through this Application and confirm that they have the third party's consent to provide the Data to the Owner.
// `}</Text>
//             <Text style={styles.header}>
//               Mode and place of processing the Data
//             </Text>
//             <Text style={styles.subHeader}>Methods of processing</Text>
//             <Text
//               style={
//                 styles.paragrapg
//               }>{`The Owner takes appropriate security measures to prevent unauthorized access, disclosure, modification, or unauthorized destruction of the Data. \nThe Data processing is carried out using computers and/or IT enabled tools, following organizational procedures and modes strictly related to the purposes indicated. In addition to the Owner, in some cases, the Data may be accessible to certain types of persons in charge, involved with the operation of this Application (administration, sales, marketing, legal, system administration) or external parties (such as third-party technical service providers, mail carriers, hosting providers, IT companies, communications agencies) appointed, if necessary, as Data Processors by the Owner. The updated list of these parties may be requested from the Owner at any time.\n`}</Text>
//             <Text style={styles.subHeader}>Legal basis of processing</Text>
//             <View style={styles.subParagraphView}>
//               <Text>{'\u2022'}</Text>
//               <Text
//                 style={
//                   styles.subParagrapg
//                 }>{`Users have given their consent for one or more specific purposes. Note: Under some legislations the Owner may be allowed to process Personal Data until the User objects to such processing (“opt-out”), without having to rely on consent or any other of the following legal bases. This, however, does not apply, whenever the processing of Personal Data is subject to European data protection law;`}</Text>
//             </View>
//             <View style={styles.subParagraphView}>
//               <Text>{'\u2022'}</Text>
//               <Text
//                 style={
//                   styles.subParagrapg
//                 }>{`provision of Data is necessary for the performance of an agreement with the User and/or for any pre-contractual obligations thereof;`}</Text>
//             </View>
//             <View style={styles.subParagraphView}>
//               <Text>{'\u2022'}</Text>
//               <Text
//                 style={
//                   styles.subParagrapg
//                 }>{`processing is necessary for compliance with a legal obligation to which the Owner is subject;`}</Text>
//             </View>
//             <View style={styles.subParagraphView}>
//               <Text>{'\u2022'}</Text>
//               <Text
//                 style={
//                   styles.subParagrapg
//                 }>{`processing is related to a task that is carried out in the public interest or in the exercise of official authority vested in the Owner;`}</Text>
//             </View>
//             <View style={styles.subParagraphView}>
//               <Text>{'\u2022'}</Text>
//               <Text
//                 style={
//                   styles.subParagrapg
//                 }>{`processing is necessary for the purposes of the legitimate interests pursued by the Owner or by a third party.`}</Text>
//             </View>
//             <Text
//               style={
//                 styles.paragrapg
//               }>{`In any case, the Owner will gladly help to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Data is a statutory or contractual requirement, or a requirement necessary to enter into a contract.\n`}</Text>
//           </View>
//           <Text style={styles.subHeader}>Place</Text>
//           <Text
//             style={
//               styles.paragrapg
//             }>{`The Data is processed at the Owner's operating locations and in any other places where the parties involved in the processing are located. \n Depending on the User's location, data transfers may involve transferring the User's Data to a country other than their own. To find out more about the place of processing of such transferred Data, Users can check the section containing details about the processing of Personal Data. \n Users are also entitled to learn about the legal basis of Data transfers to a country outside the European Union or to any international organization governed by public international law or set up by two or more countries, such as the UN, and about the security measures taken by the Owner to safeguard their Data.
// \n If any such transfer takes place, Users can find out more by checking the relevant sections of this document or inquire with the Owner using the information provided in the contact section.
// `}</Text>
//           <Text style={styles.subHeader}>Retention time</Text>
//           <Text
//             style={
//               styles.paragrapg
//             }>{`Personal Data shall be processed and stored for as long as required by the purpose they have been collected for.`}</Text>
//           <Text style={styles.paragrapg}>{`Therefore:`}</Text>
//           <View style={styles.subParagraphView}>
//             <Text>{'\u2022'}</Text>
//             <Text
//               style={
//                 styles.subParagrapg
//               }>{`Personal Data collected for purposes related to the performance of a contract between the Owner and the User shall be retained until such contract has been fully performed.`}</Text>
//           </View>
//           <View style={styles.subParagraphView}>
//             <Text>{'\u2022'}</Text>
//             <Text
//               style={
//                 styles.subParagrapg
//               }>{`Personal Data collected for the purposes of the Owner’s legitimate interests shall be retained as long as needed to fulfill such purposes. Users may find specific information regarding the legitimate interests pursued by the Owner within the relevant sections of this document or by contacting the Owner.`}</Text>
//           </View>
//           <Text
//             style={
//               styles.paragrapg
//             }>{`The Owner may be allowed to retain Personal Data for a longer period whenever the User has given consent to such processing, as long as such consent is not withdrawn. Furthermore, the Owner may be obliged to retain Personal Data for a longer period whenever required to do so for the performance of a legal obligation or upon order of an authority.\n \n Once the retention period expires, Personal Data shall be deleted. Therefore, the right to access, the right to erasure, the right to rectification and the right to data portability cannot be enforced after expiration of the retention period.\n`}</Text>
//           <Text style={styles.header}>The purposes of processing</Text>
//           <Text
//             style={
//               styles.paragrapg
//             }>{`The Data concerning the User is collected to allow the Owner to provide its Services, as well as for the following purposes: Advertising, Content performance and features testing (A/B testing), Infrastructure monitoring, Registration and authentication, Analytics and Contacting the User.\n Users can find further detailed information about such purposes of processing and about the specific Personal Data used for each purpose in the respective sections of this document.\n`}</Text>
//           <Text style={styles.header}>
//             Detailed information on the processing of Personal Data
//           </Text>
//           <Text
//             style={
//               styles.paragrapg
//             }>{`Personal Data is collected for the following purposes and using the following services:\n`}</Text>
//           <Text style={styles.header}>The rights of Users</Text>
//           <Text
//             style={
//               styles.paragrapg
//             }>{`Users may exercise certain rights regarding their Data processed by the Owner. \n \nIn particular, Users have the right to do the following:`}</Text>
//           <View style={styles.subParagraphView}>
//             <Text>{'\u2022'}</Text>
//             <Text
//               style={
//                 styles.subParagrapg
//               }>{`Withdraw their consent at any time. Users have the right to withdraw consent where they have previously given their consent to the processing of their Personal Data.`}</Text>
//           </View>
//           <View style={styles.subParagraphView}>
//             <Text>{'\u2022'}</Text>
//             <Text
//               style={
//                 styles.subParagrapg
//               }>{`Object to processing of their Data. Users have the right to object to the processing of their Data if the processing is carried out on a legal basis other than consent. Further details are provided in the dedicated section below.`}</Text>
//           </View>
//           <View style={styles.subParagraphView}>
//             <Text>{'\u2022'}</Text>
//             <Text
//               style={
//                 styles.subParagrapg
//               }>{`Access their Data. Users have the right to learn if Data is being processed by the Owner, obtain disclosure regarding certain aspects of the processing and obtain a copy of the Data undergoing processing.`}</Text>
//           </View>
//           <View style={styles.subParagraphView}>
//             <Text>{'\u2022'}</Text>
//             <Text
//               style={
//                 styles.subParagrapg
//               }>{`Verify and seek rectification. Users have the right to verify the accuracy of their Data and ask for it to be updated or corrected.`}</Text>
//           </View>
//           <View style={styles.subParagraphView}>
//             <Text>{'\u2022'}</Text>
//             <Text
//               style={
//                 styles.subParagrapg
//               }>{`Restrict the processing of their Data. Users have the right, under certain circumstances, to restrict the processing of their Data. In this case, the Owner will not process their Data for any purpose other than storing it.`}</Text>
//           </View>
//           <View style={styles.subParagraphView}>
//             <Text>{'\u2022'}</Text>
//             <Text
//               style={
//                 styles.subParagrapg
//               }>{`Have their Personal Data deleted or otherwise removed. Users have the right, under certain circumstances, to obtain the erasure of their Data from the Owner.`}</Text>
//           </View>
//           <View style={styles.subParagraphView}>
//             <Text>{'\u2022'}</Text>
//             <Text
//               style={
//                 styles.subParagrapg
//               }>{`Receive their Data and have it transferred to another controller. Users have the right to receive their Data in a structured, commonly used and machine readable format and, if technically feasible, to have it transmitted to another controller without any hindrance. This provision is applicable provided that the Data is processed by automated means and that the processing is based on the User's consent, on a contract which the User is part of or on pre-contractual obligations thereof.`}</Text>
//           </View>
//           <View style={styles.subParagraphView}>
//             <Text>{'\u2022'}</Text>
//             <Text
//               style={
//                 styles.subParagrapg
//               }>{`Lodge a complaint. Users have the right to bring a claim before their competent data protection authority.\n`}</Text>
//           </View>
//           <Text
//             style={
//               styles.subHeader
//             }>{`Details about the right to object to processing`}</Text>
//           <Text
//             style={
//               styles.paragrapg
//             }>{`Where Personal Data is processed for a public interest, in the exercise of an official authority vested in the Owner or for the purposes of the legitimate interests pursued by the Owner, Users may object to such processing by providing a ground related to their particular situation to justify the objection. \n \n Users must know that, however, should their Personal Data be processed for direct marketing purposes, they can object to that processing at any time without providing any justification. To learn, whether the Owner is processing Personal Data for direct marketing purposes, Users may refer to the relevant sections of this document. \n`}</Text>
//           <Text style={styles.subHeader}>{`How to exercise these rights`}</Text>
//           <Text
//             style={
//               styles.paragrapg
//             }>{`Any requests to exercise User rights can be directed to the Owner through the contact details provided in this document. These requests can be exercised free of charge and will be addressed by the Owner as early as possible and always within one month.\n`}</Text>
//           <Text style={styles.header}>
//             {`Additional information about Data collection and processing`}
//           </Text>
//           <Text style={styles.subHeader}>{`Legal action`}</Text>
//           <Text
//             style={
//               styles.paragrapg
//             }>{`The User's Personal Data may be used for legal purposes by the Owner in Court or in the stages leading to possible legal action arising from improper use of this Application or the related Services.
// The User declares to be aware that the Owner may be required to reveal personal data upon request of public authorities.\n`}</Text>
//           <Text
//             style={
//               styles.subHeader
//             }>{`Additional information about User's Personal Data`}</Text>
//           <Text
//             style={
//               styles.paragrapg
//             }>{`In addition to the information contained in this privacy policy, this Application may provide the User with additional and contextual information concerning particular Services or the collection and processing of Personal Data upon request.\n`}</Text>
//           <Text style={styles.subHeader}>{`System logs and maintenance`}</Text>
//           <Text
//             style={
//               styles.paragrapg
//             }>{`For operation and maintenance purposes, this Application and any third-party services may collect files that record interaction with this Application (System logs) use other Personal Data (such as the IP Address) for this purpose.\n`}</Text>
//           <Text
//             style={
//               styles.subHeader
//             }>{`Information not contained in this policy`}</Text>
//           <Text
//             style={
//               styles.paragrapg
//             }>{`More details concerning the collection or processing of Personal Data may be requested from the Owner at any time. Please see the contact information at the beginning of this document.\n`}</Text>
//           <Text
//             style={
//               styles.subHeader
//             }>{`How “Do Not Track” requests are handled`}</Text>
//           <Text
//             style={
//               styles.paragrapg
//             }>{`This Application does not support “Do Not Track” requests.
// To determine whether any of the third-party services it uses honor the “Do Not Track” requests, please read their privacy policies.\n`}</Text>
//           <Text
//             style={styles.subHeader}>{`Changes to this privacy policy`}</Text>
//           <Text
//             style={
//               styles.paragrapg
//             }>{`The Owner reserves the right to make changes to this privacy policy at any time by giving notice to its Users on this page and possibly within this Application and/or - as far as technically and legally feasible - sending a notice to Users via any contact information available to the Owner. It is strongly recommended to check this page often, referring to the date of the last modification listed at the bottom. 
// \n Should the changes affect processing activities performed on the basis of the User’s consent, the Owner shall collect new consent from the User, where required.`}</Text>
//         </ScrollView>
//       </View>
//     </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.aliceBlue,
    paddingHorizontal: wp(5),
  },
  secContainer: {
    backgroundColor: Colors.aliceBlue,
  },
  header: {
    ...Style.getTextStyle(19, 'Bold', Colors.accent),
    paddingHorizontal: wp(5),
  },
  subHeader: {
    ...Style.getTextStyle(17, 'SemiBold', Colors.accent),
    paddingHorizontal: wp(5),
  },
  paragrapg: {
    ...Style.getTextStyle(15, 'Regular', Colors.accent),
    paddingHorizontal: wp(5),
  },
  subParagrapg: {
    ...Style.getTextStyle(15, 'Regular', Colors.accent),
    paddingLeft: wp(3),
    paddingHorizontal: wp(5),
  },
  subParagraphView: {
    flexDirection: 'row',
    paddingHorizontal: wp(5),
  },
});
