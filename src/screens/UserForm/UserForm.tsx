import { Text, View, StyleSheet } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { useState } from 'react';
import { useCreateUserMutation } from '../../store/api/usersApi'
import { useToast } from 'react-native-toast-notifications'

export const UserForm = (props) => {
    const { navigation } = props
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [createUser] = useCreateUserMutation()
    const toast = useToast()



    const handleSubmit = () => {
        console.log('firstName: ', firstName)
        console.log('lastName: ', lastName)

        if (firstName === '' || lastName === '') {
            console.log('Invalid input in form')
            toast.show('All inputs need to be filled', {
                type: 'warning',
                placement: 'top',
                duration: 4000,
                animationType: 'slide-in',
            })
            return
        }

        createUser({
         user: {
            firstName: firstName,
            lastName: lastName
         }
        }).then(() => {
            navigation.navigate('User List')
            toast.show(`User ${firstName} ${lastName} has been created`, {
            type: 'success',
            placement: 'top',
            duration: 4000,
            animationType: 'slide-in',
        })
        setFirstName('')
        setLastName('')
        }).catch((err) => {
            toast.show(err, { type: 'danger' })
        })

    }

    return (
        <View style={styles.parentContainer}>
            <View style={styles.container}>
                <Text>Create your user</Text>
                <Input value={firstName} onChangeText={(text => setFirstName(text))} placeholder="First Name" />
                <Input value={lastName} onChangeText={(text => setLastName(text))}placeholder="Last Name" />
                <Button title='Create User' onPress={() => handleSubmit()}></Button>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        backgroundColor: 'white',
        margin: 36,
        borderColor: '#eee',
        borderWidth: 1,
        borderRadius: 16
    },
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center'
    }
})
