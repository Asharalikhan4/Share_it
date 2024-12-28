import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { navigate } from "../utils/NavigationUtil";

const SplashScreen = () => {

    const navigateToHome = () => {
        navigate("HomeScreen");
    };

    useEffect(() => {
        const timeoutId = setTimeout(navigateToHome, 1200);
        return () => clearTimeout(timeoutId);
    });

    return (
        <View style={commonStyles.container}>
            <Image style={commonStyles.img} source={require("../assets/images/logo_text.png")} />
        </View>
    );
};

export default SplashScreen;