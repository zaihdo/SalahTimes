import React from "react";
import { Text } from "react-native";
import { Linking } from 'react-native';
import fonts from "@/constants/Fonts";

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
        <Text style={{ textAlign: 'justify' }}>
          As-salamu alaykum wa rahmatullahi wa barakatuh,
          {'\n\n'}
          Due to many requests, we have decided to reproduce the original Botswana Prayer Times app and extend it to iOS too. I pray the app serves you well in being able to perform your daily salaah on time (with jamaat).
          {'\n\n'}
          If you have any feedback or suggestions, please don't hesitate to reach out.
          {'\n\n'}
          May Allah accept our prayers and good deeds.
          {'\n\n'}
          Jazak Allah Khair.
          {'\n\n'}
          Yours in Islam,
          {'\n\n'}
          <Text style={{ fontWeight: 'bold' }}>Zaidh Imran Salahuddin</Text>
        </Text>,
      ],
      contentNested: [],
      type: 'regular',
    },
    {
      title: '🕊️ About SalahTimes',
      content: [
        React.createElement(Text, { key: 'about', style: [fonts.text, { textAlign: 'justify' }], children: 'SalahTimesBotswana aims to provide muslims in Botswana with accurate prayer times in all towns, villages and cities as well as Iqamah times in all the masaajid. \n\nAll times have been sourced from the BMA database created by Mirza Zawahir and may differ only if a particular masjid has an updated method of calculation.'}),  
      ],
      contentNested: [],
      type: 'regular',
    },
    {
      title: '📈 Features',
      content: [
        <Text style={{ textAlign: 'justify' }}>
          {'• Accurate prayer times for each location in Botswana\n\n'}
          {'• Iqamah times for each masjid in Botswana\n\n'}
          {'• Clean and intuitive interface\n\n'}
          {'• Dark mode support\n\n'}
          {'• Works offline\n\n'}
          {'• Ad-free'}
        </Text>,
      ],
      contentNested: [],
      type: 'regular',
    },
    {
      title: '📚 How to Use',
      content: [
        <Text style={{ textAlign: 'justify' }}>
          {'1. Simply select City or Masjid from the bottom navigation tab\n\n'}
          {'2. Select your location or masjid you plan to pray at\n\n'}
          {'3. View the prayer or iqamah times for the current day\n\n'}
          {'4. Make dua for the development team and their families'}
        </Text>,
      ],
      contentNested: [],
      type: 'regular',
    },
    {
      title: '🔒 Privacy Policy',
     content: [
       <Text style={{ textAlign: 'justify' }}>
         <Text>
           <Text style={{ fontWeight: 'bold' }}>User data: </Text>SalahTimesBotswana, does not currently collect or store any user data.
         </Text>
         <Text>
           {'\n\n'}
           <Text style={{ fontWeight: 'bold' }}>Location data:</Text> Unlike most traditional apps, we do not request your location data. Instead, prayer times for all locations are provided. In future, we may enable the ability to request location data based on user preferences, with the ability to opt-out.
         </Text>
       </Text>
     ],
      contentNested: [],
      type: 'regular',
    },
   {
     title: '📞 Contact',
     content: [
       <Text style={{ textAlign: 'justify' }}>
         Get in touch @
         {'\n\n'}
         <Text
           key="email"
           onPress={() => Linking.openURL('mailto:zaidhimran2000@gmail.com')}
         >
           <Text style={[fonts.title, { color: "#0099ff" }]}>zaidhimran2000@gmail.com</Text>
         </Text>
         {'\n\n'}
         <Text
           key="other"
           onPress={() => Linking.openURL('https://www.zaidh.link')}
         >
           <Text style={[fonts.title, { color: "#0099ff" }]}>zaidh.link</Text>
         </Text>
         {'\n\n'}
         We'd love to hear from you and get your feedback on the app!
       </Text>,
     ],
     contentNested: [],
     type: 'regular',
   },
  ];
  
  export default data;