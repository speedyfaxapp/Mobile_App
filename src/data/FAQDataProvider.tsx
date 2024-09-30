import FAQ from '../models/interfaces/api/FAQ';

export const FAQ_DATA: FAQ[] = [
  {
    title:
      'How could I assure that my outgoing fax will be clear and readable?',
    content:
      'Please make sure that the fonts of fax documents are clear and dark and that the background is white when creating fax. While scanning a fax, you need to properly focus on the camera so that text will be crisp. Moreover, taking a photo in a bright room without the impact of other lights will help your fax have optimal clarity.Remember, it works with only fax text documents, not photos or pictures.',
  },
  {
    title: 'How much time does it take to send a fax?',
    content: `It depends on your and recipient's line quality and the number of pages to be sent. It usually takes 2 minutes per page, not more than 15 minutes of total.`,
  },
  {
    title: 'How do I know if my fax has been delivered or not?',
    content:
      'We provided users with a real-time fax status so that you can see easily whether your fax has been sent or not and what is the fax status at that moment.',
  },
  {
    title:
      'If there was no notification, does it mean that the fax was not delivered?',
    content: `When your fax is delivered, you will get a notification from our Fax app ( please make sure that you enable the notification of our Fax app in your device settings ) and the fax status will change automatically to Delivered - only after receiving this status, you can be sure that the recipient receive your fax. If you did not receive our notification, there are two cases happen due to some reasons: \n \n Case 1: You did not allow the app to send you notification. To solve this issue, please check your device settings and allow notifications from the app, you can do this by going into Settings > Notifications > Fax and switching Allow Notifications ON \n \n Case 2: Your fax had not been delivered due to some unexpected errors. You will receive the Fax status of Failed or Busy or No Answer depending on the situation, please keep calm to check your recipient number and their line then resend the fax.`,
  },
  {
    title: 'I canceled a fax, why was I still charged for it?',
    content:
      'We start dialing as soon as you press the send fax button. At that point we have placed a phone call and there are no refunds.',
  },
  {
    title: 'I want to get my money back?',
    content: `It's very easy to get your money back from the Apple Store.\n Follow instructions here: https:// support.apple.com/HT204084/ \n Please note: it usually takes 2-3 business days to get the refund.`,
  },
  {
    title: 'My fax is still in sending, why?',
    content: `It takes time to send the fax as it's an old fashioned technology. \n It usually takes about 3~4 minutes to send one page: the more, the longer. \n Come back to review it again sometime later!`,
  },
  {
    title: 'What is a Cover Page?',
    content: `This is the first page of the fax, which provides contact information of the sender, recipient, and message if needed.`,
  },
  {
    title: 'What numbers can I send a fax to?',
    content: `You can find the list of countries where you can send a fax by clicking on the country code selection button at the left upper corner.You can send a fax only to those numbers that support the fax receiving function.`,
  },
];
