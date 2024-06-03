import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../../NhanVien/AuthContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const EmployeeList = () => {
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();
    const { getDanhSachNhanVien } = useContext(AuthContext);
    const [nhanViens, setNhanViens] = useState([]);
    const ip ="192.168.24.1";
    const getAPI = async (search = '') => {
        try {
            const response = await fetch(`http://${ip}/API_QuanLyNongTrai/APINhanVien/getData.php?search=${search}`);
            const data = await response.json();
            return data;
        } catch (err) {
            console.error(err);
            return [];
        }
    };

    const fetchData = async (text = '') => {
        try {
            const danhSachNhanVien = await getAPI(text);
            setNhanViens(danhSachNhanVien);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch employee data');
        }
    };
    useFocusEffect(
        React.useCallback(() => {
            fetchData(searchText);
        }, [searchText])
    );

    useEffect(() => {
        fetchData(searchText);
    }, [searchText]);


    const handleItemPress = async (tenDangNhap) => {
        try {
            const danhSachNhanVien = await getDanhSachNhanVien();
            const nhanVien = danhSachNhanVien.find(nv => nv.tenDangNhap === tenDangNhap);
            if (nhanVien) {
                navigation.navigate('EmployeeEdit', { employee: nhanVien });
            } else {
                Alert.alert('Error', 'Employee not found');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch employee details');
        }
    };

    const EmployeeItem = ({ tenDangNhap, email, sdt, viTriCongViec }) => (
        <TouchableOpacity onPress={() => handleItemPress(tenDangNhap)}>
            <View style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require('../../../assets/avartauser.png')} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{tenDangNhap}</Text>
                    <Text style={styles.department}>{email}</Text>
                    <Text style={styles.birthdate}>{sdt}</Text>
                    <Text style={styles.position}>{viTriCongViec}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const themNv = () => {
        navigation.navigate('EmployeeAdd');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Danh sách nhân viên</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm..."
value={searchText}
                onChangeText={setSearchText}
            />
            <FlatList
                data={nhanViens}
                renderItem={({ item }) => (
                    <EmployeeItem
                        tenDangNhap={item.tenDangNhap}
                        email={item.email}
                        sdt={item.sdt}
                        viTriCongViec={item.viTriCongViec}
                    />
                )}
                keyExtractor={(item) => item.tenDangNhap}
            />
            <View style={styles.addButtonContainer}>
                <TouchableOpacity style={styles.addButton} onPress={themNv}>
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
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 15,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        marginHorizontal: 15,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        padding: 10,
        margin: 15,
        backgroundColor: '#D6FDE3',
    },
    imageContainer: {
        width: 78,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    image: {
        width: 78,
        height: 80,
        borderRadius: 5,
    },
    textContainer: {
        flex: 1,
        paddingLeft: 25,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    department: {
        fontSize: 14,
    },
    birthdate: {
        fontSize: 14,
    },
    position: {
        fontSize: 14,
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: "space-between",
        padding: 20,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
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
});

export default EmployeeList;