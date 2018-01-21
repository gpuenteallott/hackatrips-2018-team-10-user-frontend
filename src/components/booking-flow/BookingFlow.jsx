import React, { Component } from 'react';
import PropTypes from 'prop-types';

import uniqBy from 'lodash/uniqBy';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import moment from 'moment';

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

import Header from '../common/Header';

import {
    standardMargin,
    standardPadding,
    flexColumn,
    centerViaMargin,
} from '../../constants/styles';

import { LANDING, BOOKING_CONFIRMATION } from '../../constants/pages';

import {
    sendBookingDetails,
    fetchPlaceSuggestions,
    fetchHotelsThatMatchCriteria,
} from '../../client';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Option = Select.Option;

const DEBOUNCE_INTERVAL = 150;

class BookingFlow extends Component {
    static propTypes = {
        onGoToView: PropTypes.func.isRequired,
    };

    state = {
        submitting: false,
        placesError: false,
        autoCompletePlaces: [],
        exampleHotels: [],
        hotelsError: null,
        hotelSearchResult: null,
    };

    validate() {
        this.props.form.validateFields();

        const errors = this.props.form.getFieldsError();
        const hasErrors = Object.keys(errors).map(key => errors[key]).filter(v => v).length > 0;

        return !hasErrors;
    }

    // componentDidMount() {
    //     this.props.onGoToView(BOOKING_CONFIRMATION); // @TODO delete
    // }

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.validate()) {
            return false;
        }

        const firstChoiceHotelId = get(this.state.hotelSearchResult, ['results', 0, 'id']);

        const formPayload = this.props.form.getFieldsValue();
        const payload = {
            hotelId: firstChoiceHotelId,
            maxPrice: formPayload.maxPrice,
            rooms: formPayload.rooms,
            starRating: formPayload.starRating,
            checkin: formPayload.dateRange && formPayload.dateRange[0],
            checkout: formPayload.dateRange && formPayload.dateRange[1],
        };

        this.setState(state => ({
            ...state,
            bookingErrors: null,
            bookingSubmitting: true,
        }));

        sendBookingDetails(payload)
            .then(
                (response) => {
                    console.log('response', response);
                    if (response.errors && response.errors.length) {
                        this.setState(state => ({
                            ...state,
                            bookingErrors: response.errors,
                        }));
                    } else {
                        this.setState(state => ({
                            ...state,
                            bookingSubmitting: false,
                        }));
                        this.props.onGoToView(BOOKING_CONFIRMATION);
                    }
                },
                (error) => {
                    console.error(error);
                    this.setState(state => ({
                        ...state,
                        bookingErrors: [
                            { message: "Oh no! Error!" },
                        ],
                    }));
                },
            )
            .then(() => this.setState(state => ({ ...state, bookingSubmitting: false })));
    }

    handleLocationSearch = (value) => {
        this.setState(state => ({
            ...state,
            placesError: false,
        }));

        fetchPlaceSuggestions(value)
            .then(places => {
                console.log('places', places);
                this.setState(state => ({
                    ...state,
                    autoCompletePlaces: uniqBy(places, 'name'),
                }))
            })
            .catch((error) => {
                console.error(error);
                this.setState(state => ({
                    ...state,
                    placesError: true,
                }));
                // alert('whoops, error with location service');
            });
    }

    handleLocationSearchDebounced = debounce(this.handleLocationSearch, DEBOUNCE_INTERVAL);

    handleLoadExampleHotels = () => {
        if (!this.validate()) {
            return false;
        }

        var selectedPlace = this.state.autoCompletePlaces.find(place => (
            place.name === this.props.form.getFieldValue('place')
        ));

        const starRating = this.props.form.getFieldValue('starRating');
        const rooms = this.props.form.getFieldValue('rooms');
        const dateRange = this.props.form.getFieldValue('dateRange');
        const maxPrice = this.props.form.getFieldValue('maxPrice');

        this.setState(state => ({
            ...state,
            fetchingHotels: true,
            hotelsError: null,
            hotelSearchResult: null,
        }));

        fetchHotelsThatMatchCriteria({
            destination: selectedPlace && selectedPlace.key,
            checkin: dateRange && dateRange[0],
            checkout: dateRange && dateRange[1],
            rooms,
            maxPrice,
            starRating,
        })
            .then(response => this.setState(state => ({
                ...state,
                hotelSearchResult: response,
            })))
            .catch((error) => {
                console.error(error);
                this.setState(state => ({ ...state, hotelsError: 'Error cargando hoteles.' }));
            })
            .then(() => {
                this.setState(state => ({ ...state, fetchingHotels: false }));
            });
    }

    renderHotelResultsPreview() {
        if (!this.state.hotelSearchResult) {
            return null;
        }

        return (
            <div>
                <p style={{ ...standardMargin }}>
                    {this.state.hotelSearchResult.totalFilteredResults} resultados! Algunos de ellos:
                </p>

                {this.state.hotelSearchResult.results.slice(0, 3).map(result => (
                    <p key={result.id} style={{ ...standardMargin }}>
                        {' '}{' '}{result.name}
                    </p>
                ))}

                <p style={{ ...standardMargin }}>
                    ...
                </p>
            </div>
        );
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const locationConfig = {
            rules: [{ type: 'string', required: true, message: 'Por favor introduce ubicación :)' }],
        };
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Por favor introduce fechas :)' }],
        };
        const maxPriceCofig = {
            rules: [{ type: 'number', required: true, message: 'Por favor instroduce precio :)' }],
        };
        const roomsCofig = {
            rules: [{ type: 'string', required: true, message: 'Por favor instroduce habitaciones :)' }],
        };
        const starRatingConfig = {
            rules: [{ type: 'number', required: true, message: 'Por favor instroduce estrellas :)' }],
        };

        return (
            <div>
                <Header onLogoClick={() => this.props.onGoToView(LANDING)} />

                <main style={{ ...standardPadding, maxWidth: '400px', ...centerViaMargin }}>
                    <h1>Tu reserva</h1>

                    <Form onSubmit={this.handleSubmit} >
                        <FormItem
                            label="Ubicación"
                        >
                            {getFieldDecorator('place', locationConfig)(
                                <AutoComplete
                                    size="large"
                                    onSearch={this.handleLocationSearchDebounced}
                                    dataSource={this.state.autoCompletePlaces.map(place => place.name)}
                                />
                            )}
                        </FormItem>

                        {this.state.placesError && (
                            <div className="has-error" style={{ ...standardMargin }}>
                                <p className="ant-form-explain">
                                    Error retrieving suggestions
                                </p>
                            </div>
                        )}

                        <FormItem
                            label="Fechas"
                        >
                            {getFieldDecorator('dateRange', rangeConfig)(
                                <RangePicker
                                    size="large"
                                    ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                />
                            )}
                        </FormItem>

                        <FormItem
                            label="Precio Máximo"
                        >

                            {getFieldDecorator('maxPrice', maxPriceCofig)(
                                <InputNumber size="large" />
                            )}
                        </FormItem>

                        <FormItem
                            label="¿Cuántas personas?"
                        >
                            {getFieldDecorator('rooms', roomsCofig)(
                                <Select size="large">
                                    <Option value="1">1 Adulto</Option>
                                    <Option value="2">2 Adulto</Option>
                                    {/* @TODO, make this smarter 👇 */}
                                    <Option value="3">Familia</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="¿Cuántas estrellas?"
                        >
                            {getFieldDecorator('starRating', starRatingConfig)(
                                <RadioGroup size="large">
                                    <RadioButton value={1}>1</RadioButton>
                                    <RadioButton value={2}>2</RadioButton>
                                    <RadioButton value={3}>3</RadioButton>
                                    <RadioButton value={4}>4</RadioButton>
                                    <RadioButton value={5}>5</RadioButton>
                                </RadioGroup>
                            )}
                        </FormItem>

                        <div style={{ ...flexColumn }}>
                            {this.state.hotelsError && (
                                <div className="has-error" style={{ ...standardMargin }}>
                                    <p className="ant-form-explain">
                                        {this.state.hotelsError}
                                    </p>
                                </div>
                            )}

                            <Button
                                type="primary"
                                size="large"
                                style={{ ...standardMargin }}
                                onClick={this.handleLoadExampleHotels}
                                loading={this.state.fetchingHotels}
                            >
                                Buscar hoteles candidatos
                            </Button>

                            {this.renderHotelResultsPreview()}

                            {this.state.bookingErrors && this.state.bookingErrors.map(error => (
                                <div className="has-error" style={{ ...standardMargin }}>
                                    <p className="ant-form-explain">
                                        {error.message}
                                    </p>
                                </div>
                            ))}

                            <Button
                                style={{ ...standardMargin }}
                                type="primary"
                                size="large"
                                htmlType="submit"
                                loading={this.state.bookingSubmitting}
                                disabled={(
                                    !this.state.hotelSearchResult ||
                                    this.state.hotelSearchResult.totalFilteredResults <= 0
                                )}
                            >
                                Reservar ahora
                            </Button>
                        </div>
                    </Form>
                </main>
            </div>
        );
    }
}

const WrappedForm = Form.create()(BookingFlow);

export default WrappedForm;