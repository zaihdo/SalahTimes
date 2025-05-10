import React from "react";
import { Text } from "react-native";
import { Linking } from 'react-native';

export type Category = {
    title: string;
    content: React.ReactNode[];
    contentNested: NestedItem[];
    type: string;
  };
  
  export type NestedItem = {
    title: string;
    content: string[];
  };
  
  export type Data = Category[];
  
  const data: Data = [
    {
      title: '🙏 Note from the Developer',
      content: [
        'As-salamu alaykum (Peace be upon you),',
        'I am Zaidh Imran Salahuddin, the creator of SalahTimesBotswana. I am a passionate developer and a Muslim who wanted to create an app that would make it easier for Muslims to keep track of their daily prayers.',
        'I hope that this app will be a beneficial tool in your spiritual journey and that it will help you to stay connected to your faith.',
        'If you have any suggestions, feedback, or encounter any issues, please don\'t hesitate to reach out to me.',
        'May Allah accept our prayers and good deeds.',
        'Jazak Allah Khair (May Allah reward you with goodness).',
        'Yours in Islam,',
        'Zaidh Imran Salahuddin'
      ],
      contentNested: [],
      type: 'regular',
    },
    {
      title: '🕊️ About SalahTimes',
      content: [
        'SalahTimesBotswana aims to provide muslims in Botswana with accurate prayer times in all towns, villages and cities as well as Iqamah times in all the masaajid. \n\nAll times have been sourced from the BMA database created by Mirza Zawahir and may differ only if a particular masjid has an updated method of calculation.',  
      
      ],
      contentNested: [],
      type: 'regular',
    },
    {
      title: '📈 Features',
      content: [
        '• Accurate prayer times for each location in Botswana',
        '• Iqamah times for each masjid in Botswana',
        '• Clean and intuitive interface',
        '• Dark mode support',
        '• Works offline',
        '• Ad-free'
      ],
      contentNested: [],
      type: 'regular',
    },
    {
      title: '📚 How to Use',
      content: [
        '1. Simply select City or Masjid from the bottom navigation tab',
        '2. Select your location or masjid you plan to pray at',
        '3. View the prayer or iqamah times for the current day',
        '4. Make dua for the development team and their families',
      ],
      contentNested: [],
      type: 'regular',
    },
    {
      title: '🔒 Privacy Policy',
     content: [
       'At SalahTimesBotswana, currently no user data is collected or stored.',
       <Text>
         <Text style={{ fontWeight: 'bold' }}>Location data:</Text> Unlike most traditional apps, we do not request your location data as checking the times for each location is opted for. In future, we may enable the ability to request location data based on user preferences, with the ability to opt-out.
       </Text>,
     ],
      contentNested: [],
      type: 'regular',
    },
    {
      title: '📞 Contact',
      content: [
        'Get in touch with me:',
        React.createElement(Text, {
          onPress: () => Linking.openURL('mailto:zaidhimran2000@gmail.com'),
          children: 'Email: zaidhimran2000@gmail.com'
        }),
        React.createElement(Text, {
          onPress: () => Linking.openURL('https://www.zaidh.link'),
          children: 'LinkedIn: zaidh.link'
        }),
        'I\'d love to hear from you and get your feedback on the app!',
      ],
      contentNested: [],
      type: 'regular',
    },
  ];
  
  export default data;