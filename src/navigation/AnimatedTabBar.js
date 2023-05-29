import React,{useEffect,useReducer,useRef} from 'react';
import { Pressable,
  StatusBar,
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,TouchableOpacity} from 'react-native';
  import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CustomText from '../components/custom/CustomText';
// svg
import Svg, { Path } from 'react-native-svg'
// reanimated
import Animated, { useAnimatedStyle, withTiming, useDerivedValue } from 'react-native-reanimated'
// lottie
const AnimatedSvg = Animated.createAnimatedComponent(Svg)
export const AnimatedTabBar = ({ state: { index: activeIndex, routes }, navigation, descriptors }) => {
    const { bottom } = useSafeAreaInsets();
  
    // get information about the components position on the screen -----
  
    const reducer = (state, action) => {
      // Add the new value to the state
      return [...state, { x: action.x, index: action.index }];
    };
  
    const [layout, dispatch] = useReducer(reducer, []);
  
    const handleLayout = (event, index) => {
      dispatch({ x: event.nativeEvent.layout.x, index });
    };
  
    // animations ------------------------------------------------------
  
    const xOffset = useDerivedValue(() => {
      // Our code hasn't finished rendering yet, so we can't use the layout values
      if (layout.length !== routes.length) return 0;
      // We can use the layout values
      // Copy layout to avoid errors between different threads
      // We subtract 25 so the active background is centered behind our TabBar Components
      // 20 pixels is the width of the left part of the svg (the quarter circle outwards)
      // 5 pixels come from the little gap between the active background and the circle of the TabBar Components
      return [...layout].find(({ index }) => index === activeIndex).x - 25;
      // Calculate the offset new if the activeIndex changes (e.g. when a new tab is selected)
      // or the layout changes (e.g. when the components haven't finished rendering yet)
    }, [activeIndex, layout]);
  
    const animatedStyles = useAnimatedStyle(() => {
      return {
        // translateX to the calculated offset with a smooth transition
        transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
      };
    });
  
    return (
      <View style={[styles.tabBar, { paddingBottom: bottom }]}>
        <AnimatedSvg
          width={110}
          height={60}
          viewBox="0 0 110 60"
          style={[styles.activeBackground, animatedStyles]}
        >
          <Path
            fill="#D6DCF2"
            d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
          />
        </AnimatedSvg>
  
        <View style={styles.tabBarContainer}>
          {routes.map((route, index) => {
            const active = index === activeIndex;
            const { options } = descriptors[route.key];
  
            return (
              <TabBarComponent
                key={route.key}
                active={active}
                options={options}
                onLayout={(e) => handleLayout(e, index)}
                onPress={() => navigation.navigate(route.name)}
              />
            );
          })}
        </View>
      </View>
    );
  };
  
  const TabBarComponent = ({ active, options, onLayout, onPress }) => {
    const ref = useRef(null);
  
    useEffect(() => {
      if (active && ref?.current) {
        ref.current.play();
      }
    }, [active]);
  
    const animatedComponentCircleStyles = useAnimatedStyle(() => {
      return {
        transform: [
          {
            scale: withTiming(active ? 1 : 0, { duration: 250 })
          }
        ]
      };
    });
  
    const animatedIconContainerStyles = useAnimatedStyle(() => {
      return {
        opacity: withTiming(active ? 1 : 0.5, { duration: 250 })
      };
    });
  
    return (
      <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
        <Animated.View
          style={[styles.componentCircle, animatedComponentCircleStyles]}
        />
        <Animated.View style={[styles.iconContainer, animatedIconContainerStyles]}>
          {options.tabBarIcon ? options.tabBarIcon({ ref }) : <CustomText>?</CustomText>}
        </Animated.View>
      </Pressable>
    );
  };
  
  // ------------------------------------------------------------------
  
  const styles = {
    tabBar: {
      backgroundColor: 'white',
    },
    activeBackground: {
      position: 'absolute',
    },
    tabBarContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    component: {
      height: 50,
      width: 50,
      marginTop: 5,
      marginBottom:5,
    },
    componentCircle: {
      flex: 1,
      borderRadius: 30,
      backgroundColor: 'white',
      left:5
    },
    iconContainer: {
      position: 'absolute',
      top: 0,
      left: 10,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    icon: {
      height: 30,
      width: 30,
    }
  };