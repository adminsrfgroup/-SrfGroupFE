import * as React from 'react';
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area,
} from 'recharts';
import './statistic-offers.scss';

export default class StatisticOffers extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        // console.log('this.props ', this.props);
        this.state = {
            data: [
                {
                    name: this.props?.t('common.label_for_sell'),
                    uv: this.props.countOffersByUser.countSellOffers,
                    pv: this.props.countOffersByUser.countSellOffers,
                    amt: Math.max(
                        this.props.countOffersByUser.countSellOffers,
                        this.props.countOffersByUser.countRentOffers,
                        this.props.countOffersByUser.countFindOffers
                    ),
                    cnt: 590,
                },
                {
                    name: this.props?.t('common.label_for_rent'),
                    uv: this.props.countOffersByUser.countRentOffers,
                    pv: this.props.countOffersByUser.countRentOffers,
                    amt: Math.max(
                        this.props.countOffersByUser.countSellOffers,
                        this.props.countOffersByUser.countRentOffers,
                        this.props.countOffersByUser.countFindOffers
                    ),
                    cnt: 590,
                },
                {
                    name: this.props?.t('common.label_for_find'),
                    uv: this.props.countOffersByUser.countFindOffers,
                    pv: this.props.countOffersByUser.countFindOffers,
                    amt: Math.max(
                        this.props.countOffersByUser.countSellOffers,
                        this.props.countOffersByUser.countRentOffers,
                        this.props.countOffersByUser.countFindOffers
                    ),
                    cnt: 350,
                },
            ],
        };
    }

    render() {
        return (
            <div className="area-charts">
                <p>{this.props.t('account.title_charts')}</p>
                <div className="area-chart-wrapper">
                    <div className="area-chart-wrapper-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart
                                width={400}
                                height={400}
                                data={this.state.data}
                            >
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Legend />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Area
                                    type="monotone"
                                    dataKey="amt"
                                    fill="#fc3"
                                    stroke="#8884d8"
                                />
                                <Bar dataKey="pv" barSize={40} fill="#94908f" />
                                <Line
                                    type="monotone"
                                    dataKey="uv"
                                    stroke="#ff7300"
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    }
}
