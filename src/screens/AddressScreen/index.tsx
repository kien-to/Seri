import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import countryList from 'country-list';
import Button from '../../components/Button';
import styles from './styles';

const countries = countryList.getData();

const AddressScreen = () => {
  const [country, setCountry] = useState(countries[0].code);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [city, setCity] = useState('');

  const onCheckout = () => {
    if (!!addressError) {
      Alert.alert('Field Errors need fixing before submitting');
      return;
    }
    if (!fullName) {
      Alert.alert('Please fill in the fullname field');
      return;
    }

    if (!phone) {
      Alert.alert('Please fill in the phone number field');
      return;
    }

    console.warn('Success. Checkout');
  };

  const validateAddress = () => {
    if (address.length < 3) {
      setAddressError('address is too short');
    }
  };

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
    >
        <ScrollView style={styles.root}>
        <View style={styles.row}>
            <Picker selectedValue={country} onValueChange={setCountry}>
            {countries.map(country => (
                <Picker.Item value={country.code} label={country.name} />
            ))}
            </Picker>
        </View>

        {/* Name */}
        <View style={styles.row}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            />
        </View>

        {/* Phone Number */}
        <View style={styles.row}>
            <Text style={styles.label}>Phone number</Text>
            <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType={'phone-pad'}
            />
        </View>

        {/* Addresses */}
        <View style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onEndEditing={validateAddress}
            onChangeText={text => {
                setAddress(text), setAddressError('');
            }}
            />
            {!!addressError && (
            <Text style={styles.errorLabel}>{addressError}</Text>
            )}
        </View>

        {/* City */}
        <View style={styles.row}>
            <Text style={styles.label}>City</Text>
            <TextInput
                style={styles.input}
                placeholder="City"
                value={city}
                onChangeText={setCity}
            />
        </View>

        <Button text="Checkout" onPress={onCheckout} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddressScreen;
