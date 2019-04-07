import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import { Content, ListItem, Accordion, List } from "native-base";
import Accordion from "../element/Accordion";
import {connect} from "react-redux";
import {addProductToDepartment} from "../../actions/listAction";
import ProductRow from "../element/ProductRow";
import Styles from "../../styles/styles";
import {FontAwesome} from "@expo/vector-icons";
import colors from "../../constants/colors";
import {Font} from "expo";
import NavigationService from "../../services/NavigationService";

class ProductList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isIconLoaded: false,
            needUpdate: false,
            data: [],
        }
    }

    render() {
        let {departments} = this.props.listReducer;
        return (
            <View>
                {
                    Object.keys(departments).map(key =>
                        <Accordion
                            key={key}
                            department={departments[key]}
                        />
                    )
                }
            </View>
        )
    }

    // _renderHeader(data) {
    //     return (
    //         <View>
    //             <View style={styles.department}>
    //                 <View style={Styles.position.flex.rowBetween}>
    //                     <Text style={styles.name}>{ data.title }</Text>
    //                     <Text style={styles.quantity}>  - { data.content.products.length }</Text>
    //                 </View>
    //
    //                 {
    //                     // this.state.isIconLoaded
    //                          <TouchableOpacity onPress={() => NavigationService.navigate('Autocomplete', {
    //                              departmentId: data.content.id,
    //                          })} >
    //                             <FontAwesome
    //                                 name={'plus'}
    //                                 size={24}
    //                                 color={colors.DARK_GRAY}
    //                             />
    //                         </TouchableOpacity>
    //                         // : null
    //                 }
    //             </View>
    //         </View>
    //     )
    // }
    //
    // _renderContent(data) {
    //     return (
    //         <List>
    //             {
    //                 data.content.products.length < 1 ?
    //                     null :
    //                     data.content.products.map(product =>
    //                         <ListItem key={product.id}>
    //                             <ProductRow
    //                                listProduct={product}
    //                                favorite={true}
    //                                delete={true}
    //                                quantity={true}
    //                            />
    //                         </ListItem>
    //                     )
    //             }
    //         </List>
    //     );
    // }

    // render() {
    //     let {departments} = this.props.listReducer;
    //
    //     return (
    //         <Content style={{ backgroundColor: "white" }}>
    //             <Accordion
    //                 dataArray={Object.keys(departments).map(key => (
    //                     { title: departments[key].name, content: departments[key] }
    //                 ))}
    //                 animation={true}
    //                 expanded={true}
    //                 renderHeader={this._renderHeader}
    //                 renderContent={this._renderContent}
    //             />
    //         </Content>
    //     )
    // }

    // setDepartments = () => {
    //     let {departments} = this.props.listReducer;
    //     let data = [];
    //
    //     Object.keys(departments).map(key => {
    //         data.push({ title: departments[key].name, content: departments[key] })
    //     });
    //
    //     this.setState({ data });
    // };

    async componentDidMount () {
        if (!this.props.listReducer.list.id) {
            return NavigationService.navigate('ListList');
            // TODO: throw alert
        }

        try {
            await Font.loadAsync({FontAwesome: require('@expo/vector-icons/fonts/FontAwesome.ttf')});
            this.setState({isIconLoaded: true})
        } catch {
            console.log('ERROR WHILE LOADING ICONS...')
        }
    }

    willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        payload => {
            this.setState(prevState => ({needUpdate: !prevState.needUpdate}))
        }
    );
}

const styles = StyleSheet.create({
    department: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.LIGHT_GRAY,
    },
    name: {
        fontSize: 16,
    },
    quantity: {
        fontSize: 14,
        color: colors.GRAY
    },
});

const mapStateToProps = ({ listReducer }) => {
    return {
        listReducer,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addProductToDepartment: (product, departmentId) => dispatch(addProductToDepartment(product, departmentId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);