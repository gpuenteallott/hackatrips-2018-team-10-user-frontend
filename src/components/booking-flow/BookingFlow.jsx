import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Form,
    Input,
    Tooltip,
    InputNumber,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    DatePicker,
    Radio,
} from 'antd';

import {
    standardMargin,
    standardPadding,
    secondaryBgColor,
    accentColor,
} from '../../constants/styles';

import COMPANY_NAME from '../../constants/companyName';
import { LANDING } from '../../constants/pages';

import {
    sendBookingDetails,
} from '../../client';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class BookingFlow extends Component {
    static propTypes = {
        onGoToView: PropTypes.func.isRequired,
    };

    state = {
        submitting: false,
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const payload = this.props.form.getFieldsValue();

        console.log('submission fields', payload);

        this.setState(state => ({ ...state, submitting: true }));

        sendBookingDetails(payload)
            .then(
                () => {
                    alert('success');
                },
                () => {
                    alert('whoops, error');
                },
            )
            .then(() => this.setState(state => ({ ...state, submitting: false })));
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };

        return (
            <div>
                <header style={{ ...standardPadding, ...secondaryBgColor, ...accentColor }}>
                    <h2>
                        <span onClick={() => this.props.onGoToView(LANDING)}>&lt;</span>{' '}
                        {COMPANY_NAME}
                    </h2>
                </header>

                <main style={{ ...standardPadding }}>
                    <h1>Your booking</h1>

                    <Form onSubmit={this.handleSubmit} >
                        <FormItem
                            label="Location"
                        >
                            {getFieldDecorator('location', {})(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            label="Dates"
                        >
                            {getFieldDecorator('dates', rangeConfig)(
                                <RangePicker />
                            )}
                        </FormItem>

                        <FormItem
                            label="Maximum Price"
                        >

                            {getFieldDecorator('max-price', {})(
                                <InputNumber />
                            )}
                        </FormItem>

                        <FormItem
                            label="Rooms for"
                        >
                            {getFieldDecorator('quick-guest-count', {})(
                                <Select>
                                    <Option value="1">1 Adult</Option>
                                    <Option value="2">2 Adults</Option>
                                    <Option value="2+">Families</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Hotel Stars"
                        >
                            {getFieldDecorator('hotel-stars', {})(
                                <RadioGroup>
                                    <Radio value={1}>1</Radio>
                                    <Radio value={2}>2</Radio>
                                    <Radio value={3}>3</Radio>
                                    <Radio value={4}>4</Radio>
                                    <Radio value={5}>5</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>

                        <Button type="primary" htmlType="submit" loading={this.state.submitting}>
                            Submit
                        </Button>
                    </Form>
                </main>
            </div>
        );
    }
}

const WrappedForm = Form.create()(BookingFlow);

export default WrappedForm;