import { Image, useColorScheme } from 'react-native'

const ThemedLogo = ({ ...props }) => {
    const colorScheme = useColorScheme()
    const DarkLogo = require('../assets/img/logo_dark.png');
    const LightLogo = require('../assets/img/logo_light.png');


    const logo = colorScheme === 'dark' ? LightLogo : DarkLogo
    return (
        <Image source={logo} {...props} />
    )
}

export default ThemedLogo
