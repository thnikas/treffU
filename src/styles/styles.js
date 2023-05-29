import { StyleSheet } from 'react-native'
const utils = StyleSheet.create({
    centerHorizontal: {
        alignItems: 'center',
    },
    marginBottom: {
        marginBottom: 20,
    },
    marginBottomBar: {
        marginBottom: 330,
    },
    marginBottomSmall: {
        marginBottom: 10,
    },
    profileImageBig: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
    },
    profileImage: {
        marginRight: 15,
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
    },
    profileImageSmall: {
        marginRight: 15,
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
    },
    searchBar: {
        backgroundColor: 'whitesmoke',
        color: 'grey',
        paddingLeft: 10,
        borderRadius: 8,
        height: 40,
        marginTop: -5
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    padding15: {
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 15,
    },
    padding10Top: {
        paddingTop: 10

    },
    padding10: {
        padding: 10
    },
    margin15: {
        margin: 15
    },
    padding10Sides: {
        paddingRight: 10,
        paddingLeft: 10,
    },
    margin15Left: {
        marginLeft: 15,
    },
    margin15Right: {
        marginRight: 15,
    },
    margin5Bottom: {
        marginBottom: 5,
    },
    backgroundWhite: {
        backgroundColor: 'white',
    },
    borderTopGray: {
        borderTopWidth: 1,
        borderColor: 'lightgrey'
    },
    borderWhite: {
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderColor: 'white'
    },
    buttonOutlined: {
        padding: 8,
        color: 'white',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 8,
        textAlign: 'center',
    },

    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    }
})
const navbar = StyleSheet.create({

    image: {
        padding: 20
    },
    custom: {
        marginTop: 30,
        height: 60,
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: 'lightgrey'
    },

    title: {
        fontWeight: '700',
        fontSize: 20//'larger',
    }
})
const container = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        flexDirection: 'row'
    },
    input: {
        flexWrap: "wrap"
    },
    containerPadding: {
        flex: 1,
        padding: 15
    },
    center: {
        flex: 1,
    },
    horizontal: {
        flexDirection: 'row',
        display: 'flex',
    },
    form: {
        flex: 1,
        margin: 25
    },
    profileInfo: {
        padding: 25,
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 'auto',

    },
    formCenter: {
        justifyContent: 'center',
        flex: 1,
        margin: 25,
        marginTop:'5%',
    },
    containerImage: {
        flex: 1 / 3

    },
    image: {
        aspectRatio: 1 / 1,
    },
    fillHorizontal: {
        flexGrow: 1,
        paddingBottom: 0
    },
    imageSmall: {
        aspectRatio: 1 / 1,
        height: 70
    },
    gallery: {

        borderWidth: 1,
        borderColor: 'gray',
    },
    splash: {
        padding: 200,
        height: '100%',
        width: '100%'
    },
    chatRight: {
        margin: 10,
        marginBottom: 10,
        backgroundColor: 'dodgerblue',
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-end'

    },
    chatLeft: {
        margin: 10,
        marginBottom: 10,
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 8,
        alignItems: 'flex-end',
        textAlign: 'right',
        alignSelf: 'flex-start'
    }
})

const form = StyleSheet.create({
    textInput: {
        marginBottom: 10,
        borderColor: '#5C53E2',
        backgroundColor: '#C0C0E2',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        
        
    },
    bottomButton: {
        alignContent: 'center',
        borderTopColor: 'gray',
        //borderTopWidth: 1,
        paddingBottom:'3%' ,
        paddingLeft:'3%',
        textAlign: 'center',
        color:'red'
    },
    bottomButtonLanding: {
        alignContent: 'center',
        borderTopColor: 'gray',
        //borderTopWidth: 1,
        paddingTop:'5%',
        paddingLeft:'26%',
        textAlign: 'center',
        color:'red',
        paddingRight:'5%'
    },
    roundImage: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2
    },
    placeholder:{
        
        color:'red'
    },
    textBottom:{
        color:'#5C53E2'
    },
    textBottomLogin:{
        color:'#5C53E2',
        paddingLeft:'18%',
        //marginBottom:'20%',
        bottom:'100%'
    },
    textBottomLanding:{
        color:'#363939',
    },
    mainCard:
        {width:'93%',
        height:'90%',
        left:'2%',
        marginTop:'5%',
        borderRadius:10,
        elevation:10 },

     mainImage:{ width: 130, 
            height: 130, 
            top:'7%',
        alignItems:"center",
        alignSelf:'center' }, 

    button1:{height:'8%',
    textAlign:'center',
    width:'70%',
    marginTop:'20%',
    backgroundColor:'#B14AB9',
    borderRadius:6,color:'#ffff',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',},

    mainCard2:{
        width:'90%',
        height:'90%',
        left:'-1%',
        marginTop:'5%',
        borderRadius:10,
        elevation:10 
},
    mainImage2:{ 
        width: 168, 
        height: 198, 
        top:'5%',
        alignItems:"center",
        alignSelf:'center' 
    },
    button2:{
        height:'8%',
        textAlign:'center',
        width:'70%',
        marginTop:'8%',
        backgroundColor:'#B14AB9',
        borderRadius:6,
        color:'#ffff',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
    }
})

const text = StyleSheet.create({
    center: {
        textAlign: 'center',
    },
    notAvailable: {
        textAlign: 'center',
        fontWeight: '700',//'bolder',
        fontSize: 20//'large',
    },
    profileDescription: {
        fontWeight: '300'
    },
    changePhoto: {
        marginTop: 5,
        color: 'deepskyblue',
    },
    deepskyblue: {
        color: 'deepskyblue',
    },
    username: {
        fontWeight: '600',
        color: 'black',
    },
    name: {
        color: 'grey',
    },
    bold: {
        fontWeight: '700',
    },
    large: {
        fontSize: 20//'large'
    },
    small: {
        fontSize: 10//'large'
    },
    medium: {
        fontSize: 15, //'large'
        marginBottom: 10
    },
    grey: {
        color: 'grey'
    },
    green: {
        color: 'lightgreen'
    },
    white: {
        color: 'white'
    },
    whitesmoke: {
        color: 'whitesmoke'
    }



})

export { container, form, text, utils, navbar }    