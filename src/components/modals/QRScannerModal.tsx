import React, { FC, useEffect, useMemo, useState } from "react";
import { View, Modal, TouchableOpacity, Image } from "react-native";
import { modalStyles } from "../../styles/modalStyles";
import Icon from "../global/Icon";
import CustomText from "../global/CustomText";
import { ActivityIndicator } from "react-native";
import { Camera, CodeScanner, useCameraDevice } from "react-native-vision-camera";
import Animated, { Easing, useSharedValue, useAnimatedStyle, withRepeat, withTiming } from "react-native-reanimated";
import { LinearGradient } from "react-native-linear-gradient"

interface QRScannerModalProps {
    visible: boolean;
    onClose: () => void;
};

const QRScannerModal: FC<QRScannerModalProps> = ({ visible, onClose }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [codeFound, setCodeFound] = useState<boolean>(false);
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const device = useCameraDevice("back") as any;
    const shimmerTranslateX = useSharedValue(-300);

    const shimmerStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: shimmerTranslateX?.value }]
    }));

    useEffect(() => {
        const checkPermission = async () => {
            const cameraPermission = await Camera?.requestCameraPermission();
            setHasPermission(cameraPermission === "granted");
        };
        checkPermission();
        if(visible) {
            setLoading(true);
            const timer = setTimeout(() => setLoading(false), 400);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    useEffect(() => {
        shimmerTranslateX.value = withRepeat(
            withTiming(300, { duration: 1500, easing: Easing.linear }),
            -1,
            false
        )
    }, [shimmerTranslateX]);

    const handleScan = (data: any) => {
        const [connectionData, deviceName] = data.replace("tcp://","").split("|");
        const [host, port] = connectionData?.split(":");
        // Connection to server
    };

    const codeScanner = useMemo<CodeScanner>(() => ({
        codeTypes: ["qr", "codabar"],
        onCodeScanned: (codes) => {
            if(codeFound) {
                return;
            }
            console.log(`Scanned ${codes?.length} codes`);
            if(codes?.length > 0) {
                const scannedData = codes[0].value;
                console.log(scannedData);
                setCodeFound(true);
                handleScan(scannedData);
            }
        }
    }), [codeFound]);

    return (
        <Modal animationType="slide" visible={visible} presentationStyle="formSheet" onRequestClose={onClose} onDismiss={onClose}>
            <View style={modalStyles.modalContainer}>
                <View style={modalStyles.qrContainer}>
                    {
                        loading ? (
                            <View style={modalStyles.skeleton}>
                                <Animated.View>
                                    <LinearGradient colors={["#f3f3f3", "#fff", "f3f3f3"]} start={{ x:0, y:0 }} end={{ x:1, y:0 }} style={modalStyles.shimmerGradient} />
                                </Animated.View>
                            </View>
                        ) : (
                            <>
                                {
                                    (!device || !hasPermission) ? (
                                        <View style={modalStyles.skeleton}>
                                            <Image source={require("../../assets/images/no_camera.png")} style={modalStyles.noCameraImage} />
                                        </View>
                                    ) : (
                                        <View style={modalStyles.skeleton}>
                                            <Camera style={modalStyles.camera} isActive={visible} device={device} codeScanner={codeScanner} />
                                        </View>
                                    )
                                }
                            </>
                        )
                    }
                </View>

                <View style={modalStyles.info}>
                    <CustomText style={modalStyles.infoText1}>
                        Ensure you're on the same Wi-Fi network as the device you're trying to connect.
                    </CustomText>
                    <CustomText style={modalStyles.infoText2}>
                        Ask the reciever to show QR code to connect and transfer files.
                    </CustomText>
                </View>

                <ActivityIndicator size="small" color="#000" style={{ alignSelf: "center"}} />

                <TouchableOpacity onPress={() => onClose()} style={modalStyles.closeButton}>
                    <Icon name="close" iconFamily="Ionicons" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default QRScannerModal;