import React, {Component, Fragment} from 'react';
import { Input, Col, Select, Icon } from 'antd';

export default class CandidateSearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputSearch: '',
            selectSearch: 'All'
        };
    }

    onInputChange = (e) => {
        const newInputSearch = e.currentTarget.value;
        this.setState({
            inputSearch: newInputSearch
        });
        this.props.onInputChange(e.currentTarget.value)
    }

    onSelectChange = (value) => {
        const newSelectSearch = value;
        this.setState({
            selectSearch: newSelectSearch
        });
        this.props.onSelectChange(value)
    }

    render() {
        const InputGroup = Input.Group;
        const { Option } = Select;
        return (
            <Fragment>
                <Col xs={20} sm={16} md={12} lg={10}>
                {this.props.onPending? 
                <Input
                type="text"
                placeholder="Search First Name/ Last Name/ Instrument"
                value={this.state.inputSearch}
                onChange={this.onInputChange}
                prefix={<Icon type="edit" />}
                style={{ width: '100%' }} /> :
                <InputGroup compact>
                    <Input
                        type="text"
                        placeholder="First Name/ Last Name/ Instrument"
                        prefix={<Icon type="edit" />}
                        value={this.state.inputSearch}
                        onChange={this.onInputChange}
                        style={{ width: '70%' }} />
                    <Select defaultValue="All"
                            value={this.state.selectSearch}
                            style={{ width: '30%' }}
                            onChange={this.onSelectChange}>
                        <Option value="All">All</Option>
                        <Option value="Approved">Approved</Option>
                        <Option value="Denied">Denied</Option>
                    </Select>
                </InputGroup>}
                </Col>
            </Fragment>
        );
    }
}

