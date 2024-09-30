import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Style from '../../../constants/Style';
import { WebView } from 'react-native-webview';

const TermAndConditionsScreen = () => {
  return (
    // <SafeAreaView style={styles.container}>
       <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'https://speedyfaxapp.com/Terms.pdf' }}
        style={{ flex: 1 }}
      />
    </View>
      /* <View style={styles.secContainer}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View>
            <Text style={styles.subHeader}>Last Updated: October 02, 2023</Text>
            <Text style={styles.subHeader}>
              Important Subscription Information
            </Text>
            <View style={styles.subParagraphView}>
              <Text>{'\u2022'}</Text>
              <Text
                style={
                  styles.subParagrapg
                }>{`The current subscription pricing and free trial period is displayed in the app.`}</Text>
            </View>
            <View style={styles.subParagraphView}>
              <Text>{'\u2022'}</Text>
              <Text
                style={
                  styles.subParagrapg
                }>{`Payment will be charged to iTunes Account at confirmation of purchase`}</Text>
            </View>
            <View style={styles.subParagraphView}>
              <Text>{'\u2022'}</Text>
              <Text
                style={
                  styles.subParagrapg
                }>{`Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period`}</Text>
            </View>
            <View style={styles.subParagraphView}>
              <Text>{'\u2022'}</Text>
              <Text
                style={
                  styles.subParagrapg
                }>{`Account will be charged for renewal within 24-hours prior to the end of the current period, and identify the cost of the renewal`}</Text>
            </View>
            <View style={styles.subParagraphView}>
              <Text>{'\u2022'}</Text>
              <Text
                style={
                  styles.subParagrapg
                }>{`Subscriptions may be managed by the user and auto-renewal may be turned off by going to the user's Account Settings after purchase`}</Text>
            </View>
            <View style={styles.subParagraphView}>
              <Text>{'\u2022'}</Text>
              <Text
                style={
                  styles.subParagrapg
                }>{`Refunds will not be provided for any unused portion of the term.\n`}</Text>
            </View>
            <Text
              style={
                styles.paragrapg
              }>{`These terms of service ("Terms") apply to your access and use of this app (the "Service"). Please read them carefully.\n`}</Text>
            <Text style={styles.header}>Accepting these Terms</Text>
            <Text style={styles.paragrapg}>
              {`If you access or use the Service, it means you agree to be bound by all of the terms below. So, before you use the Service, please read all of the terms. If you don't agree to all of the terms below, please do not use the Service. Also, if a term does not make sense to you, please let us know by e-mailing speedyfaxapp@gmail.com.\n`}
            </Text>
            <Text style={styles.header}>Changes to these Terms</Text>
            <Text style={styles.paragrapg}>
              {`We reserve the right to modify these Terms at any time. For instance, we may need to change these Terms if we come out with a new feature or for some other reason.\n\n Whenever we make changes to these Terms, the changes are effective immediately after we post such revised Terms (indicated by revising the date at the top of these Terms) or upon your acceptance if we provide a mechanism for your immediate acceptance of the revised Terms (such as a click-through confirmation or acceptance button). It is your responsibility to check the app for changes to these Terms.\n\nIf you continue to use the Service after the revised Terms go into effect, then you have accepted the changes to these Terms.\n`}
            </Text>
            <Text style={styles.header}>Third-Party Services</Text>
            <Text
              style={
                styles.paragrapg
              }>{`From time to time, we may provide you with links to third party websites or services that we do not own or control. Your use of the Service may also include the use of applications that are developed or owned by a third party. Your use of such third party applications, websites, and services is governed by that party's own terms of service or privacy policies. We encourage you to read the terms and conditions and privacy policy of any third party application, website or service that you visit or use.\n`}</Text>
            <Text style={styles.header}>Creating Accounts</Text>
            <Text
              style={
                styles.paragrapg
              }>{`When you create an account or use another service to log in to the Service, you agree to maintain the security of your password and accept all risks of unauthorized access to any data or other information you provide to the Service.\n`}</Text>
            <Text style={styles.header}>Your Content & Conduct</Text>
            <Text
              style={
                styles.paragrapg
              }>{`Our Service allows you and other users to post, link and otherwise make available content. You are responsible for the content that you make available to the Service, including its legality, reliability, and appropriateness.\n\nWhen you post, link or otherwise make available content to the Service, you grant us the right and license to use, reproduce, modify, publicly perform, publicly display and distribute your content on or through the Service. We may format your content for display throughout the Service, but we will not edit or revise the substance of your content itself.\n\nAside from our limited right to your content, you retain all of your rights to the content you post, link and otherwise make available on or through the Service.\n\nYou can remove the content that you posted by deleting it. Once you delete your content, it will not appear on the Service, but copies of your deleted content may remain in our system or backups for some period of time. We will retain web server access logs for a maximum of 30 days and then delete them.\n\nYou may not post, link and otherwise make available on or through the Service any of the following:`}</Text>
            <View style={styles.subParagraphView}>
              <Text>{'\u2022'}</Text>
              <Text
                style={
                  styles.subParagrapg
                }>{`Content that is libelous, defamatory, bigoted, fraudulent or deceptive;`}</Text>
            </View>
            <View style={styles.subParagraphView}>
              <Text>{'\u2022'}</Text>
              <Text
                style={
                  styles.subParagrapg
                }>{`Content that is illegal or unlawful, that would otherwise create liability;`}</Text>
            </View>
            <View style={styles.subParagraphView}>
              <Text>{'\u2022'}</Text>
              <Text
                style={
                  styles.subParagrapg
                }>{`Content that may infringe or violate any patent, trademark, trade secret, copyright, right of privacy, right of publicity or other intellectual or other right of any party;`}</Text>
            </View>
            <View style={styles.subParagraphView}>
              <Text>{'\u2022'}</Text>
              <Text
                style={
                  styles.subParagrapg
                }>{`Mass or repeated promotions, political campaigning or commercial messages directed at users who do not follow you (SPAM);`}</Text>
            </View>
            <View style={styles.subParagraphView}>
              <Text>{'\u2022'}</Text>
              <Text
                style={
                  styles.subParagrapg
                }>{`Private information of any third party (e.g., addresses, phone numbers, email addresses, Social Security numbers and credit card numbers); and`}</Text>
            </View>
            <View style={styles.subParagraphView}>
              <Text>{'\u2022'}</Text>
              <Text
                style={
                  styles.subParagrapg
                }>{`Viruses, corrupted data or other harmful, disruptive or destructive files or code.`}</Text>
            </View>
            <Text
              style={
                styles.paragrapg
              }>{`Also, you agree that you will not do any of the following in connection with the Service or other users:`}</Text>
            <View style={styles.subParagraphView}>
              <Text>{'\u2022'}</Text>
              <Text
                style={
                  styles.subParagrapg
                }>{`Use the Service in any manner that could interfere with, disrupt, negatively affect or inhibit other users from fully enjoying the Service or that could damage, disable, overburden or impair the functioning of the Service;`}</Text>
            </View>
            <View style={styles.subParagraphView}>
              <Text>{'\u2022'}</Text>
              <Text
                style={
                  styles.subParagrapg
                }>{`Impersonate or post on behalf of any person or entity or otherwise misrepresent your affiliation with a person or entity;`}</Text>
            </View>
            <View style={styles.subParagraphView}>
              <Text>{'\u2022'}</Text>
              <Text
                style={
                  styles.subParagrapg
                }>{`Collect any personal information about other users, or intimidate, threaten, stalk or otherwise harass other users of the Service;`}</Text>
            </View>
            <View style={styles.subParagraphView}>
              <Text>{'\u2022'}</Text>
              <Text
                style={
                  styles.subParagrapg
                }>{`Circumvent or attempt to circumvent any filtering, security measures, rate limits or other features designed to protect the Service, users of the Service, or third parties.`}</Text>
            </View>
            <Text style={styles.header}>Speedy Fax App Materials</Text>
            <Text
              style={
                styles.paragrapg
              }>{`We put a lot of effort into creating the Service including, the logo and all designs, text, graphics, pictures, information and other content (excluding your content). This property is owned by us or our licensors and it is protected by U.S. and international copyright laws. We grant you the right to use it.\n\nHowever, unless we expressly state otherwise, your rights do not include: (i) publicly performing or publicly displaying the Service; (ii) modifying or otherwise making any derivative uses of the Service or any portion thereof; (iii) using any data mining, robots or similar data gathering or extraction methods; (iv) downloading (other than page caching) of any portion of the Service or any information contained therein; (v) reverse engineering or accessing the Service in order to build a competitive product or service; or (vi) using the Service other than for its intended purposes. If you do any of this stuff, we may terminate your use of the Service.`}</Text>
            <Text style={styles.header}>
              Hyperlinks and Third Party Content
            </Text>
            <Text style={styles.paragrapg}>
              {`You may create a hyperlink to the Service. But, you may not use, frame or utilize framing techniques to enclose any of our trademarks, logos or other proprietary information without our express written consent.\n\nSpeedy Fax App makes no claim or representation regarding, and accepts no responsibility for third party websites accessible by hyperlink from the Service or websites linking to the Service. When you leave the Service, you should be aware that these Terms and our policies no longer govern.\n\nIf there is any content on the Service from you and others, we don't review, verify or authenticate it, and it may include inaccuracies or false information. We make no representations, warranties, or guarantees relating to the quality, suitability, truth, accuracy or completeness of any content contained in the Service. You acknowledge sole responsibility for and assume all risk arising from your use of or reliance on any content.\n\n`}
            </Text>
            <Text style={styles.header}>Unavoidable Legal Stuff</Text>
            <Text style={styles.paragrapg}>
              {`THE SERVICE AND ANY OTHER SERVICE AND CONTENT INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE SERVICE ARE PROVIDED TO YOU ON AN AS IS OR AS AVAILABLE BASIS WITHOUT ANY REPRESENTATIONS OR WARRANTIES OF ANY KIND. WE DISCLAIM ANY AND ALL WARRANTIES AND REPRESENTATIONS (EXPRESS OR IMPLIED, ORAL OR WRITTEN) WITH RESPECT TO THE SERVICE AND CONTENT INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE SERVICE WHETHER ALLEGED TO ARISE BY OPERATION OF LAW, BY REASON OF CUSTOM OR USAGE IN THE TRADE, BY COURSE OF DEALING OR OTHERWISE.\n\nIN NO EVENT WILL SPEEDY FAX APP BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY SPECIAL, INDIRECT, INCIDENTAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES OF ANY KIND ARISING OUT OF OR IN CONNECTION WITH THE SERVICE OR ANY OTHER SERVICE AND/OR CONTENT INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE SERVICE, REGARDLESS OF THE FORM OF ACTION, WHETHER IN CONTRACT, TORT, STRICT LIABILITY OR OTHERWISE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES OR ARE AWARE OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY FOR ALL CAUSES OF ACTION AND UNDER ALL THEORIES OF LIABILITY WILL BE LIMITED TO THE AMOUNT YOU PAID TO SPEEDY FAX APP.THIS SECTION WILL BE GIVEN FULL EFFECT EVEN IF ANY REMEDY SPECIFIED IN THIS AGREEMENT IS DEEMED TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.\n\nYou agree to defend, indemnify and hold us harmless from and against any and all costs, damages, liabilities, and expenses (including attorneys' fees, costs, penalties, interest and disbursements) we incur in relation to, arising from, or for the purpose of avoiding, any claim or demand from a third party relating to your use of the Service or the use of the Service by any person using your account, including any claim that your use of the Service violates any applicable law or regulation, or the rights of any third party, and/or your violation of these Terms.\n`}
            </Text>
            <Text style={styles.header}>Copyright Complaints</Text>
            <Text
              style={
                styles.paragrapg
              }>{`We take intellectual property rights seriously. In accordance with the Digital Millennium Copyright Act ("DMCA") and other applicable law, we have adopted a policy of terminating, in appropriate circumstances and, at our sole discretion, access to the service for users who are deemed to be repeat infringers.\n`}</Text>
            <Text style={styles.header}>Governing Law</Text>
            <Text
              style={
                styles.paragrapg
              }>{`The validity of these Terms and the rights, obligations, and relations of the parties under these Terms will be construed and determined under and in accordance with the laws of the Texas, without regard to conflicts of law principles.\n`}</Text>
            <Text style={styles.header}>Jurisdiction</Text>
            <Text
              style={
                styles.paragrapg
              }>{`You expressly agree that exclusive jurisdiction for any dispute with the Service or relating to your use of it, resides in the courts of Texas and you further agree and expressly consent to the exercise of personal jurisdiction in the courts of the Texas in connection with any such dispute including any claim involving Service. You further agree that you and Service will not commence against the other a class action, class arbitration or other representative action or proceeding.\n`}</Text>
            <Text style={styles.header}>Termination</Text>
            <Text
              style={
                styles.paragrapg
              }>{`If you breach any of these Terms, we have the right to suspend or disable your access to or use of the Service.\n`}</Text>
            <Text style={styles.header}>Entire Agreement</Text>
            <Text style={styles.paragrapg}>
              {
                'These Terms constitute the entire agreement between you and Speedy Fax App regarding the use of the Service, superseding any prior agreements between you and Speedy Fax App relating to your use of the Service.\n'
              }
            </Text>
            <Text style={styles.header}>Feedback</Text>
            <Text
              style={
                styles.paragrapg
              }>{`Please let us know what you think of the Service, these Terms and, in general, this app. When you provide us with any feedback, comments or suggestions about the Service, these Terms and, in general, this app, you irrevocably assign to us all of your right, title and interest in and to your feedback, comments and suggestions.\n`}</Text>
            <Text style={styles.header}>Questions & Contact Information</Text>
            <Text
              style={
                styles.paragrapg
              }>{`Questions or comments about the Service may be directed to us at the email address speedyfaxapp@gmail.com`}</Text>
          </View>
        </ScrollView>
      </View> */
    // </SafeAreaView>
  );
};

export default TermAndConditionsScreen;

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
