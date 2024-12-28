import React, { FC, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { bottomTabStyles } from "../../styles/bottomTabStyle";
import Icon from "../global/Icon";
import { navigate } from "../../utils/NavigationUtil";

const AbsoluteQRBottom: FC = () => {

    const [visible, setVisible] = useState<boolean>(false);

    return (
        <View style={bottomTabStyles.container}>
            <TouchableOpacity onPress={() => navigate("ReceivedFileScreen")}>
                <Icon name="apps-sharp" iconFamily="Ionicons" color="#333" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={bottomTabStyles.qrCode} onPress={() => setVisible(true)}>
                <Icon name="qrcode-scan" iconFamily="MaterialCommunityIcons" color="#fff" size={26} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name="beer-sharp" iconFamily="Ionicons" color="#333" size={24} />
            </TouchableOpacity>
        </View>
    );
};

export default AbsoluteQRBottom;