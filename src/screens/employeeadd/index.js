import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list';
import NhanVien from '../../NhanVien/NhanVien';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../NhanVien/AuthContext';

const EmployeeAdd = ({ route }) => {
    const { getDanhSachNhanVien, themNhanVien } = useContext(AuthContext);
    const navigation = useNavigation();

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [AgainPassword, setAgainPassword] = useState('');
    const [Phone, setPhone] = useState('');
    const [Email, setEmail] = useState('');
    const [Position, setPosition] = useState("");
    const [date, setDate] = useState(null);
    const [show, setShow] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isAgainPasswordVisible, setIsAgainPasswordVisible] = useState(false);

    const dataDropdown = [
        { key: '1', value: 'Cung cấp thức ăn và nước' },
        { key: '2', value: 'Kiểm tra sức khỏe động vật' },
        { key: '3', value: 'Vệ sinh và chăm sóc chuồng trại' },
        { key: '4', value: 'Tiêm phòng và điều trị y tế' },
        { key: '5', value: 'Quản lý giống và sinh sản' },
        { key: '6', value: 'Quản lý cảnh báo và an ninh' },
        { key: '7', value: 'Theo dõi môi trường' },
        { key: '8', value: 'Quản lý chất thải' },
    ];

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleAgainPasswordVisibility = () => {
        setIsAgainPasswordVisible(!isAgainPasswordVisible);
    };

    const handleDateChange = (event, selectedDate) => {
        if (event.type === 'set') {
            const currentDate = selectedDate || date;
            setDate(currentDate);
        }
        setShow(false);
    };

    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    const dangKy = async () => {
        if (!Position) {
            setPosition("");
        }
        if (Password !== AgainPassword) {
            Alert.alert(
                'Lỗi',
                'Nhập lại mật khẩu không đúng',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
            return;
        }
        const existingNhanVien = getDanhSachNhanVien().find(nv => nv.tenDangNhap === Username);
        if (existingNhanVien) {
            Alert.alert('Lỗi', 'Nhân viên đã tồn tại.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
            return;
        }
        const nhanVien = new NhanVien("", "", Username, Password, date ? formatDate(date) : '', Phone, Email, Position);
        const addedSuccessfully = themNhanVien(nhanVien);
        console.log("them thanh cong/ khong thanh cong",addedSuccessfully)
        if (addedSuccessfully) {
            Alert.alert('Thành công', 'Đã thêm nhân viên thành công.',
                [{ text: 'OK', onPress: () => navigation.navigate('EmployeeList') }]);
        }else{
            Alert.alert('Lỗi', 'Không thể thêm nhân viên.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../../assets/avartauser.png')}
                        style={styles.image}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Tên đăng nhập</Text>
                    <TextInput
                        style={styles.inputUser}
                        value={Username}
                        onChangeText={setUsername}
                    />
                    <Text style={styles.title}>Số điện thoại</Text>
                    <TextInput
                        style={styles.inputUser}
                        value={Phone}
                        onChangeText={setPhone}
                    />
                </View>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>Mật khẩu</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        style={[styles.inputUser, { flex: 1 }]}
                        value={Password}
                        onChangeText={setPassword}
                        secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Image
                            source={isPasswordVisible ? require('../../../assets/hidepass_icon.png') : require('../../../assets/showpass_icon.png')}
                            style={styles.passwordVisibilityIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>Nhập lại mật khẩu</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        style={[styles.inputUser, { flex: 1 }]}
                        value={AgainPassword}
                        onChangeText={setAgainPassword}
                        secureTextEntry={!isAgainPasswordVisible}
                    />
                    <TouchableOpacity onPress={toggleAgainPasswordVisibility}>
                        <Image
                            source={isAgainPasswordVisible ? require('../../../assets/hidepass_icon.png') : require('../../../assets/showpass_icon.png')}
                            style={styles.passwordVisibilityIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>Ngày sinh</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        style={[styles.inputUser, { flex: 1 }]}
                        value={date ? formatDate(date) : ''}
                        editable={false}
                    />
                    <TouchableOpacity onPress={() => setShow(true)}>
                        <Image source={require('../../../assets/calendar.png')} style={styles.icon} />
                        {show && (
                            <DateTimePicker
                                value={date || new Date()}
                                mode={'date'}
                                onChange={handleDateChange}
                                confirmBtnText="Confirm"
                                cancelBtnText="Dismiss"
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>Email</Text>
                <TextInput
                    style={styles.inputUser}
                    value={Email}
                    onChangeText={setEmail}
                />
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>Phân công</Text>
                <SelectList
                    setSelected={setPosition}
                    data={dataDropdown}
                    save="value"
                    dropdownStyles={{ backgroundColor: "white" }}
                    boxStyles={{ backgroundColor: "white" }}
                />
            </View>
            <View style={styles.addButtonContainer}>
                <TouchableOpacity style={styles.addButton} onPress={dangKy}>
                    <Image source={require('../../../assets/themNV.png')} style={styles.addButtonIcon} />
                    <Text style={styles.addButtonLabel}>Thêm nhân viên</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF9ED',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        padding: 10,
        margin: 15,
    },
    imageContainer: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        paddingTop: 10,
    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 5,
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    inputUser: {
        height: 40,
        fontSize: 16,
        backgroundColor: "#fff",
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    bodyContainer: {
        paddingHorizontal: 22,
        paddingBottom: 20,
    },
    icon: {
        width: 40,
        height: 40,
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 20, // Khoảng cách từ dưới cùng của màn hình
        width: '100%',
        alignItems: 'center',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E5EEDF',
        borderWidth: 0.3,
        borderColor: '#000000',
        borderRadius: 3,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    addButtonIcon: {
        width: 15,
        height: 15,
        marginRight: 5,
    },
    addButtonLabel: {
        fontFamily: 'Rubik',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 15,
        textAlign: 'center',
        color: '#042710',
    },
    passwordVisibilityIcon: {
        width: 40,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
});

export default EmployeeAdd;
