import React, { useState } from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {EntryExitTransition} from 'react-native-reanimated';

const SubscriptionPlanPage = () => {

    const [selected,setSelected] = useState('Free');
  return (
    <View>
      <Image
        source={require('../../../assets/images/banner-bg.png')}
        style={{width: '106%', height: 265, marginTop: -30}}
      />
      <View style={{zIndex: 999}}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: '600',
            textAlign: 'center',
            marginTop: 10,
          }}>
          Full Access
        </Text>
        <View style={{paddingHorizontal: 30}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
              gap: 15,
            }}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../../assets/images/ban.png')}
            />
            <Text style={{fontSize: 19}}>Ad Free</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
              gap: 15,
            }}>
            <Image
              style={{width: 18, height: 18}}
              source={require('../../../assets/images/reverse.png')}
            />
            <Text style={{fontSize: 19, width: 160}}>
              Sync Faxes Across Multiple Devices
            </Text>
            <View
              style={{
                backgroundColor: '#BA0021',
                paddingHorizontal: 7,
                paddingVertical: 3,
                borderRadius: 5,
              }}>
              <Text style={{fontSize: 14, fontWeight: '700', color: 'white'}}>
                NEW
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
              gap: 15,
            }}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../../assets/images/notifications.png')}
            />
            <Text style={{fontSize: 19}}>Delivery Notifications</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
              gap: 15,
            }}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../../assets/images/lock.png')}
            />
            <Text style={{fontSize: 19, width: 300}}>
              Secure delivery with high-grade SSL encryption
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setSelected('Free')}
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderWidth: 2,
            borderColor: selected === 'Free' ? '#9155FD' : '#c0c0c0',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 20,
          }}>
          <Text style={{fontSize: 22}}>3 Days Full Access</Text>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '500',
              marginTop: 5,
              color: '#9155FD',
            }}>
            Free
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelected('Paid')}
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderWidth: 2,
            borderColor: selected === 'Paid' ? '#696969' : '#c0c0c0',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontSize: 22, fontWeight: '500'}}>
              Monthly Access
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                marginTop: 5,
                color: '#000',
              }}>
              $ 2.99
            </Text>
          </View>
          <LinearGradient
            colors={['#4c8d7e', '#469382', '#1c4b40']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{
              padding: 10,
              alignItems: 'center',
              borderRadius: 5,
              elevation: 2,
            }}>
            <Text style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>
              Save 94%
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        {selected === 'Free' ? (
          <TouchableOpacity
            style={{
              backgroundColor: '#9155FD',
              marginTop: 30,
              padding: 10,
              alignItems: 'center',
              width: '85%',
              alignSelf: 'center',
              borderRadius: 15,
            }}>
            <Text style={{color: 'white', fontSize: 24, fontWeight: '600'}}>
              Continue
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                marginTop: 5,
                fontWeight: '600',
              }}>
              3 Days Full Access - Free
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: '#03002e',
              marginTop: 30,
              padding: 20,
              alignItems: 'center',
              width: '85%',
              alignSelf: 'center',
              borderRadius: 15,
            }}>
            <Text style={{color: 'white', fontSize: 26, fontWeight: '600'}}>
              Continue
            </Text>
          </TouchableOpacity>
        )}
        <Text
          style={{
            textAlign: 'center',
            marginTop: 15,
            fontSize: 15,
            color: '#696969',
          }}>
            {selected==='Paid' ? 'Only $35.99/per year' : 'Then $11.99/per week, auto-renewable, Cancel anytime' }
           {'\n'}
          <Text
            style={{
              fontSize: 16,
              textDecorationLine: 'underline',
              fontWeight: '500',
            }}>
            Privacy policy Terms of services{' '}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SubscriptionPlanPage;
