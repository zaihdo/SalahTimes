import React from 'react';
import { Text, Linking } from 'react-native';
import fonts from '../../constants/Fonts';

export const appContent = {
  about: [
    {
      icon: require('../icons/mosque.svg'),
      title: "Who We Are",
      content: "Salah Times Botswana aims to provide all Muslims in Botswana with accurate prayer times across all towns, villages, and cities."
    },
    {
      icon: require('../icons/mission.svg'),
      title: "Our Mission", 
      content: "To deliver accurate prayer and Iqamah times for all mosques in Botswana, accessible fully offline without the need for an internet connection."
    },
    {
      icon: require('../icons/data-source.svg'),
      title: "Data Source",
      content: (
        <Text style={{ textAlign: 'justify' }}>
          All times have been sourced from the BMA database created by Mr. Mirza Zawahir and may differ if a Masjid uses an updated calculation method for their Adhaan times or their own convenient times for Iqamah.{'\n\n'}
          If any changes need to be made to the Adhān time (which is unlikely) or the Iqāmah time, or if any new Masājids or Jamā'at khānas need to be added to this App, please contact Imran Salahuddin at{' '}
          <Text
            onPress={() => Linking.openURL('tel:71711911')}
            style={{ color: '#0099ff' }}
          >
            71 711 911
          </Text>
        </Text>
      )
    }
  ],
  contact: [
    {
      title: "Developer",
      content: (
        <Text style={{ textAlign: 'justify' }}>
          For support, feedback, suggestions, or inquiries about the app, please reach out to Imran Salahuddin at{' '}
          <Text
            onPress={() => Linking.openURL('tel:71711911')}
            style={{ color: '#0099ff' }}
          >
            71711911
          </Text>
          {' '}or email us at{' '}
          <Text
            onPress={() => Linking.openURL('mailto:zaidhimran2000@gmail.com')}
            style={{ color: '#0099ff'}}
          >
            zaidhimran2000@gmail.com
          </Text>
        </Text>
      )
    },
  ],
  privacy: [
    {
        title: "Privacy and Security",
        content: "Your privacy is our priority. Salah Times Botswana is designed as a fully offline application that respects your personal space and requires no internet connection or user accounts to function."
    },
    {
        title: "Data Collection",
        content: "We collect zero personal data. No location tracking, no usage analytics, no contact information, and no behavioral data. Your prayer time preferences are stored locally on your device only."
    },
    {
        title: "Data Storage",
        content: "We do not store any user data or information on our servers or in our app. Our app is a self-contained, offline application that does not have the ability to store or retain any user data."
    },
    {
        title: "Data Processing",
        content: "We do not process any user data or information. Our app is designed to provide prayer times and other relevant information based on pre-loaded data, and we do not use any user data or input to generate this information."
    },
    {
        title: "User Data Protection",
        content: "Since we do not collect, store, or process any user data, we do not have any user data to protect. Our app is designed to be a secure and private way for users to access prayer times and other relevant information."
    },
    {
        title: "Changes to this Policy",
        content: "We may update this privacy policy from time to time to reflect changes in our app or our practices. However, since we do not collect, store, or process any user data, we do not anticipate making any significant changes to this policy."
    },
    {
        title: "Contact Us",
        content: (
          <Text>
            If you have any questions or concerns about this privacy policy, please contact us at{' '}
            <Text
              onPress={() => Linking.openURL('mailto:zaidhimran2000@gmail.com')}
              style={{ color: '#0099ff' }}
            >
              zaidhimran2000@gmail.com
            </Text>
            .
          </Text>
        )
    },
    {
        title: "Acknowledgement",
        content: "By using our app, you acknowledge that you have read and understood this privacy policy, and you agree to our practices regarding the collection, storage, and processing of user data."
    },
    {
        title: "Effective Date",
        content: "This privacy policy is effective as of 22 June 2025 and may be updated from time to time."
    }
    ]
};